import { addGlobalStyle, trimCss } from '../../lib/style.js'

const defaults = {
  space: null,
  label: null,
}

/**
 * IconLayout lays out icons inline nicely
 *
 * @property {string} space=null The space between the text and the icon. If null, the natural word spacing is preserved.
 * @property {string} label=null Turns the element into an image for assistive technologies and sets aria-label to the value.
 */
export class IconLayout extends HTMLElement {
  static get observedAttributes() {
    return ['space', 'label']
  }
  static defineElement() {
    customElements.define('icon-layout', IconLayout)
  }
  static getStyles(attrs) {
    // `label` isn't used because it doesn't effect styles
    const { space } = { ...defaults, ...attrs }
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
    return this.getAttribute('space') ?? defaults.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  get label() {
    return this.getAttribute('label') ?? defaults.label
  }
  set label(value) {
    this.setAttribute('label', value)
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
