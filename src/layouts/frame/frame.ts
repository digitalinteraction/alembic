import { addGlobalStyle, getHTMLElement, trimCss } from '../../lib/lib.js'

const ratioRegex = () => /^(\d+):(\d+)$/

const defaultAttributes = {
  ratio: '16:9',
}

export interface FrameLayoutAttributes {
  ratio?: string
}

/**
  FrameLayout displays an element with an aspect ratio.
  [Documentation →](https://alembic.openlab.dev/layouts/#frame)
 */
export class FrameLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['ratio']
  }
  static defineElement() {
    customElements.define('frame-layout', FrameLayout)
  }
  static getStyles(attrs: FrameLayoutAttributes) {
    const { ratio } = { ...defaultAttributes, ...attrs }

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
    return this.getAttribute('ratio') ?? defaultAttributes.ratio
  }
  set ratio(value) {
    this.setAttribute('ratio', value)
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
        this.ratio,
        this
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
