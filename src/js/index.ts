import demosBasic from './demos-basic/demos-basic'
import demosAdvanced from './demos-advanced/demos-advanced'

const pixiFunctions = {
  ...demosBasic(),
  ...demosAdvanced(),
}

window.addEventListener('load', () => {
  const bodyTag = document.querySelector('body');
  const bodyId = bodyTag.getAttribute('id');
  console.log(bodyId)
  pixiFunctions[bodyId]();
})