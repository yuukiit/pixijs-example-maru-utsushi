import * as PIXI from 'pixi.js'
import { Dude } from '../../../types/dude';

export default () => {
  const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
  })
  document.body.appendChild(app.view);

  const REEL_WIDTH = 160;
  const SYMBOL_SIZE = 150;

  const onAssetsLoaded = () => {
    const slotTextures = [
      PIXI.Texture.from('/assets/img/tori.jpg'),
      PIXI.Texture.from('/assets/img/nakatoro.png'),
      PIXI.Texture.from('/assets/img/ika.jpg'),
      PIXI.Texture.from('/assets/img/poko.jpg'),
    ];

    const reels = [];
    const reelContainer = new PIXI.Container();
    for (let index = 0; index < 5; index ++) {
      const rc = new PIXI.Container();
      rc.x = index * REEL_WIDTH;
      reelContainer.addChild(rc);

      const reel = {
        container: rc,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new PIXI.filters.BlurFilter(),
      }

      reel.blur.blurX = 0;
      reel.blur.blurY = 0;
      rc.filters = [reel.blur];

      for (let j = 0; j < 4; j++) {
        const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
        symbol.y = j * SYMBOL_SIZE;
        symbol.scale.x = symbol.scale.y = Math.min(
          SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height
        );
        symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
        reel.symbols.push(symbol);
        rc.addChild(symbol);
      }
      reels.push(reel);
    }
    app.stage.addChild(reelContainer);
  }

  app.loader
    .add('/assets/img/tori.jpg', '/assets/img/tori.jpg')
    .add('/assets/img/nakatoro.png', '/assets/img/nakatoro.png')
    .add('/assets/img/ika.jpg', '/assets/img/ika.jpg')
    .add('/assets/img/poko.jpg', '/assets/img/poko.jpg')
    .load(onAssetsLoaded);
}
