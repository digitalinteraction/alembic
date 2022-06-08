export class DetailsUtils extends HTMLElement {
  static get observedAttributes() {
    return ['persist']
  }

  static defineElement() {
    customElements.define('details-utils', DetailsUtils)
  }

  get detailsElem() {
    return this.querySelector('details')
  }
  get persist() {
    return this.getAttribute('persist')
  }
  set persist(value) {
    return this.setAttribute('persist', value)
  }

  constructor() {
    super()

    this.detailsElem?.addEventListener('toggle', (e) => {
      if (this.persist) {
        const key = `details-utils.${this.persist}`
        if (e.target.open) localStorage.setItem(key, 'true')
        else localStorage.removeItem(key)
      }

      const offset = e.target.getBoundingClientRect().top
      if (offset < 0) {
        window.scrollTo({ top: window.scrollY + offset })
      }
    })
  }

  render() {
    const { detailsElem } = this

    if (this.persist) {
      const key = `details-utils.${this.persist}`
      detailsElem.open = Boolean(localStorage.getItem(key))
    }
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
