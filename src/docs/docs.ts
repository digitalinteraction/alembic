import { defineCustomElements, layoutCustomElements } from '../module.js'

import { DetailsUtils } from './details-utils.js'
import { ComponentDef } from './component-def.js'
import { DocBox } from './doc-box.js'
import { DocResizer } from './doc-resizer.js'
import { DocSection } from './doc-section.js'
import { DocText } from './doc-text.js'

const elements = new Map<string, CustomElementConstructor>([
  ...layoutCustomElements,
  ['component-def', ComponentDef],
  ['doc-box', DocBox],
  ['doc-resizer', DocResizer],
  ['doc-section', DocSection],
  ['doc-text', DocText],
  ['details-utils', DetailsUtils],
])

defineCustomElements(elements)

window.addEventListener('DOMContentLoaded', () => {
  if (location.hash) toggleSection(location.hash)

  for (const elem of document.querySelectorAll<HTMLAnchorElement>(
    'a.layoutNav-item'
  )) {
    const url = new URL(elem.href, location.href)
    elem.addEventListener('click', () => toggleSection(url.hash))
  }
})

function toggleSection(selector: string) {
  const target = document.querySelector(selector)
  console.log(target)
  if (!target || !(target instanceof DocSection)) return
  target.toggleOpen(true)
}
