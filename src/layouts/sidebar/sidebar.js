import { addGlobalStyle, trimCss } from '../../lib/style.js'

const defaults = {
  side: 'left',
  sideWidth: null,
  contentMin: '50%',
  space: 'var(--s1)',
  noStretch: false,
}

/**
 * SidebarLayout places two elements side-by-side. If space permits it, the sidebar has a set width and the content fills up the rest of the space. If there is not enough space, the elements collapse into a single column, taking up all of the horizontal space.
 *
 * @property {string} side=left Which side to put the sidebar on, only "right" or "left" are allowed.
 * @property {string} sideWidth=null A CSS `length`, for the sidebar's width. If `null` use the intrinsic content width.
 * @property {string} contentMin=50% A CSS `percentage`, representing the minimum horizontal width of the content element.
 * @property {string} space=var(--s1) A CSS `gap` of space between the sidebar and content.
 * @property {boolean} noStretch=false Keep the sidebar and content their natural height
 */
export class SidebarLayout extends HTMLElement {
  static get observedAttributes() {
    return ['side', 'sideWidth', 'contentMin', 'space', 'noStretch']
  }
  static defineElement() {
    customElements.define('sidebar-layout', SidebarLayout)
  }
  static getStyles(attrs) {
    const { side, sideWidth, contentMin, space, noStretch } = {
      ...defaults,
      ...attrs,
    }
    const id = `SidebarLayout-${side}${sideWidth}${contentMin}${space}${noStretch}`
    const sideSelector = side !== 'left' ? `:first-child` : `:last-child`
    const css = trimCss`
      [data-i="${id}"] {
        gap: ${space};
        ${noStretch ? 'align-items: flex-start;' : ''}
      }
      [data-i="${id}"] > * {
        ${sideWidth ? `flex-basis: ${sideWidth};` : ''}
      }
      [data-i="${id}"] > ${sideSelector} {
        flex-basis: 0;
        flex-grow: 999;
        min-inline-size: ${contentMin};
      }
    `
    return { id, css }
  }

  get side() {
    return this.getAttribute('side') || defaults.side
  }
  set side(value) {
    return this.setAttribute('side', value)
  }

  get sideWidth() {
    return this.getAttribute('sideWidth') || defaults.sideWidth
  }
  set sideWidth(value) {
    return this.setAttribute('sideWidth', value)
  }

  get contentMin() {
    return this.getAttribute('contentMin') || defaults.contentMin
  }
  set contentMin(value) {
    return this.setAttribute('contentMin', value)
  }

  get space() {
    return this.getAttribute('space') || defaults.space
  }
  set space(value) {
    return this.setAttribute('space', value)
  }

  get noStretch() {
    return this.hasAttribute('noStretch')
  }
  set noStretch(value) {
    if (value) this.setAttribute('noStretch', '')
    else this.removeAttribute('noStretch')
  }

  render() {
    if (!this.contentMin.includes('%')) {
      console.warn(
        '<sidebar-layout> `contentMin` property should be a percentage to prevent overflow. %o supplied',
        this.contentMin
      )
    }

    const { side, sideWidth, contentMin, space, noStretch } = this
    const { id, css } = SidebarLayout.getStyles({
      side,
      sideWidth,
      contentMin,
      space,
      noStretch,
    })
    this.dataset.i = id
    addGlobalStyle(id, css)
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
