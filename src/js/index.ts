import container from './demos-basic/container'
import transparentBackground from './demos-basic/transparent-background'

const pixiFunctions = {
  container: () => container(),
  transparentBackground: () => transparentBackground(),
}

window.addEventListener('load', () => {
  const bodyTag = document.querySelector('body');
  const bodyId = bodyTag.getAttribute('id');
  console.log(bodyId)
  pixiFunctions[bodyId]();
})