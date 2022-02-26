const style = `
.componentDef {
}
.componentDef-heading {
  font-family: var(--doc-family);
  margin-block: 0 0.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.componentDef-title {
}
.componentDef-inner {
  border: 3px dashed var(--doc-foreground);
  border-radius: 3px;
  padding: 1rem;
}
.componentDef-isUnpadded .componentDef-inner {
  padding: 0;
}
.componentDef-toggle {
  font-family: inherit;
  font-weight: bold;
  padding: 6px 8px;
}
.componentDef-code {
  margin: 0;
  font-family: ui-monospace, monospace;
}
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<section class="componentDef">
  <h3 class="componentDef-heading">
    <span class="componentDef-title"></span>
    <button class="componentDef-toggle">show code</button>
  </h3>
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

    const button = this.shadowRoot.querySelector('.componentDef-toggle')
    const slot = this.shadowRoot.querySelector('slot')
    const pre = document.createElement('pre')
    pre.classList.add('componentDef-code')

    button.addEventListener('click', () => {
      const showCode = Boolean(slot.parentElement)
      const current = showCode ? slot : pre
      const next = showCode ? pre : slot
      button.textContent = showCode ? 'hide code' : 'show code'

      current.replaceWith(next)

      const indent = /[ \t]+/.exec(this.innerHTML)

      pre.textContent = this.innerHTML
        .split(/\r?\n/)
        .map((l) => l.replace(indent, ''))
        .join('\n')
        .replace(/\s*data-i=".+"/g, '')
        .trim()
      // console.log(this.children)
    })
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
