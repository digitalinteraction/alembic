import { addGlobalStyle, getHTMLElement, trimCss } from '../../lib/lib.js'

const defaultAttributes = {
  justify: 'flex-start',
  align: 'flex-start',
  space: 'var(--s1)',
}

export interface ClusterLayoutAttributes {
  justify?: string
  align?: string
  space?: string
}

/**
  ClusterLayout groups items together with control for the margin between them.
  [Documentation →](https://alembic.openlab.dev/layouts/#cluster)
  
  > NOTE — if flex-gap isn't supported, items will appear flush
 */
export class ClusterLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['justify', 'align', 'space']
  }
  static defineElement() {
    customElements.define('cluster-layout', ClusterLayout)
  }
  static getStyles(attrs: ClusterLayoutAttributes) {
    const { justify, align, space } = { ...defaultAttributes, ...attrs }
    const id = `ClusterLayout-${justify}${align}${space}`
    const css = trimCss`
      [data-i="${id}"] {
        justify-content: ${justify};
        align-items: ${align};
        gap: ${space};
      }
    `
    return { id, css }
  }

  get justify() {
    return this.getAttribute('justify') ?? defaultAttributes.justify
  }
  set justify(value) {
    this.setAttribute('justify', value)
  }
  get align() {
    return this.getAttribute('align') ?? defaultAttributes.align
  }
  set align(value) {
    this.setAttribute('align', value)
  }
  get space() {
    return this.getAttribute('space') ?? defaultAttributes.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  render() {
    const { justify, align, space } = this
    const { id, css } = ClusterLayout.getStyles({ justify, align, space })
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
