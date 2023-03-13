import { addGlobalStyle, getHTMLElement, trimCss } from '../../lib/lib.js'

const defaultAttributes = {
  min: '250px',
  space: 'var(--s1)',
}

export interface GridLayoutAttributes {
  min?: string
  space?: string
}

/**
  GridLayout creates a responsive grid using CSS Grid.
  [Documentation →](https://alembic.openlab.dev/layouts/#grid)
 */
export class GridLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['min', 'space']
  }
  static defineElement() {
    customElements.define('grid-layout', GridLayout)
  }
  static getStyles(attrs: GridLayoutAttributes) {
    const { min, space } = { ...defaultAttributes, ...attrs }
    const id = `GridLayout-${min}${space}`
    const css = trimCss`
      [data-i="${id}"] {
        grid-gap: ${space};
      }
      
      @supports (width: min(${min}, 100%)) {
        [data-i="${id}"] {
          grid-template-columns: repeat(auto-fill, minmax(min(${min}, 100%), 1fr));
        }
      }
    `
    return { id, css }
  }

  get min() {
    return this.getAttribute('min') ?? defaultAttributes.min
  }
  set min(value) {
    this.setAttribute('min', value)
  }

  get space() {
    return this.getAttribute('space') ?? defaultAttributes.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  render() {
    const { min, space } = this
    const { id, css } = GridLayout.getStyles({ min, space })
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
