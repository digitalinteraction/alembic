import { DocBox } from './doc-box.js'
import { ComponentDef } from './component-def.js'
import { DocSection } from './doc-section.js'
import { DocResizer } from './doc-resizer.js'

if ('customElements' in window) {
  customElements.define('doc-box', DocBox)
  customElements.define('component-def', ComponentDef)
  customElements.define('doc-section', DocSection)
  customElements.define('doc-resizer', DocResizer)
}
