import { addGlobalStyle, trimCss } from '../../lib/style.js'

const defaults = {
  itemWidth: 'auto',
  height: 'auto',
  space: 'var(--s0)',
  noBar: false,
}

/**
 * ReelLayout places elements horizontally and facilitates scrolling overflow
 *
 * @property {string} itemWidth=auto The width of each element
 * @property {string} space=var(--s0) The space between each element
 * @property {string} height=auto The height of the ReelLayout itself
 * @property {boolean} noBar=false Whether to hide the scrollbar
 */
export class ReelLayout extends HTMLElement {
  static get observedAttributes() {
    return ['itemWidth', 'height', 'space', 'noBar']
  }
  static defineElement() {
    customElements.define('reel-layout', ReelLayout)
  }
  static getStyles(attrs) {
    const { itemWidth, height, space, noBar } = { ...defaults, ...attrs }
    const id = `ReelLayout-${itemWidth}${height}${space}${noBar}`
    const barRule = `
      [data-i="${id}"] {
        scrollbar-width: none;
      }
      [data-i="${id}"]::-webkit-scrollbar {
        display: none;
      }
    `
    const css = trimCss`
      [data-i="${id}"] {
        height: ${height};
      }
      [data-i="${id}"] > * {
        flex: 0 0 ${itemWidth};
      }
      [data-i="${id}"] > * + * {
        margin-inline-start: ${space};
      }
      [data-i="${id}"].overflowing {
        ${!noBar ? `padding-bottom: ${space}` : ''}
      }
      ${noBar ? barRule : ''}
    `
    return { id, css }
  }

  get itemWidth() {
    return this.getAttribute('itemWidth') || defaults.itemWidth
  }
  set itemWidth(value) {
    return this.setAttribute('itemWidth', value)
  }

  get height() {
    return this.getAttribute('height') || defaults.height
  }
  set height(value) {
    return this.setAttribute('height', value)
  }

  get space() {
    return this.getAttribute('space') || defaults.space
  }
  set space(value) {
    return this.setAttribute('space', value)
  }

  get noBar() {
    return this.hasAttribute('noBar')
  }
  set noBar(value) {
    if (value) this.setAttribute('noBar', '')
    else this.removeAttribute('noBar')
  }

  toggleOverflowClass(elem) {
    elem.classList.toggle('overflowing', this.scrollWidth > this.clientWidth)
  }

  render() {
    const { itemWidth, height, space, noBar } = this
    const { id, css } = ReelLayout.getStyles({
      itemWidth,
      height,
      space,
      noBar,
    })
    this.dataset.i = id
    addGlobalStyle(id, css)
  }
  connectedCallback() {
    this.render()

    if ('ResizeObserver' in window) {
      new ResizeObserver((entries) => {
        this.toggleOverflowClass(entries[0].target)
      }).observe(this)
    }

    if ('MutationObserver' in window) {
      new MutationObserver((entries) => {
        this.toggleOverflowClass(entries[0].target)
      }).observe(this, { childList: true })
    }
  }
  attributeChangedCallback() {
    this.render()
  }
}
