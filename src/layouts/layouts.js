import { StackLayout } from './stack/stack.js'
import { BoxLayout } from './box/box.js'
import { CenterLayout } from './center/center.js'
import { ClusterLayout } from './cluster/cluster.js'
import { SidebarLayout } from './sidebar/sidebar.js'
import { SwitcherLayout } from './switcher/switcher.js'
import { CoverLayout } from './cover/cover.js'
import { GridLayout } from './grid/grid.js'
import { FrameLayout } from './frame/frame.js'
import { ReelLayout } from './reel/reel.js'
import { ImposterLayout } from './imposter/imposter.js'
import { IconLayout } from './icon/icon.js'

export function defineLayoutElements() {
  if (!('customElements' in window)) return

  for (const layout of Object.values(layoutMap)) layout.defineElement()
}

export const layoutMap = {
  'stack-layout': StackLayout,
  'box-layout': BoxLayout,
  'center-layout': CenterLayout,
  'cluster-layout': ClusterLayout,
  'sidebar-layout': SidebarLayout,
  'switcher-layout': SwitcherLayout,
  'cover-layout': CoverLayout,
  'grid-layout': GridLayout,
  'frame-layout': FrameLayout,
  'reel-layout': ReelLayout,
  'imposter-layout': ImposterLayout,
  'icon-layout': IconLayout,
}

export const layoutCustomElementNames = Object.keys(layoutMap)

export {
  StackLayout,
  BoxLayout,
  CenterLayout,
  ClusterLayout,
  SidebarLayout,
  SwitcherLayout,
  CoverLayout,
  GridLayout,
  FrameLayout,
  ReelLayout,
  ImposterLayout,
  IconLayout,
}
