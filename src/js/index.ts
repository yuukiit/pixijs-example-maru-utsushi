import container from './demos-basic/container'
import transparentBackground from './demos-basic/transparent-background'
import tinting from './demos-basic/tinting'
import cacheAsBitmap from './demos-basic/cache-as-bitmap'
import particleContainer from './demos-basic/particle-container'
import blendModes from './demos-basic/blend-modes'
// import simplePlane from './demos-basic/simple-plane'

const pixiFunctions = {
  container: () => container(),
  transparentBackground: () => transparentBackground(),
  tinting: () => tinting(),
  cacheAsBitmap: () => cacheAsBitmap(),
  particleContainer: () => particleContainer(),
  blendModes: () => blendModes(),
  // simplePlane: () => simplePlane(),
}

window.addEventListener('load', () => {
  const bodyTag = document.querySelector('body');
  const bodyId = bodyTag.getAttribute('id');
  console.log(bodyId)
  pixiFunctions[bodyId]();
})