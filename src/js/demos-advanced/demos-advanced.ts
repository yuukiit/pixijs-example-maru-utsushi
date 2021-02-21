import slots from './slots'
import scratchcard from './scratchcard'
import mouseTrail from './mouse-trail'
import starWarp from './star-warp'
import screenshot from './screenshot'
import collision from './collision'
import spinners from './spinners'

export default () => {
  return {
    slots: () => slots(),
    scratchcard: () => scratchcard(),
    mouseTrail: () => mouseTrail(),
    starWarp: () => starWarp(),
    screenshot: () => screenshot(),
    collision: () => collision(),
    spinners: () => spinners(),
  }
}