import { StackLayout } from './stack/stack.js'
import { BoxLayout } from './box/box.js'
import { CenterLayout } from './center/center.js'
import { ClusterLayout } from './cluster/cluster.js'
import { SidebarLayout } from './sidebar/sidebar.js'
import { SwitcherLayout } from './switcher/switcher.js'
import { GridLayout } from './grid/grid.js'
import { FrameLayout } from './frame/frame.js'
import { ReelLayout } from './reel/reel.js'
import { ImposterLayout } from './imposter/imposter.js'
import { IconLayout } from './icon/icon.js'

export function defineLayoutElements() {
  if (!('customElements' in window)) return

  StackLayout.defineElement()
  BoxLayout.defineElement()
  CenterLayout.defineElement()
  ClusterLayout.defineElement()
  SidebarLayout.defineElement()
  SwitcherLayout.defineElement()
  GridLayout.defineElement()
  FrameLayout.defineElement()
  ReelLayout.defineElement()
  ImposterLayout.defineElement()
  IconLayout.defineElement()
}

export {
  StackLayout,
  BoxLayout,
  CenterLayout,
  ClusterLayout,
  SidebarLayout,
  SwitcherLayout,
  GridLayout,
  FrameLayout,
  ReelLayout,
  ImposterLayout,
  IconLayout,
}
