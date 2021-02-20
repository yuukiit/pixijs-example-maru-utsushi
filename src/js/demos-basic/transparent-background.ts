import * as PIXI from 'pixi.js'

export default () => {
  const app = new PIXI.Application({ transparent: true });
  document.body.appendChild(app.view);
  const tori = PIXI.Sprite.from('/assets/img/tori.jpg');
  tori.anchor.set(0.5);
  tori.x = app.screen.width / 2;
  tori.y = app.screen.height / 2;

  app.stage.addChild(tori);

  app.ticker.add(() => {
    tori.rotation += 0.1;
  });
}