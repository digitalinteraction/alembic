const style = `
.docResizer {
  display: flex;
  gap: 1rem;
}
.docResizer-content {
  flex: 1;
}
.docResizer-handle {
  width: 0.5rem;
  
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  
  background: var(--doc-foreground);
  cursor: col-resize;
}
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<div class="docResizer">
  <div class="docResizer-content">
    <slot></slot>
  </div>
  <div class="docResizer-handle" title="Drag to resize">
  </div>
</div>
`

export class DocResizer extends HTMLElement {
  static get observedAttributes() {
    return []
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const root = this.shadowRoot.querySelector('.docResizer')
    const handle = this.shadowRoot.querySelector('.docResizer-handle')

    let resized = 0
    handle.addEventListener('mousedown', (e) => {
      let current = e.screenX + resized

      function onMove(e) {
        e.preventDefault()
        resized = Math.max(0, current - e.screenX)
        root.style = `margin-inline-end: ${resized}px`
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener(
        'mouseup',
        () => window.removeEventListener('mousemove', onMove),
        { once: true }
      )
    })
  }
}
