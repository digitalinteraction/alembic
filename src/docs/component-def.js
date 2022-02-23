const style = `
.componentDef {
}
.componentDef-title {
  font-family: var(--doc-family);
  margin: 1em 0 0.1em;
}
.componentDef-inner {
  border: 4px dashed var(--doc-foreground);
  border-radius: 3px;
  padding: 1rem;
}
.componentDef-isUnpadded .componentDef-inner {
  padding: 0;
}
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<section class="componentDef">
  <h3 class="componentDef-title"></h3>
  <div class="componentDef-inner">
    <slot></slot>
  </div>
</section>
`

export class ComponentDef extends HTMLElement {
  static get observedAttributes() {
    return ['title']
  }

  get title() {
    return this.getAttribute('label') ?? ''
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  render() {
    const titleElem = this.shadowRoot.querySelector('.componentDef-title')
    titleElem.textContent = this.title
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
