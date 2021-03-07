import * as PIXI from 'pixi.js'

export default () => {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);
  const { stage } = app;

  const brush = new PIXI.Graphics();
  brush.beginFill(0xffffff);
  brush.drawCircle(0, 0, 40);
  brush.endFill();

  const setup = (
    loader: PIXI.Loader,
    resources: Partial<Record<string, PIXI.LoaderResource>>
  ) => {
    const background = new PIXI.Sprite(resources.t1.texture);
    stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    const imageToReveal = new PIXI.Sprite(resources.t2.texture);
    stage.addChild(imageToReveal);
    imageToReveal.width = app.screen.width;
    imageToReveal.height = app.screen.height;

    const renderTexture = PIXI.RenderTexture.create({
      width: app.screen.width,
      height: app.screen.height
    });
    const renderTextureSprite = new PIXI.Sprite(renderTexture);
    stage.addChild(renderTextureSprite);
    imageToReveal.mask = renderTextureSprite;

    let dragging = false;
    const pointerDown = (event: PIXI.InteractionEvent) => {
      dragging = true;
      pointerMove(event);
    }
    const pointerUp = (_event: PIXI.InteractionEvent) => {
      dragging = false;
    }
    const pointerMove = (event: PIXI.InteractionEvent) => {
      if (dragging) {
        console.log(event.data.global);
        brush.position.copyFrom(event.data.global);
        app.renderer.render(brush, renderTexture, false, null, false);
      }
    }

    app.stage.interactive = true;
    app.stage.on('pointerdown', pointerDown);
    app.stage.on('pointerup', pointerUp);
    app.stage.on('pointermove', pointerMove);
  }

  app.loader.add('t1', '/assets/img/nakatoro.png');
  app.loader.add('t2', '/assets/img/ika.jpg');
  app.loader.load(setup);
}
