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

/** 
  Register every Layout custom element in one go
 */
export function defineLayoutElements() {
  if (!('customElements' in window)) return

  for (const layout of Object.values(layoutMap)) layout.defineElement()
}

/** 
  `layoutMap` is a map of custom element name to Layout class
 */
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

/**
  layoutCustomElementNames is an array of all custom element names,
  useful for telling compilers (like Vue) to ignore these custom elements.
  The order of these is NOT guaranteed
 */
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
  @param {string} inputHtml
 */
export function injectLayoutStyles(inputHtml) {
  const styles = new Map()

  inputHtml = inputHtml.replace(
    /<(\w+-layout)[\s\n\r]+?([\w\W]*?)>/g,
    (match, layout, attrs) => {
      const props = _parseHtmlAttributes(attrs)
      const result = _processLayoutMatch(layout, props, styles)

      if (!result) {
        console.warn('Skipping unknown layout %o', layout)
        return match
      }

      if (!styles.has(result.id)) styles.set(result.id, result.css)
      return result.newTag
    }
  )

  // Generate stylesheets for each style
  const stlyesheets = Array.from(styles.entries())
    .map(([id, css]) => _createLayoutStyle(id, css))
    .join('')

  return _injectLayoutStyles(inputHtml, stlyesheets)
}

export function _injectLayoutStyles(inputHtml, styles) {
  return inputHtml.replace(
    /<!--\s+@openlab\/alembic\s+inject-css\s+-->/,
    styles
  )
}

export function _createLayoutStyle(id, css) {
  return `<style id="${id}">${css}</style>`
}

export function _parseHtmlAttributes(attrs) {
  const props = {}
  for (const attr of attrs.matchAll(/(\w+)(?:="?([^"]*)"?)?/g)) {
    props[attr[1]] = attr[2] ?? ''
  }
  return props
}

export function _processLayoutMatch(layout, props) {
  if (!layoutMap[layout]) return null

  const styles = layoutMap[layout].getStyles(props)
  const newTag = `<${layout} ${_formatHtmlAttributes(props)} data-i="${
    styles.id
  }">`

  return { ...styles, newTag }
}

export function _formatHtmlAttributes(attrs) {
  return Array.from(Object.keys(attrs))
    .map((key) => `${key}="${attrs[key]}"`)
    .join(' ')
}
