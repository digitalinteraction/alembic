import { StackLayout } from './stack/stack.js'

if ('customElements' in window) {
  customElements.define('stack-layout', StackLayout)
}
