import {
  defineCustomElements,
  layoutCustomElements,
  ReelLayout,
} from '../module.js'

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
    'a.layoutReel-item'
  )) {
    const url = new URL(elem.href, location.href)
    elem.addEventListener('click', () => toggleSection(url.hash))
  }

  for (const elem of document.querySelectorAll<ReelLayout>(
    'reel-layout.layoutReel[data-autoscroll="true"]'
  )) {
    let lastTick = Date.now()

    function tick() {
      let diff = Date.now() - lastTick
      elem.scrollLeft =
        (elem.scrollLeft + diff * 0.1) % (elem.scrollWidth * 0.5)
      window.requestAnimationFrame(tick)
      lastTick = Date.now()
    }
    window.requestAnimationFrame(tick)
  }
})

function toggleSection(selector: string) {
  const target = document.querySelector(selector)
  console.log(target)
  if (!target || !(target instanceof DocSection)) return
  target.toggleOpen(true)
}
