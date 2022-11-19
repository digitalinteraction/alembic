import { trimCss as css } from '../lib/lib.js'

const style = css`
  /* These styles are used in Firefox/chrome */
  /* @media (hover: hover) { */
  :host {
    display: flex;
    gap: 1rem;
    box-sizing: border-box;
  }
  :host::part(content) {
    flex: 1;
    max-width: calc(100% - 1rem - 0.5rem); /* 100% - gap - handleWidth */
    box-sizing: border-box;
  }
  :host::part(handle) {
    width: 0.5rem;

    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;

    background: var(--doc-foreground);
    cursor: col-resize;
    box-sizing: border-box;
  }
  @media (max-width: 1024px) {
    :host::part(handle) {
      width: 1rem;
    }
    :host::part(content) {
      max-width: calc(100% - 1rem - 1rem); /* 100% - gap - handleWidth */
    }
  }
  /* } */
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

// https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

export class DocResizer extends HTMLElement {
  #resized = 0
  /**@type{HTMLElement}*/ #handleElem = null

  static get observedAttributes() {
    return []
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.#handleElem = this.shadowRoot.querySelector("[part='handle']")

    this.#handleElem.onpointerdown = (event) => {
      let current = event.screenX + this.#resized

      this.#handleElem.onpointermove = (event) => {
        console.debug('onpointermove')
        this.#resized = Math.max(0, current - event.screenX)
        this.style.marginInlineEnd = `${this.#resized}px`
      }

      this.#handleElem.setPointerCapture(event.pointerId)
    }
    this.#handleElem.onpointerup = (event) => {
      this.#handleElem.onpointermove = null
      this.#handleElem.releasePointerCapture(event.pointerId)
    }

    // Reset the control if the window size changed
    window.addEventListener('resize', () => {
      if (this.#resized) this.#resized = 0
      if (this.style.marginInlineEnd) this.style.marginInlineEnd = null
    })
  }
}
