import { StackLayout } from './stack/stack.js'
import { BoxLayout } from './box/box.js'

if ('customElements' in window) {
  StackLayout.register()
  BoxLayout.register()
}
