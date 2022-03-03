import { addGlobalStyle } from '../../lib/style.js'

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

  get itemWidth() {
    return this.getAttribute('itemWidth') || 'auto'
  }
  set itemWidth(value) {
    return this.setAttribute('itemWidth', value)
  }

  get height() {
    return this.getAttribute('height') || 'auto'
  }
  set height(value) {
    return this.setAttribute('height', value)
  }

  get space() {
    return this.getAttribute('space') || 'var(--s0)'
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
    this.dataset.i = `ReelLayout-${this.itemWidth}${this.height}${this.space}${this.noBar}`

    const barRule = `
      [data-i="${this.dataset.i}"] {
        scrollbar-width: none;
      }
      [data-i="${this.dataset.i}"]::-webkit-scrollbar {
        display: none;
      }
    `

    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          height: ${this.height};
        }
        [data-i="${this.dataset.i}"] > * {
          flex: 0 0 ${this.itemWidth};
        }
        [data-i="${this.dataset.i}"] > * + * {
          margin-inline-start: ${this.space};
        }
        [data-i="${this.dataset.i}"].overflowing {
          ${!this.noBar ? `padding-bottom: ${this.space}` : ''}
        }
        ${this.noBar ? barRule : ''}
      `
    )
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
