import { trimCss } from '../lib/lib.js'

const style = trimCss`
/* These styles are used in Firefox/chrome */
@media (hover: hover) {
  doc-resizer,
  :host {
    display: flex;
    gap: 1rem;
    box-sizing: border-box;
  }
  doc-resizer::part(content),
  ::part(content) {
    flex: 1;
    max-width: calc(100% - 1rem - 0.5rem); /* 100% - gap - handleWidth */
    box-sizing: border-box;
  }
  doc-resizer::part(handle),
  ::part(handle) {
    width: 0.5rem;
    
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    
    background: var(--doc-foreground);
    cursor: col-resize;
    box-sizing: border-box;
  }
}
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<div part="content">
  <slot></slot>
</div>
<div part="handle" title="Drag to resize">
</div>
`

export class DocResizer extends HTMLElement {
  static get observedAttributes() {
    return []
  }

  get handleElem() {
    return this.shadowRoot.querySelector("[part='handle']")
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    let resized = 0
    this.handleElem.addEventListener('mousedown', (e) => {
      let current = e.screenX + resized

      const onMove = (e) => {
        e.preventDefault()
        resized = Math.max(0, current - e.screenX)
        this.style.marginInlineEnd = `${resized}px`
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener(
        'mouseup',
        () => window.removeEventListener('mousemove', onMove),
        { once: true }
      )
    })

    // Reset the control if the window size changed
    window.addEventListener('resize', () => {
      if (resized) resized = 0
      if (this.style.marginInlineEnd) this.style.marginInlineEnd = null
    })
  }
}
