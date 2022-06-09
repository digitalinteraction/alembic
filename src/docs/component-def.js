const template = document.createElement('template')
template.innerHTML = `
<section part="section">
  <h3 part="heading">
    <span part="title"></span>
    <button part="toggle">show code</button>
  </h3>
  <div part="inner">
    <doc-resizer>
      <slot></slot>
    </doc-resizer>
  </div>
</section>
`

export class ComponentDef extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'no-pad']
  }

  get title() {
    return this.getAttribute('label') ?? ''
  }
  get noPad() {
    return this.hasAttribute('no-pad')
  }
  set noPad(value) {
    if (value) this.setAttribute('no-pad', '')
    else this.removeAttribute('no-pad')
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const button = this.shadowRoot.querySelector("[part='toggle']")
    const slot = this.shadowRoot.querySelector('slot')

    const pre = document.createElement('pre')
    pre.setAttribute('part', 'code')
    pre.innerText = this.renderCode(this.innerHTML)

    button.addEventListener('click', () => {
      const showCode = Boolean(slot.parentElement)
      const current = showCode ? slot : pre
      const next = showCode ? pre : slot
      button.textContent = showCode ? 'hide code' : 'show code'

      current.replaceWith(next)
    })
  }
  render() {
    const titleElem = this.shadowRoot.querySelector("[part='title']")
    titleElem.textContent = this.title
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }

  renderCode(html) {
    const indent = /[ \t]+/.exec(html)

    return html
      .split(/\r?\n/)
      .map((l) => l.replace(indent, ''))
      .join('\n')
      .replace(/\s*data-i=".+"/g, '')
      .trim()
  }
}
