import { addGlobalStyle, trimCss } from '../../lib/style.js'

const ratioRegex = () => /^(\d+):(\d+)$/
const defaults = {
  ratio: '16:9',
}

/**
 * FrameLayout displays an element with an aspect ratio
 *
 * @property {string} ratio=16:9 The element's aspect ratio
 */
export class FrameLayout extends HTMLElement {
  static get observedAttributes() {
    return ['ratio']
  }
  static defineElement() {
    customElements.define('frame-layout', FrameLayout)
  }
  static getStyles(attrs) {
    const { ratio } = { ...defaults, ...attrs }

    const parsedRatio = ratioRegex().exec(ratio)
    if (!parsedRatio) throw new Error(`Invalid ratio '${ratio}'`)

    const id = `FrameLayout-${ratio}`
    const css = trimCss`
      [data-i="${id}"] {
        aspect-ratio: ${parsedRatio[1]} / ${parsedRatio[2]};
      }
    `
    return { id, css }
  }

  get ratio() {
    return this.getAttribute('ratio') || defaults.ratio
  }
  set ratio(value) {
    return this.setAttribute('ratio', value)
  }

  render() {
    if (this.children.length != 1) {
      console.warn('<frame-layout> should only have one child element')
    }
    const ratio = ratioRegex().exec(this.ratio)
    if (!ratio) {
      console.error(
        '<frame-layout> `ratio` must in the format %o but got %o',
        '16:9',
        this.ratio
      )
      return
    }

    const { id, css } = FrameLayout.getStyles({ ratio: this.ratio })
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
