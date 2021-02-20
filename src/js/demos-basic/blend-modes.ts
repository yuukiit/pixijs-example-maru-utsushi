import * as PIXI from 'pixi.js'
import { Dude } from '../../../types/dude';

export default () => {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const background = PIXI.Sprite.from('/assets/img/nakatoro.png');
  background.width = app.screen.width;
  background.height = app.screen.height;
  app.stage.addChild(background);

  const dudeArray: Dude[] = [];
  const totalDudes = 20;

  for (let index = 0; index < totalDudes; index++) {
    const dude: Dude = PIXI.Sprite.from('/assets/img/tori.jpg');
    dude.anchor.set(0.5);
    dude.scale.set(0.3 + Math.random() * 0.3);
    dude.x = Math.floor(Math.random() * app.screen.width);
    dude.y = Math.floor(Math.random() * app.screen.height);
    dude.blendMode = PIXI.BLEND_MODES.ADD;
    dude.direction = Math.random() * Math.PI * 2;
    dude.turningSpeed = Math.random() - 0.8;
    dude.speed = 2 + Math.random() * 2;

    dudeArray.push(dude);
    app.stage.addChild(dude);
  }

  const dudeBoundsPadding = 100;
  const dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2,
  );

  app.ticker.add(() => {
    for (let index = 0; index < dudeArray.length; index++) {
      const dude = dudeArray[index];
      dude.x += Math.sin(dude.direction) * dude.speed;
      dude.y += Math.cos(dude.direction) * dude.speed;
      dude.rotation = -dude.direction - Math.PI / 2;
      if (dude.x < dudeBounds.x) {
        dude.x += dudeBounds.width;
      } else if (dude.x > dudeBounds.x + dudeBounds.width) {
        dude.x -= dudeBounds.width;
      }

      if (dude.y < dudeBounds.y) {
        dude.y += dudeBounds.height;
      } else if (dude.y > dudeBounds.y + dudeBounds.height) {
        dude.y -= dudeBounds.height;
      }
    }
  })
}