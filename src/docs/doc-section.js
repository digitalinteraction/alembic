const style = `
::slotted(*:not(:first-child)) {
  margin-block-start: var(--s2);
}
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<details-utils part="detailUtils">
  <details>
    <summary part="title"></summary>
    <slot></slot>
  </details>
</details-utils>
`

export class DocSection extends HTMLElement {
  get title() {
    return this.getAttribute('label') ?? ''
  }
  get prefix() {
    return this.getAttribute('prefix') ?? ''
  }
  get detailsUtilsElem() {
    return this.shadowRoot.querySelector("[part='detailUtils']")
  }
  get titleElem() {
    return this.shadowRoot.querySelector("[part='title']")
  }

  constructor() {
    super()

    this.classList.add('docSection')

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.render()
  }
  render() {
    this.titleElem.textContent = this.title
    this.id = this.getSlug(this.title)
    this.detailsUtilsElem.persist = this.prefix + this.id
  }
  connectedCallback() {
    this.render()
  }

  getSlug(input = '') {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]+/g, '')
      .replace(/[\s-]+/g, '-')
  }
}
