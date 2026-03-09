import { addGlobalStyle, trimCss as css } from '../lib/lib.js'

const defaultAttributes = {
  height: undefined,
  width: undefined,
  pattern: 'a',
}

export interface DocBoxAttributes {
  height?: string
  width?: string
  pattern?: 'a' | 'b' | 'c'
}

/**
 `DocBox` is a coloured box to represent content while demonstrating a layout
 [Documentation →](https://alembic.openlab.dev/development/doc-tools/#doc-box)
 */
export class DocBox extends HTMLElement {
  static get observedAttributes() {
    return ['height', 'width', 'pattern']
  }

  get height() {
    return this.getAttribute('height') ?? defaultAttributes.height
  }
  set height(value) {
    if (value) this.setAttribute('height', value)
    else this.removeAttribute('height')
  }
  get width() {
    return this.getAttribute('width') ?? defaultAttributes.width
  }
  set width(value) {
    if (value) this.setAttribute('width', value)
    else this.removeAttribute('width')
  }
  get pattern() {
    return this.getAttribute('pattern') ?? defaultAttributes.pattern
  }
  set pattern(value) {
    this.setAttribute('pattern', value)
  }

  render() {
    this.dataset.i = `DocBox-${this.width}${this.height}${this.pattern}`

    const rules = [
      `display: ${this.width !== undefined ? 'inline-block' : 'block'}`,
      `color: var(--doc-background)`,
      `color: color-contrast(white vs black, var(--doc-foreground))`,
    ]

    if (this.height !== undefined) rules.push(`min-height: ${this.height}`)
    if (this.width !== undefined) rules.push(`min-width: ${this.width}`)

    switch (this.pattern) {
      case 'b':
        rules.push(css`
          background-image: repeating-linear-gradient(
            -45deg,
            var(--doc-foreground),
            var(--doc-foreground) 5px,
            var(--doc-background) 5px,
            var(--doc-background) 10px
          );
        `)
        break
      case 'c':
        const size = '0.25em'
        rules.push(
          `background-color: var(--doc-foreground)`,
          `background-image: radial-gradient(var(--doc-background) ${size}, transparent ${size}),radial-gradient(var(--doc-background) ${size}, transparent ${size})`,
          `background-size: calc(6 * ${size}) calc(6 * ${size})`,
          `background-position: calc(3 * ${size}) calc(3 * ${size}), 0 0`
        )
        break
      default:
        rules.push(`background-color: var(--doc-foreground)`)
        break
    }

    addGlobalStyle(
      this.dataset.i,
      css`
        [data-i='${this.dataset.i}'] {
          ${rules.join(';')}
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
