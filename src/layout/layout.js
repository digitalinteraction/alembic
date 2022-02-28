import { StackLayout } from './stack/stack.js'
import { BoxLayout } from './box/box.js'
import { CenterLayout } from './center/center.js'
import { ClusterLayout } from './cluster/cluster.js'
import { SidebarLayout } from './sidebar/sidebar.js'
import { SwitcherLayout } from './switcher/switcher.js'
import { GridLayout } from './grid/grid.js'
import { FrameLayout } from './frame/frame.js'
import { ReelLayout } from './reel/reel.js'

if ('customElements' in window) {
  StackLayout.register()
  BoxLayout.register()
  CenterLayout.register()
  ClusterLayout.register()
  SidebarLayout.register()
  SwitcherLayout.register()
  GridLayout.register()
  FrameLayout.register()
  ReelLayout.register()
}
