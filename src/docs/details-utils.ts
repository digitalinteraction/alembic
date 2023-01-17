import { getHTMLElement } from '../lib/lib.js'

const defaultAttributes = {
  persist: undefined,
}

export interface DetailsUtilsAttributes {
  persist?: string
}

// Add scroll-to-and-open and persist opens on <details> elements

export class DetailsUtils extends getHTMLElement() {
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
    return this.getAttribute('persist') ?? defaultAttributes.persist
  }
  set persist(value) {
    if (value) this.setAttribute('persist', value)
    else this.removeAttribute('persist')
  }

  constructor() {
    super()

    this.detailsElem?.addEventListener('toggle', (e) => {
      const target = e.target as HTMLDetailsElement

      if (this.persist) {
        const key = `details-utils.${this.persist}`
        if (target.open) localStorage.setItem(key, 'true')
        else localStorage.removeItem(key)
      }

      const offset = target.getBoundingClientRect().top
      if (target.open === false && offset < 0) {
        window.scrollTo({ top: window.scrollY + offset })
      }
    })
  }

  render() {
    if (this.detailsElem && this.persist) {
      const key = `details-utils.${this.persist}`
      this.detailsElem.open = Boolean(localStorage.getItem(key))
    }
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }

  toggleOpen(force?: boolean) {
    if (!this.detailsElem) {
      throw new TypeError('DetailsUtils: no <details> child')
    }
    this.detailsElem.open = force ?? !this.detailsElem.open
  }
}
