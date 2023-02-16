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
import { AlembicHTMLElement } from '../lib/lib.js'

/**
  A map of Custom Element layouts,
  where the key is the element name and the value is the HTMLElement subclass
*/
export const layoutCustomElements = new Map<string, AlembicHTMLElement>([
  ['box-layout', BoxLayout],
  ['stack-layout', StackLayout],
  ['center-layout', CenterLayout],
  ['cluster-layout', ClusterLayout],
  ['sidebar-layout', SidebarLayout],
  ['switcher-layout', SwitcherLayout],
  ['cover-layout', CoverLayout],
  ['grid-layout', GridLayout],
  ['frame-layout', FrameLayout],
  ['reel-layout', ReelLayout],
  ['imposter-layout', ImposterLayout],
  ['icon-layout', IconLayout],
])

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
