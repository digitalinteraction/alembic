import { addGlobalStyle } from '../../lib/style.js'

/**
 * FrameLayout displays an element with an aspect ratio
 *
 * @property {string} ratio=16:9 The element's aspect ratio
 */
export class FrameLayout extends HTMLElement {
  static get observedAttributes() {
    return ['ratio']
  }
  static register() {
    customElements.define('frame-layout', FrameLayout)
  }

  get ratio() {
    return this.getAttribute('ratio') || '16:9'
  }
  set ratio(value) {
    return this.setAttribute('ratio', value)
  }

  render() {
    if (this.children.length != 1) {
      console.warn('<frame-layout> should only have one child element')
    }
    const ratio = /^(\d+):(\d+)$/.exec(this.ratio)
    if (!ratio) {
      console.error(
        '<frame-layout> `ratio` must in the format %o but got %o',
        '16:9',
        this.ratio
      )
      return
    }

    this.dataset.i = `FrameLayout-${this.ratio}`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          aspect-ratio: ${ratio[1]} / ${ratio[2]};
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
