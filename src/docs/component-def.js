import { trimCss } from '../lib/lib.js'

const style = trimCss`
  :host::part(section) {
  }
  :host::part(heading) {
    font-family: var(--doc-family);
    margin-block: 0 0.1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :host::part(inner) {
    border: 3px dotted var(--doc-foreground);
    padding: var(--s0);
  }
  :host[no-pad]::part(inner) {
    padding: 0;
  }
  :host::part(toggle) {
    font-family: inherit;
    font-weight: bold;
    padding: 4px 6px;
    background-color: #cacad5;
    border: 2px solid #cacad5;
    border-radius: 3px;
    font-size: 0.7em;
    box-shadow: none;
    text-shadow: 1px 2px 3px rgba(255, 255, 255, 0.3);
    color: black;
  }
  :host::part(toggle):hover {
    background: #d6d6e3;
  }
  :host::part(code) {
    margin: 0;
    font-family: ui-monospace, monospace;
    max-width: 100%;
    overflow-x: auto;
  }
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
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
