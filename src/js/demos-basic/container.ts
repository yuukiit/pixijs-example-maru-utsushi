import * as PIXI from 'pixi.js'

export default () => {
  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
  })
  document.body.appendChild(app.view);

  const container = new PIXI.Container();

  app.stage.addChild(container);

  const texture = PIXI.Texture.from('/assets/img/tori.jpg');

  for (let index = 0; index < 25; index++) {
    const tori = new PIXI.Sprite(texture);
    tori.width = 40;
    tori.height = 40;
    tori.anchor.set(0.5);
    tori.x = (index % 5) * 40;
    tori.y = Math.floor(index / 5) * 40;
    container.addChild(tori);
  }

  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  app.ticker.add((delta) => {
    container.rotation -= 0.01 * delta;
  })
}