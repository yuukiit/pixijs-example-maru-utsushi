import * as PIXI from 'pixi.js'

type Reel = {
  container: PIXI.Container,
  symbols: PIXI.Sprite[],
  position: number,
  previousPosition: number,
  blur: PIXI.filters.BlurFilter,
}
type Tween = {
  object: Reel,
  property: string,
  propertyBeginValue: number,
  target: number,
  time: number,
  easing: (t: number) => number,
  change: (t: Tween) => void | null,
  complete: (t: Tween) => void | null,
  start: number,
}

export default () => {
  const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
  })
  document.body.appendChild(app.view);

  const REEL_WIDTH = 160;
  const SYMBOL_SIZE = 150;

  const backout = (amount: number): (t: number) => number => {
    // backout() は callback として呼び出される
    // callback としての backout() は tweenTo() 内で実行され、引数 `t` を与えられる
    return (t: number) => (--t * t * ((amount + 1) * t + amount) + 1);
  }

  const tweening: Tween[] = [];
  const tweenTo = (
    object: Reel,
    property: string,
    target: number,
    time: number,
    easing: (t: number) => number,
    onchange: (t: Tween) => void | null,
    oncomplete: (t: Tween) => void | null
  ): Tween => {
    const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now(),
    }

    tweening.push(tween);
    return tween;
  }

  let running = false;

  const reelsComplete = () => {
    running = false;
  }

  const startPlay = (reels: Reel[]) => {
    if (running) return;
    running = true;
    for (let index = 0; index < reels.length; index++) {
      const r = reels[index];
      const extra = Math.floor(Math.random() * 3);
      const target = r.position + 10 + index * 5 + extra;
      const time = 2500 + index * 600 + extra * 600;
      tweenTo(
        r,
        'position',
        target,
        time,
        backout(0.5),
        null,
        index === reels.length - 1 ? reelsComplete : null
      );
    }
  }
  const onAssetsLoaded = () => {
    const slotTextures = [
      PIXI.Texture.from('/assets/img/tori.jpg'),
      PIXI.Texture.from('/assets/img/nakatoro.png'),
      PIXI.Texture.from('/assets/img/ika.jpg'),
      PIXI.Texture.from('/assets/img/poko.jpg'),
    ];

    const reels: Reel[] = [];
    const reelContainer = new PIXI.Container();
    for (let index = 0; index < 5; index ++) {
      const rc = new PIXI.Container();
      rc.x = index * REEL_WIDTH;
      reelContainer.addChild(rc);

      const reel: Reel = {
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
    
    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5);
    const top = new PIXI.Graphics();
    top.beginFill(0, 1);
    top.drawRect(0, 0, app.screen.width, margin);
    const bottom = new PIXI.Graphics();
    bottom.beginFill(0, 1);
    bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin);

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
    });

    const playText = new PIXI.Text('まわすのだ', style);
    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    const headerText = new PIXI.Text('ぐるぐるスロット', style);
    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    app.stage.addChild(top);
    app.stage.addChild(bottom);

    bottom.interactive = true;
    bottom.buttonMode = true;

    // Listen for animate update;
    app.ticker.add((delta) => {
      for (let index = 0; index < reels.length; index++) {
        const r = reels[index];
        r.blur.blurY = (r.position - r.previousPosition) * 8;
        r.previousPosition = r.position;
        
        for (let j = 0; j < r.symbols.length; j++) {
          const s = r.symbols[j];
          const prevy = s.y;
          s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
          if (s.y < 0 && prevy > SYMBOL_SIZE) {
            s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
            s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
            s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
          }
        }
      }
    })

    bottom.addListener('pointerdown', () => {
      startPlay(reels);
    });
  }

  const lerp = (a1: number, a2: number, t: number): number => {
    return a1 * (1 - t) + a2 * t;
  }

  app.loader
    .add('/assets/img/tori.jpg', '/assets/img/tori.jpg')
    .add('/assets/img/nakatoro.png', '/assets/img/nakatoro.png')
    .add('/assets/img/ika.jpg', '/assets/img/ika.jpg')
    .add('/assets/img/poko.jpg', '/assets/img/poko.jpg')
    .load(onAssetsLoaded);

  // app.ticker はずっと走ってるぽい
  // const tweening = [] に何かが push されたら for 文が走る
  app.ticker.add((delta) => {
    console.log('俺は止まらねえ〜〜！');
    const now = Date.now();
    const remove = [];
    for (let index = 0; index < tweening.length; index++) {
      /**
       * type Tween = {
       *   object: Reel,
       *   property: string,
       *   propertyBeginValue: number,
       *   target: number,
       *   time: number,
       *   easing: (t: number) => number,
       *   change: (t: Tween) => void | null,
       *   complete: (t: Tween) => void | null,
       *   start: number,
       * }
       */
      const t = tweening[index];
      const phase = Math.min(1, (now - t.start) / t.time);

      // t.easing(phase) => backout(0.5) を実行している
      t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
      if (t.change) t.change(t);
      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) t.complete(t);
        remove.push(t);
      }
    }

    for (let index = 0; index < remove.length; index++) {
      tweening.splice(tweening.indexOf(remove[index]), 1);
    }
  })
}
