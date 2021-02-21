import container from './container'
import transparentBackground from './transparent-background'
import tinting from './tinting'
import cacheAsBitmap from './cache-as-bitmap'
import particleContainer from './particle-container'
import blendModes from './blend-modes'
import simplePlane from './simple-plane'

export default () => {
  return {
    container: () => container(),
    transparentBackground: () => transparentBackground(),
    tinting: () => tinting(),
    cacheAsBitmap: () => cacheAsBitmap(),
    particleContainer: () => particleContainer(),
    blendModes: () => blendModes(),
    simplePlane: () => simplePlane(),
  }
}