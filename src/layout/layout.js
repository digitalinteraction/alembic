import { StackLayout } from './stack/stack.js'
import { BoxLayout } from './box/box.js'
import { CenterLayout } from './center/center.js'
import { ClusterLayout } from './cluster/cluster.js'
import { SidebarLayout } from './sidebar/sidebar.js'

if ('customElements' in window) {
  StackLayout.register()
  BoxLayout.register()
  CenterLayout.register()
  ClusterLayout.register()
  SidebarLayout.register()
}
