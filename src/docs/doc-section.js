const style = `
.docSection {
  position: relative;
}
.docSection-title {
  position: sticky;
  top: 0;
  background: var(--doc-background);
  font-size: 1.5em;
  font-family: var(--doc-family);
  cursor: pointer;
  font-weight: bold;
}
::slotted(*:not(:first-child)) {
  margin-block-start: var(--s2);
}
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<section class="docSection">
  <details-utils class="docSection-detailUtils">
    <details>
      <summary class="docSection-title"></summary>
      <slot></slot>
    </details>
  </details-utils>
</section>
`

export class DocSection extends HTMLElement {
  get title() {
    return this.getAttribute('label') ?? ''
  }
  get prefix() {
    return this.getAttribute('prefix') ?? ''
  }
  get detailsUtilsElem() {
    return this.shadowRoot.querySelector('.docSection-detailUtils')
  }
  get titleElem() {
    return this.shadowRoot.querySelector('.docSection-title')
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
