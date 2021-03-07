import * as PIXI from 'pixi.js'

export default () => {
  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
  });
  const { stage } = app;
  document.body.append(app.view);

  const container = new PIXI.Container();
  stage.addChild(container);

  const onAssetsLoaded = (
    loader: PIXI.Loader,
    resources: Partial<Record<string, PIXI.LoaderResource>>
  ) => {
    const tori = new PIXI.Sprite(resources.tori.texture);
    stage.addChild(tori);
    const poko = new PIXI.Sprite(resources.poko.texture);
    stage.addChild(poko);
    poko.interactive = true;
    // poko.buttonMode = true;
    poko.addListener('pointerdown', () => {
      alert('グアアアア！！！！')
    })
  }

  app.loader
    .add('tori', '/assets/img/tori.jpg')
    .add('poko', '/assets/img/poko.jpg')
    .load(onAssetsLoaded)
}