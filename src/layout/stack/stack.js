import { addGlobalStyle } from '../../lib/style.js'

// const style = `
// `
//
// const template = document.createElement('template')
// template.innerHTML = `
// `

const spaces = {
  none: '0',
  tiny: 'var(--s-2)',
  small: 'var(--s-1)',
  regular: 'var(--s0)',
  medium: 'var(--s1)',
  large: 'var(--s2)',
}

export class StackLayout extends HTMLElement {
  static get observedAttributes() {
    return ['space']
  }

  get space() {
    const key = this.getAttribute('space') ?? 'regular'
    const size = spaces[key]
    if (!size) console.error(`StackLayout#space bad value %o`, key)
    return size ?? 'regular'
  }

  constructor() {
    super()

    this.classList.add('stack')
  }
  render() {
    // this.style = `--space: ${this.space};`
    this.dataset.i = `stack-${this.space}`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] > * + * {
          --space: ${this.space};
        }
      `
    )
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
