import { addGlobalStyle } from '../../lib/style.js'

/**
 * SidebarLayout places two elements side-by-side. If space permits it, the sidebar has a set width and the content fills up the rest of the space. If there is not enough space, the elements collapse into a single column, taking up all of the horizontal space.
 *
 * @property {string} side=left Which side to put the sidebar on, only "right" or "left" are allowed.
 * @property {string} sideWidth=null A CSS `length`, for the sidebar's width. If `null` use the intrinsic content width.
 * @property {string} contentMin=50% A CSS `percentage`, representing the minimum horizontal width of the content element.
 * @property {string} space=var(--s1) A CSS `margin` of space between the sidebar and content.
 * @property {boolean} noStretch=false Keep the sidebar and content thier natural height
 */
export class SidebarLayout extends HTMLElement {
  static get observedAttributes() {
    return ['side', 'sideWidth', 'contentMin', 'space', 'noStretch']
  }
  static defineElement() {
    customElements.define('sidebar-layout', SidebarLayout)
  }

  get side() {
    return this.getAttribute('side') || 'left'
  }
  set side(value) {
    return this.setAttribute('side', value)
  }

  get sideWidth() {
    return this.getAttribute('sideWidth') || null
  }
  set sideWidth(value) {
    return this.setAttribute('sideWidth', value)
  }

  get contentMin() {
    return this.getAttribute('contentMin') || '50%'
  }
  set contentMin(value) {
    return this.setAttribute('contentMin', value)
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)'
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
    this.dataset.i = `SidebarLayout-${this.side}${this.sideWidth}${this.contentMin}${this.space}${this.noStretch}`

    if (!this.contentMin.includes('%')) {
      console.warn(
        '<sidebar-layout> `contentMin` property should be a percentage to prevent overflow. %o supplied',
        this.contentMin
      )
    }

    const sideSelector = this.side !== 'left' ? `:first-child` : `:last-child`

    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          gap: ${this.space};
          ${this.noStretch ? 'align-items: flex-start;' : ''}
        }
        [data-i="${this.dataset.i}"] > * {
          ${this.sideWidth ? `flex-basis: ${this.sideWidth};` : ''}
        }
        [data-i="${this.dataset.i}"] > ${sideSelector} {
          flex-basis: 0;
          flex-grow: 999;
          min-inline-size: ${this.contentMin};
        }
      `
    )
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
