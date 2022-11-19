import { addGlobalStyle, trimCss } from '../lib/lib.js'

/**
 * DocBox is a coloured box to represent content while demonstrating a layout
 */
export class DocBox extends HTMLElement {
  static get observedAttributes() {
    return ['height', 'width', 'pattern']
  }

  get height() {
    return this.getAttribute('height') ?? null
  }
  set height(value) {
    this.setAttribute('height', value)
  }
  get width() {
    return this.getAttribute('width') ?? null
  }
  set width(value) {
    this.setAttribute('width', value)
  }
  get pattern() {
    return this.getAttribute('pattern') ?? 'a'
  }
  set pattern(value) {
    this.setAttribute('pattern', value)
  }

  render() {
    this.dataset.i = `DocBox-${this.width}${this.height}${this.pattern}`

    const rules = [
      `display: ${this.width !== null ? 'inline-block' : 'block'}`,
      `color: var(--doc-background)`,
      `color: color-contrast(white vs black, var(--doc-foreground))`,
    ]

    if (this.height !== null) rules.push(`height: ${this.height}`)
    if (this.width !== null) rules.push(`width: 100%; max-width: ${this.width}`)

    switch (this.pattern) {
      case 'b':
        rules.push(trimCss`
          background-image: repeating-linear-gradient(
            -45deg,
            var(--doc-foreground),
            var(--doc-foreground) 5px,
            var(--doc-background) 5px,
            var(--doc-background) 10px
          )
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
      `
        [data-i="${this.dataset.i}"] {
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
