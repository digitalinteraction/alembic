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
  Register every Layout custom element in one go
 */
export function defineLayoutElements() {
  if (!('customElements' in window)) {
    throw new TypeError('Cannot call defineLayoutElements when not in the DOM')
  }

  for (const layout of layoutCustomElements.values()) {
    layout.defineElement()
  }
}

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

/**
  Take a HTML file with some layouts in it, compute their styles
  and inject them into the document using `<!-- @openlab/alembic inject-css -->`
  @param {string} inputHtml
 */
export function injectLayoutStyles(inputHtml: string) {
  const styles = new Map<string, string>()

  inputHtml = inputHtml.replace(
    /<(\w+-layout)[\s\n\r]+?([\w\W]*?)>/g,
    (match, layoutName, attrs) => {
      const props = _parseHtmlAttributes(attrs)
      const result = _processLayoutMatch(layoutName, props)

      if (!result) {
        console.warn('Skipping unknown layout %o', layoutName)
        return match
      }

      if (!styles.has(result.id)) styles.set(result.id, result.css)
      return result.newTag
    }
  )

  // Generate stylesheets for each style
  const stylesheets = Array.from(styles.entries())
    .map(([id, css]) => _createLayoutStyle(id, css))
    .join('')

  return _injectLayoutStyles(inputHtml, stylesheets)
}

export function _injectLayoutStyles(inputHtml: string, styles: string) {
  return inputHtml.replace(
    /<!--\s+@openlab\/alembic\s+inject-css\s+-->/,
    styles
  )
}

export function _createLayoutStyle(id: string, css: string) {
  return `<style id="${id}">${css}</style>`
}

export function _parseHtmlAttributes(attrs: string) {
  const props: Record<string, string> = {}
  for (const attr of attrs.matchAll(/(\w[\w-]+)(?:="?([^"]*)"?)?/g)) {
    props[attr[1]] = attr[2] ?? ''
  }
  return props
}

export function _processLayoutMatch(
  layoutName: string,
  props: Record<string, string>
) {
  const layout = layoutCustomElements.get(layoutName)
  if (!layout) return null

  const styles = layout.getStyles(props)
  const newTag = `<${layoutName} ${_formatHtmlAttributes(props)} data-i="${
    styles.id
  }">`

  return { ...styles, newTag }
}

export function _formatHtmlAttributes(attrs: Record<string, string>) {
  return Array.from(Object.keys(attrs))
    .map((key) => `${key}="${attrs[key]}"`)
    .join(' ')
}
