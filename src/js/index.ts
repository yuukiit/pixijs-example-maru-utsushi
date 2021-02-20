import container from './demos-basic/container'

const pixiFunctions = {
  container: () => container(),
}

window.addEventListener('load', () => {
  const bodyTag = document.querySelector('body');
  const bodyId = bodyTag.getAttribute('id');
  pixiFunctions[bodyId]();
})