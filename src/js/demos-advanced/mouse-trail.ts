import * as PIXI from 'pixi.js'

export default () => {
  const app = new PIXI.Application({ backgroundColor: 0x1099bb });
  document.body.appendChild(app.view);

  const trailTexture = PIXI.Texture.from('/assets/img/ika.jpg');
  const historyX: number[] = [];
  const historyY: number[] = [];
  const historySize: number = 20;
  const ropeSize: number = 100;
  const points: PIXI.Point[] = [];

  // Create history array.
  for (let index = 0; index < historySize; index++) {
    historyX.push(0);
    historyY.push(0);
  }

  // Create rope points.
  for (let index = 0; index < ropeSize; index++) {
    points.push(new PIXI.Point(0, 0));
  }

  // Create the rope.
  const rope = new PIXI.SimpleRope(trailTexture, points);
  // rope.blendMode = PIXI.BLEND_MODES.ADD;
  app.stage.addChild(rope);

  /**
   * Cubic interpolation based on https://github.com/osuushi/Smooth.js
   */
  const clipInput = (k: number, arr: number[]) => {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
  }

  const getTangent = (k: number, factor: number, array: number[]) => {
    return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
  }

  const cubicInterpolation = (array: number[], t: number, tangentFactor?: null | number): number => {
    if (tangentFactor == null) tangentFactor = 1;
    const k = Math.floor(t);
    const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
  }

  app.ticker.add((_delta) => {
    const mouseposition = app.renderer.plugins.interaction.mouse.global;
    historyX.pop();
    historyX.unshift(mouseposition.x);
    historyY.pop();
    historyY.unshift(mouseposition.y);
    for (let index = 0; index < ropeSize; index++) {
      const p = points[index];
      const ix = cubicInterpolation(historyX, index / ropeSize * historySize);
      const iy = cubicInterpolation(historyY, index / ropeSize * historySize);

      p.x = ix;
      p.y = iy;
    }

  })
}
