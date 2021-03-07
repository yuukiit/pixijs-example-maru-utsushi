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

  const spinnerTori = (tori: PIXI.Sprite) => {
    app.ticker.add((delta) => {
      tori.rotation += 0.3
    })
  }

  const onAssetsLoaded = (
    loader: PIXI.Loader,
    resources: Partial<Record<string, PIXI.LoaderResource>>
  ) => {
    const tori = new PIXI.Sprite(resources.tori.texture);
    tori.anchor.set(0.5)
    tori.x = app.screen.width / 2
    tori.y = app.screen.height / 2
    const poko = new PIXI.Sprite(resources.poko.texture);
    stage.addChild(tori);
    stage.addChild(poko);

    tori.interactive = true;
    tori.addListener('pointerdown', () => {
      spinnerTori(tori);
    })
    poko.interactive = true;
    poko.addListener('pointerdown', () => {
      alert('グアアアア！！！！')
    })
  }

  app.loader
    .add('tori', '/assets/img/tori.jpg')
    .add('poko', '/assets/img/poko.jpg')
    .load(onAssetsLoaded)
}