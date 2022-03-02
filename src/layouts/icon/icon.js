import { addGlobalStyle } from '../../lib/style.js'

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
  static register() {
    customElements.define('icon-layout', IconLayout)
  }

  get space() {
    return this.getAttribute('space') ?? null
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  get label() {
    return this.getAttribute('label') ?? null
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
      this.dataset.i = `IconLayout-${this.space}${this.label}`
      addGlobalStyle(
        this.dataset.i,
        `
          [data-i="${this.dataset.i}"] {
            display: inline-flex;
            align-items: baseline;
          }
          
          [data-i="${this.dataset.i}"] > svg {
            margin-inline-end: ${this.space};
          }
        `
      )
    }
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
