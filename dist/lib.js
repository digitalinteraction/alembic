// src/lib/style.js
function addGlobalStyle(id, style) {
  if (document.getElementById(id))
    return;
  const elem = document.createElement("style");
  elem.id = id;
  elem.innerHTML = style;
  document.head.appendChild(elem);
}
function trimCss(strings, ...args) {
  const parts = [];
  for (let i = 0; i < strings.length; i++) {
    parts.push(strings[i]);
    if (i < args.length) {
      parts.push(args[i]);
    }
  }
  return parts.join("").replace(/\s\s+/g, " ").trim();
}

// src/lib/details-utils.js
var DetailsUtils = class extends HTMLElement {
  static get observedAttributes() {
    return ["persist"];
  }
  static defineElement() {
    customElements.define("details-utils", DetailsUtils);
  }
  get detailsElem() {
    return this.querySelector("details");
  }
  get persist() {
    return this.getAttribute("persist");
  }
  set persist(value) {
    return this.setAttribute("persist", value);
  }
  constructor() {
    super();
    this.detailsElem?.addEventListener("toggle", (e) => {
      if (this.persist) {
        const key = `details-utils.${this.persist}`;
        if (e.target.open)
          localStorage.setItem(key, "true");
        else
          localStorage.removeItem(key);
      }
      const offset = e.target.getBoundingClientRect().top;
      if (e.target.open === false && offset < 0) {
        window.scrollTo({ top: window.scrollY + offset });
      }
    });
  }
  render() {
    const { detailsElem } = this;
    if (this.persist) {
      const key = `details-utils.${this.persist}`;
      detailsElem.open = Boolean(localStorage.getItem(key));
    }
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  toggleOpen(force = !this.detailsElem.open) {
    this.detailsElem.open = force;
  }
};
export {
  DetailsUtils,
  addGlobalStyle,
  trimCss
};
