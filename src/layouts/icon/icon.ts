import { addGlobalStyle, getHTMLElement, trimCss } from '../../lib/lib.js'

const defaultAttributes = {
  space: undefined,
  label: undefined,
}

export interface IconLayoutAttributes {
  space?: string
  label?: string
}

/**
 * IconLayout lays out icons inline nicely
 *
 * @property {string} space=null The space between the text and the icon. If null, the natural word spacing is preserved.
 * @property {string} label=null Turns the element into an image for assistive technologies and sets aria-label to the value.
 */
export class IconLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['space', 'label']
  }
  static defineElement() {
    customElements.define('icon-layout', IconLayout)
  }
  static getStyles(attrs: IconLayoutAttributes) {
    // `label` isn't used because it doesn't effect styles
    const { space } = { ...defaultAttributes, ...attrs }
    const id = `IconLayout-${space}`

    const spaceRule = trimCss`
      [data-i="${id}"] {
        display: inline-flex;
        align-items: baseline;
      }
      
      [data-i="${id}"] > svg {
        margin-inline-end: ${space};
      }
    `

    const css = space ? spaceRule : ''
    return { id, css }
  }

  get space() {
    return this.getAttribute('space') ?? defaultAttributes.space
  }
  set space(value) {
    if (value) this.setAttribute('space', value)
    else this.removeAttribute('space')
  }

  get label() {
    return this.getAttribute('label') ?? defaultAttributes.label
  }
  set label(value) {
    if (value) this.setAttribute('label', value)
    else this.removeAttribute('label')
  }

  render() {
    if (this.label) {
      this.setAttribute('role', 'img')
      this.setAttribute('aria-label', this.label)
    }

    if (this.space) {
      const { id, css } = IconLayout.getStyles({ space: this.space })
      this.dataset.i = id
      addGlobalStyle(id, css)
    }
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
