import * as PIXI from 'pixi.js'

export default () => {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  app.stop();

  const aliens = [];
  const alienFrames = [
    'nakatoro_white.png',
    'tori.jpg',
  ];

  let count = 0;

  const alienContainer = new PIXI.Container();
  alienContainer.x = 400;
  alienContainer.y = 300;

  // マウスイベントを有効にする
  app.stage.interactive = true;

  app.stage.addChild(alienContainer);

  const onAssetsLoaded = () => {
    for (let index = 0; index < 100; index++) {
      const frameName = alienFrames[index % 2];
      const alien = PIXI.Sprite.from(frameName);
      alien.tint = Math.random() * 0xFFFFFF;
      alien.x = Math.random() * 800 - 400;
      alien.y = Math.random() * 600 - 300;
      alien.anchor.x = 0.5;
      alien.anchor.y = 0.5;
      aliens.push(alien);
      alienContainer.addChild(alien);
    }
    app.start();
  }

  app.loader
    .add('spritesheet', '/assets/json/sushitori.json')
    .load(onAssetsLoaded);
  
  const onClick = () => {
    // クリックした時の状態をキャッシュする
    alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;
    console.log(alienContainer.cacheAsBitmap);
  }
  app.stage.on('pointertap', onClick);

  app.ticker.add(() => {
    for (let index = 0; index < 100; index++) {
      const alien = aliens[index];
      alien.rotation += 0.1;
    }

    count += 0.01;

    alienContainer.scale.x = Math.sin(count);
    alienContainer.scale.y = Math.sin(count);
    alienContainer.rotation += 0.01;
  })
}