import { trimCss as css } from '../lib/lib.js'
import { DetailsUtils } from './details-utils.js'

const style = css`
  :host {
    position: relative;
  }
  :host::part(label) {
    position: sticky;
    top: 0;
    background: var(--doc-background);
    font-size: 1.5em;
    font-family: var(--doc-family);
    cursor: pointer;
    font-weight: bold;
    z-index: 1;
  }
  :host::slotted(*:not(:first-child)) {
    margin-block-start: var(--s2);
  }
  ::slotted(*:not(:first-child)) {
    margin-block-start: var(--s2);
  }
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<details-utils part="detailUtils">
  <details>
    <summary part="label"></summary>
    <slot></slot>
  </details>
</details-utils>
`

const defaultAttributes = {
  label: '',
  prefix: '',
}

export interface DocSectionAttributes {
  label?: string
  prefix?: string
}

export class DocSection extends HTMLElement {
  get label() {
    return this.getAttribute('label') ?? defaultAttributes.label
  }
  get prefix() {
    return this.getAttribute('prefix') ?? defaultAttributes.prefix
  }

  get detailsUtilsElem() {
    return this.shadowRoot!.querySelector(
      "[part='detailUtils']"
    ) as DetailsUtils
  }
  get labelElem() {
    return this.shadowRoot!.querySelector("[part='label']")!
  }

  constructor() {
    super()

    this.classList.add('docSection')

    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.appendChild(template.content.cloneNode(true))

    this.render()
  }
  render() {
    this.labelElem.textContent = this.label
    this.id = this.getSlug(this.label)
    this.detailsUtilsElem.persist = this.prefix + this.id
  }
  connectedCallback() {
    this.render()
  }

  toggleOpen(force: boolean) {
    this.detailsUtilsElem.toggleOpen(force)
  }

  getSlug(input = '') {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]+/g, '')
      .replace(/[\s-]+/g, '-')
  }
}
