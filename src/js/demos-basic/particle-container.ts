import * as PIXI from 'pixi.js'
import { Dude } from '../../../types/dude';

export default () => {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  // PIXI.Container の速い版
  // たくさんの Particle, Sprite を格納できる
  const sprites = new PIXI.ParticleContainer(10000, {
    // scale: true,
    position: true,
    rotation: true,
    uvs: true,
    // alpha: true,
  })
  app.stage.addChild(sprites);

  const toris: Dude[] = [];

  const totalSprites = app.renderer instanceof PIXI.Renderer ? 10000 : 100;

  for (let index = 0; index < totalSprites; index++) {
    const dude: Dude = PIXI.Sprite.from('/assets/img/tori.jpg');
    dude.tint = Math.random() * 0xE8D4CD;
    dude.anchor.set(0.5);
    dude.scale.set(0.5 + Math.random() * 0.3);
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;
    dude.tint = Math.random() * 0x808080;
    dude.direction = Math.random() * Math.PI * 2;
    dude.turningSpeed = Math.random() - 0.8;
    dude.speed = (2 + Math.random() * 2) * 0.2;
    dude.offset = Math.random() * 100;
    toris.push(dude);
    sprites.addChild(dude);
  }

  const dudeBoundsPadding = 100;
  const dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2,
  );

  let tick = 0;

  app.ticker.add(() => {
    for (let index = 0; index < toris.length; index++) {
      const dude = toris[index];
      dude.scale.y = 0.2 + Math.sin(tick + dude.offset) * 0.05;
      dude.direction += dude.turningSpeed * 0.01;
      dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
      dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
      dude.rotation = -dude.direction + Math.PI;

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

    tick += 0.1;
  })
}