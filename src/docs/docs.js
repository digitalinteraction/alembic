import { defineLayoutElements } from '../layouts//layouts.js'
import { DetailsUtils } from '../lib/lib.js'

import { ComponentDef } from './component-def.js'
import { DocBox } from './doc-box.js'
import { DocResizer } from './doc-resizer.js'
import { DocSection } from './doc-section.js'
import { DocText } from './doc-text.js'

if ('customElements' in window) {
  defineLayoutElements()

  DetailsUtils.defineElement()

  customElements.define('component-def', ComponentDef)
  customElements.define('doc-box', DocBox)
  customElements.define('doc-resizer', DocResizer)
  customElements.define('doc-section', DocSection)
  customElements.define('doc-text', DocText)
}
