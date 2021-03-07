import demosBasic from './demos-basic/demos-basic'
import demosAdvanced from './demos-advanced/demos-advanced'
import akita from './akita/akita'

const pixiFunctions = {
  ...demosBasic(),
  ...demosAdvanced(),
  ...akita(),
}

window.addEventListener('load', () => {
  const bodyTag = document.querySelector('body');
  const bodyId = bodyTag.getAttribute('id');
  console.log(bodyId)
  pixiFunctions[bodyId]();
})