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
  margin-block-start: 50px;
}
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<section class="docSection">
  <details-utils>
    <details class="docSection-details">
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
  get detailsElem() {
    return this.shadowRoot.querySelector('.docSection-details')
  }
  get titleElem() {
    return this.shadowRoot.querySelector('.docSection-title')
  }

  constructor() {
    super()

    this.classList.add('docSection')

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  render() {
    this.titleElem.textContent = this.title
    this.detailsElem.id = this.getSlug(this.title)

    this.detailsElem.open = Boolean(
      localStorage.getItem(`doc-section.${this.id}`)
    )
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
