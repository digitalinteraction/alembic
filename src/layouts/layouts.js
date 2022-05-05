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

/**
  Take a HTML file with some layouts in it, compute their styles
  and inject them into the document using `<!-- @openlab/alembic inject-css -->`
*/
export function injectStyles(inputHtml) {
  const styles = new Map()

  // Loop through each tag ending in "-layout"
  for (const tag of inputHtml.matchAll(/<(\w+-layout)\s*(.*)>/g)) {
    const [layout, attrs] = tag.slice(1)

    if (!layoutMap[layout]) {
      console.warn('Skipping unknown layout %o', layout)
      continue
    }

    // Parse HTML attributes into an object
    const props = {}
    for (const attr of attrs.matchAll(/(\w+)="(.*?)"/g)) {
      props[attr[1]] = attr[2]
    }

    // Compute and store the style if it is new
    const { id, css } = layoutMap[layout].getStyles(props)
    if (styles.has(id)) continue
    styles.set(id, css)
  }

  // Generate stylesheets for each style
  const stylesheets = []
  for (const [id, css] of styles) {
    stylesheets.push(`<style id="${id}">${css}</style>`)
  }

  // Inject the styles into the HTML
  return inputHtml.replace(
    /<!--\s+@openlab\/alembic\s+inject-css\s+-->/,
    stylesheets.join('')
  )
}
