import * as PIXI from 'pixi.js'

export default () => {
  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
  });

  document.body.appendChild(app.view);

  const build = () => {
    const texture = app.loader.resources.bg_tori.texture;

    // X軸の頂点の数
    const verticesX = 10;

    // Y軸の頂点の数
    const verticesY = 10;

    // SimplePlaneを使用すると、複数のポイントにまたがってテクスチャを描画し、これらのポイントを操作できます。(Google翻訳)
    const plane = new PIXI.SimplePlane(texture, verticesX, verticesY);

    plane.x = 100;
    plane.y = 100;

    app.stage.addChild(plane);

    const buffer = plane.geometry.getBuffer('aVertexPosition');

    console.log(buffer);
    console.log(plane.geometry);


    app.ticker.add((delta) => {
      for (let index = 0; index < buffer.data.byteLength; index++) {
        buffer.data[index] += (Math.random() - 0.5);
      }
      buffer.update();
    })
  }

  app.loader
    .add('bg_tori', '/assets/img/tori.jpg')
    .load(build);
}