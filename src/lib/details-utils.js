const template = document.createElement('template')
template.innerHTML = `
  <slot></slot>
`

export class DetailsUtils extends HTMLElement {
  static defineElement() {
    customElements.define('details-utils', DetailsUtils)
  }

  get detailsElem() {
    return this.querySelector('details')
  }

  constructor() {
    super()

    this.detailsElem?.addEventListener('toggle', (e) => {
      const key = `details-utils.${e.target.id}`
      if (e.target.open) localStorage.setItem(key, 'true')
      else localStorage.removeItem(key)
    })
  }

  render() {
    const { detailsElem } = this

    if (!detailsElem.id) console.warn('details-utils: details "id" not set')

    if (detailsElem) {
      const key = `details-utils.${detailsElem.id}`
      detailsElem.open = Boolean(localStorage.getItem(key))
    }
  }
  connectedCallback() {
    this.render()
  }
}
