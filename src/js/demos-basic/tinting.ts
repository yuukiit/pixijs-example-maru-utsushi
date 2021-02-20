import * as PIXI from 'pixi.js'

type Dude = PIXI.Sprite & {
  direction?: number;
  turningSpeed?: number;
  speed?: number;
}
export default () => {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);
  const aliens: Dude[] = [];
  const totalDudes = 20;

  for (let index = 0; index < totalDudes; index++) {
    const dude: Dude = PIXI.Sprite.from('/assets/img/tori.jpg');
    dude.anchor.set(0.5);
    dude.scale.set(0.3 + Math.random() * 0.3);
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;
    dude.tint = Math.random() * 0xFFFFFF;
    dude.direction = Math.random() * Math.PI * 2;
    dude.turningSpeed = Math.random() - 0.8;
    dude.speed = 2 + Math.random() * 2;
    aliens.push(dude);
    app.stage.addChild(dude);
  }

  const dudeBoundsPadding = 100;
  const dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2
  );

  app.ticker.add(() => {
    for (let index = 0; index < aliens.length; index++) {
      const dude = aliens[index];
      dude.direction += dude.turningSpeed * 0.01;
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