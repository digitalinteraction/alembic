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

// src/layouts/stack/stack.js
var defaults = {
  space: "var(--s1)"
};
var StackLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["space"];
  }
  static defineElement() {
    customElements.define("stack-layout", StackLayout);
  }
  static getStyles(attrs) {
    const { space } = { ...defaults, ...attrs };
    const id = `StackLayout-${space}`;
    const css = trimCss`
      [data-i="${id}"] > * + * {
        margin-block-start: ${space};
      }
    `;
    return { id, css };
  }
  get space() {
    return this.getAttribute("space") ?? defaults.space;
  }
  set space(value) {
    this.setAttribute("space", value);
  }
  render() {
    const { space } = this;
    const { id, css } = StackLayout.getStyles({ space });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/box/box.js
var defaults2 = {
  padding: "var(--s1)",
  borderWidth: "var(--border-thin)",
  invert: false
};
var BoxLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["borderWidth", "padding", "invert"];
  }
  static defineElement() {
    customElements.define("box-layout", BoxLayout);
  }
  static getStyles(attrs) {
    const { padding, borderWidth, invert } = { ...defaults2, ...attrs };
    const id = `BoxLayout-${padding}${borderWidth}${invert}`;
    const invertRule = invert ? `color: var(--color-background); background-color: var(--color-foreground);` : `color: var(--color-foreground); background-color: var(--color-background);`;
    const css = trimCss`
      [data-i="${id}"] {
        padding: ${padding};
        border-width: ${borderWidth};
        ${invertRule}
      }
    `;
    return { id, css };
  }
  get padding() {
    return this.getAttribute("padding") || defaults2.padding;
  }
  set padding(value) {
    return this.setAttribute("padding", value);
  }
  get borderWidth() {
    return this.getAttribute("borderWidth") || defaults2.borderWidth;
  }
  set borderWidth(value) {
    return this.setAttribute("borderWidth", value);
  }
  get invert() {
    return this.hasAttribute("invert");
  }
  set invert(value) {
    if (value)
      this.setAttribute("invert", "");
    else
      this.removeAttribute("invert");
  }
  render() {
    const { padding, borderWidth, invert } = this;
    const { id, css } = BoxLayout.getStyles({ padding, borderWidth, invert });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/center/center.js
var defaults3 = {
  max: "var(--measure)",
  gutters: null,
  intrinsic: false
};
var CenterLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["max", "gutters", "intrinsic"];
  }
  static defineElement() {
    customElements.define("center-layout", CenterLayout);
  }
  static getStyles(attrs) {
    const { max, gutters, intrinsic } = { ...defaults3, ...attrs };
    const id = `CenterLayout-${max}${gutters}${intrinsic}`;
    const guttersRule = `padding-inline: ${gutters};`;
    const intrinsicRule = `
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
    const css = trimCss`
      [data-i="${id}"] {
        max-width: ${max};
        ${gutters ? guttersRule : ""}
        ${intrinsic ? intrinsicRule : ""}
      }
    `;
    return { id, css };
  }
  get max() {
    return this.getAttribute("max") || defaults3.max;
  }
  set max(value) {
    return this.setAttribute("max", value);
  }
  get gutters() {
    return this.getAttribute("gutters") || defaults3.gutters;
  }
  set gutters(value) {
    return this.setAttribute("gutters", value);
  }
  get intrinsic() {
    return this.hasAttribute("intrinsic") || defaults3.intrinsic;
  }
  set intrinsic(value) {
    if (value)
      this.setAttribute("intrinsic", "");
    else
      this.removeAttribute("intrinsic");
  }
  render() {
    const { max, gutters, intrinsic } = this;
    const { id, css } = CenterLayout.getStyles({ max, gutters, intrinsic });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/cluster/cluster.js
var defaults4 = {
  justify: "flex-start",
  align: "flex-start",
  space: "var(--s1)"
};
var ClusterLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["justify", "align", "space"];
  }
  static defineElement() {
    customElements.define("cluster-layout", ClusterLayout);
  }
  static getStyles(attrs) {
    const { justify, align, space } = { ...defaults4, ...attrs };
    const id = `ClusterLayout-${justify}${align}${space}`;
    const css = trimCss`
      [data-i="${id}"] {
        justify-content: ${justify};
        align-items: ${align};
        gap: ${space};
      }
    `;
    return { id, css };
  }
  get justify() {
    return this.getAttribute("justify") ?? defaults4.justify;
  }
  set justify(value) {
    this.setAttribute("justify", value);
  }
  get align() {
    return this.getAttribute("align") ?? defaults4.align;
  }
  set align(value) {
    this.setAttribute("align", value);
  }
  get space() {
    return this.getAttribute("space") ?? defaults4.space;
  }
  set space(value) {
    this.setAttribute("space", value);
  }
  render() {
    const { justify, align, space } = this;
    const { id, css } = ClusterLayout.getStyles({ justify, align, space });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/sidebar/sidebar.js
var defaults5 = {
  side: "left",
  sideWidth: null,
  contentMin: "50%",
  space: "var(--s1)",
  noStretch: false
};
var SidebarLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["side", "sideWidth", "contentMin", "space", "noStretch"];
  }
  static defineElement() {
    customElements.define("sidebar-layout", SidebarLayout);
  }
  static getStyles(attrs) {
    const { side, sideWidth, contentMin, space, noStretch } = {
      ...defaults5,
      ...attrs
    };
    const id = `SidebarLayout-${side}${sideWidth}${contentMin}${space}${noStretch}`;
    const sideSelector = side !== "left" ? `:first-child` : `:last-child`;
    const css = trimCss`
      [data-i="${id}"] {
        gap: ${space};
        ${noStretch ? "align-items: flex-start;" : ""}
      }
      [data-i="${id}"] > * {
        ${sideWidth ? `flex-basis: ${sideWidth};` : ""}
      }
      [data-i="${id}"] > ${sideSelector} {
        flex-basis: 0;
        flex-grow: 999;
        min-inline-size: ${contentMin};
      }
    `;
    return { id, css };
  }
  get side() {
    return this.getAttribute("side") || defaults5.side;
  }
  set side(value) {
    return this.setAttribute("side", value);
  }
  get sideWidth() {
    return this.getAttribute("sideWidth") || defaults5.sideWidth;
  }
  set sideWidth(value) {
    return this.setAttribute("sideWidth", value);
  }
  get contentMin() {
    return this.getAttribute("contentMin") || defaults5.contentMin;
  }
  set contentMin(value) {
    return this.setAttribute("contentMin", value);
  }
  get space() {
    return this.getAttribute("space") || defaults5.space;
  }
  set space(value) {
    return this.setAttribute("space", value);
  }
  get noStretch() {
    return this.hasAttribute("noStretch");
  }
  set noStretch(value) {
    if (value)
      this.setAttribute("noStretch", "");
    else
      this.removeAttribute("noStretch");
  }
  render() {
    if (!this.contentMin.includes("%")) {
      console.warn("<sidebar-layout> `contentMin` property should be a percentage to prevent overflow. %o supplied", this.contentMin);
    }
    const { side, sideWidth, contentMin, space, noStretch } = this;
    const { id, css } = SidebarLayout.getStyles({
      side,
      sideWidth,
      contentMin,
      space,
      noStretch
    });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/switcher/switcher.js
var defaults6 = {
  threshold: "var(--measure)",
  space: "var(--s1)",
  limit: "4"
};
var SwitcherLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["threshold", "space", "limit"];
  }
  static defineElement() {
    customElements.define("switcher-layout", SwitcherLayout);
  }
  static getStyles(attrs) {
    const { threshold, space, limit } = { ...defaults6, ...attrs };
    const id = `SwitcherLayout-${threshold}${space}${limit}`;
    const nPlus1 = parseInt(limit) + 1;
    const css = trimCss`
      [data-i="${id}"] {
        gap: ${space};
      }
      [data-i="${id}"] > * {
        flex-basis: calc((${threshold} - 100%) * 999);
      }
      [data-i="${id}"] > :nth-last-child(n+${nPlus1}),
      [data-i="${id}"] > :nth-last-child(n+${nPlus1}) ~ * {
        flex-basis: 100%;
      }
    `;
    return { id, css };
  }
  get threshold() {
    return this.getAttribute("threshold") || defaults6.threshold;
  }
  set threshold(value) {
    return this.setAttribute("threshold", value);
  }
  get space() {
    return this.getAttribute("space") || defaults6.space;
  }
  set space(value) {
    return this.setAttribute("space", value);
  }
  get limit() {
    return this.getAttribute("limit") || defaults6.limit;
  }
  set limit(value) {
    return this.setAttribute("limit", value);
  }
  render() {
    if (Number.isNaN(parseInt(this.limit))) {
      console.warn("<switcher-layout> `limit` is not a number, %o", this.limit);
    }
    const { threshold, space, limit } = this;
    const { id, css } = SwitcherLayout.getStyles({ threshold, space, limit });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/cover/cover.js
var defaults7 = {
  centered: "h1",
  space: "var(--s1)",
  minHeight: "100vh",
  noPad: false
};
var CoverLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["centered", "space", "minHeight", "noPad"];
  }
  static defineElement() {
    customElements.define("cover-layout", CoverLayout);
  }
  static getStyles(attrs) {
    const { centered, space, minHeight, noPad } = { ...defaults7, ...attrs };
    const id = `CoverLayout-${centered}${space}${minHeight}${noPad}`;
    const css = trimCss`
      [data-i="${id}"] {
        min-height: ${minHeight};
        padding: ${!noPad ? space : "0"};
      }
      [data-i="${id}"] > * {
        margin-block: ${space};
      }
      [data-i="${id}"] > :first-child:not(${centered}) {
        margin-block-start: 0;
      }
      [data-i="${id}"] > :last-child:not(${centered}) {
        margin-block-end: 0;
      }
      [data-i="${id}"] > ${centered} {
        margin-block: auto;
      }
    `;
    return { id, css };
  }
  get centered() {
    return this.getAttribute("centered") ?? defaults7.centered;
  }
  set centered(value) {
    this.setAttribute("centered", value);
  }
  get space() {
    return this.getAttribute("space") ?? defaults7.space;
  }
  set space(value) {
    this.setAttribute("space", value);
  }
  get minHeight() {
    return this.getAttribute("minHeight") || defaults7.minHeight;
  }
  set minHeight(value) {
    return this.setAttribute("minHeight", value);
  }
  get noPad() {
    return this.hasAttribute("noPad");
  }
  set noPad(value) {
    if (value)
      this.setAttribute("noPad", "");
    else
      this.removeAttribute("noPad");
  }
  render() {
    const { centered, space, minHeight, noPad } = this;
    const { id, css } = CoverLayout.getStyles({
      centered,
      space,
      minHeight,
      noPad
    });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/grid/grid.js
var defaults8 = {
  min: "250px",
  space: "var(--s1)"
};
var GridLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["min", "space"];
  }
  static defineElement() {
    customElements.define("grid-layout", GridLayout);
  }
  static getStyles(attrs) {
    const { min, space } = { ...defaults8, ...attrs };
    const id = `GridLayout-${min}${space}`;
    const css = trimCss`
      [data-i="${id}"] {
        grid-gap: ${space};
      }
      
      @supports (width: min(${min}, 100%)) {
        [data-i="${id}"] {
          grid-template-columns: repeat(auto-fill, minmax(min(${min}, 100%), 1fr));
        }
      }
    `;
    return { id, css };
  }
  get min() {
    return this.getAttribute("min") || defaults8.min;
  }
  set min(value) {
    return this.setAttribute("min", value);
  }
  get space() {
    return this.getAttribute("space") || defaults8.space;
  }
  set space(value) {
    return this.setAttribute("space", value);
  }
  render() {
    const { min, space } = this;
    const { id, css } = GridLayout.getStyles({ min, space });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/frame/frame.js
var ratioRegex = () => /^(\d+):(\d+)$/;
var defaults9 = {
  ratio: "16:9"
};
var FrameLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["ratio"];
  }
  static defineElement() {
    customElements.define("frame-layout", FrameLayout);
  }
  static getStyles(attrs) {
    const { ratio } = { ...defaults9, ...attrs };
    const parsedRatio = ratioRegex().exec(ratio);
    if (!parsedRatio)
      throw new Error(`Invalid ratio '${ratio}'`);
    const id = `FrameLayout-${ratio}`;
    const css = trimCss`
      [data-i="${id}"] {
        aspect-ratio: ${parsedRatio[1]} / ${parsedRatio[2]};
      }
    `;
    return { id, css };
  }
  get ratio() {
    return this.getAttribute("ratio") || defaults9.ratio;
  }
  set ratio(value) {
    return this.setAttribute("ratio", value);
  }
  render() {
    if (this.children.length != 1) {
      console.warn("<frame-layout> should only have one child element");
    }
    const ratio = ratioRegex().exec(this.ratio);
    if (!ratio) {
      console.error("<frame-layout> `ratio` must in the format %o but got %o", "16:9", this.ratio);
      return;
    }
    const { id, css } = FrameLayout.getStyles({ ratio: this.ratio });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/reel/reel.js
var defaults10 = {
  itemWidth: "auto",
  height: "auto",
  space: "var(--s0)",
  noBar: false
};
var ReelLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["itemWidth", "height", "space", "noBar"];
  }
  static defineElement() {
    customElements.define("reel-layout", ReelLayout);
  }
  static getStyles(attrs) {
    const { itemWidth, height, space, noBar } = { ...defaults10, ...attrs };
    const id = `ReelLayout-${itemWidth}${height}${space}${noBar}`;
    const barRule = `
      [data-i="${id}"] {
        scrollbar-width: none;
      }
      [data-i="${id}"]::-webkit-scrollbar {
        display: none;
      }
    `;
    const css = trimCss`
      [data-i="${id}"] {
        height: ${height};
      }
      [data-i="${id}"] > * {
        flex: 0 0 ${itemWidth};
      }
      [data-i="${id}"] > * + * {
        margin-inline-start: ${space};
      }
      [data-i="${id}"].overflowing {
        ${!noBar ? `padding-bottom: ${space}` : ""}
      }
      ${noBar ? barRule : ""}
    `;
    return { id, css };
  }
  get itemWidth() {
    return this.getAttribute("itemWidth") || defaults10.itemWidth;
  }
  set itemWidth(value) {
    return this.setAttribute("itemWidth", value);
  }
  get height() {
    return this.getAttribute("height") || defaults10.height;
  }
  set height(value) {
    return this.setAttribute("height", value);
  }
  get space() {
    return this.getAttribute("space") || defaults10.space;
  }
  set space(value) {
    return this.setAttribute("space", value);
  }
  get noBar() {
    return this.hasAttribute("noBar");
  }
  set noBar(value) {
    if (value)
      this.setAttribute("noBar", "");
    else
      this.removeAttribute("noBar");
  }
  toggleOverflowClass(elem) {
    elem.classList.toggle("overflowing", this.scrollWidth > this.clientWidth);
  }
  render() {
    const { itemWidth, height, space, noBar } = this;
    const { id, css } = ReelLayout.getStyles({
      itemWidth,
      height,
      space,
      noBar
    });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
    if ("ResizeObserver" in window) {
      new ResizeObserver((entries) => {
        this.toggleOverflowClass(entries[0].target);
      }).observe(this);
    }
    if ("MutationObserver" in window) {
      new MutationObserver((entries) => {
        this.toggleOverflowClass(entries[0].target);
      }).observe(this, { childList: true });
    }
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/imposter/imposter.js
var defaults11 = {
  breakout: false,
  fixed: false,
  margin: "0px"
};
var ImposterLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["breakout", "margin", "fixed"];
  }
  static defineElement() {
    customElements.define("imposter-layout", ImposterLayout);
  }
  static getStyles(attrs) {
    const { breakout, fixed, margin } = { ...defaults11, ...attrs };
    const id = `ImposterLayout-${breakout}${fixed}${margin}`;
    const normalisedMargin = margin === "0" ? "0px" : margin;
    const fixedRule = `position: fixed;`;
    const breakoutRule = `
      max-inline-size: calc(100% - (${normalisedMargin} * 2));
      max-block-size: calc(100% - (${normalisedMargin} * 2));
      overflow: auto;
    `;
    const css = trimCss`
      [data-i="${id}"] {
        ${fixed ? fixedRule : ""}
        ${breakout ? "" : breakoutRule}
      }
    `;
    return { id, css };
  }
  get breakout() {
    return this.hasAttribute("breakout");
  }
  set breakout(value) {
    if (value)
      return this.setAttribute("breakout", "");
    else
      return this.removeAttribute("breakout");
  }
  get fixed() {
    return this.hasAttribute("fixed");
  }
  set fixed(value) {
    if (value)
      return this.setAttribute("fixed", "");
    else
      return this.removeAttribute("fixed");
  }
  get margin() {
    return this.getAttribute("margin") || defaults11.margin;
  }
  set margin(value) {
    return this.setAttribute("margin", value);
  }
  render() {
    const { breakout, fixed, margin } = this;
    const { id, css } = ImposterLayout.getStyles({ breakout, fixed, margin });
    this.dataset.i = id;
    addGlobalStyle(id, css);
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/icon/icon.js
var defaults12 = {
  space: null,
  label: null
};
var IconLayout = class extends HTMLElement {
  static get observedAttributes() {
    return ["space", "label"];
  }
  static defineElement() {
    customElements.define("icon-layout", IconLayout);
  }
  static getStyles(attrs) {
    const { space } = { ...defaults12, ...attrs };
    const id = `IconLayout-${space}`;
    const spaceRule = trimCss`
      [data-i="${id}"] {
        display: inline-flex;
        align-items: baseline;
      }
      
      [data-i="${id}"] > svg {
        margin-inline-end: ${space};
      }
    `;
    const css = space ? spaceRule : "";
    return { id, css };
  }
  get space() {
    return this.getAttribute("space") ?? defaults12.space;
  }
  set space(value) {
    this.setAttribute("space", value);
  }
  get label() {
    return this.getAttribute("label") ?? defaults12.label;
  }
  set label(value) {
    this.setAttribute("label", value);
  }
  render() {
    if (this.label) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
    }
    if (this.space) {
      const { id, css } = IconLayout.getStyles({ space: this.space });
      this.dataset.i = id;
      addGlobalStyle(id, css);
    }
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/layouts/layouts.js
function defineLayoutElements() {
  if (!("customElements" in window))
    return;
  for (const layout of Object.values(layoutMap))
    layout.defineElement();
}
var layoutMap = {
  "stack-layout": StackLayout,
  "box-layout": BoxLayout,
  "center-layout": CenterLayout,
  "cluster-layout": ClusterLayout,
  "sidebar-layout": SidebarLayout,
  "switcher-layout": SwitcherLayout,
  "cover-layout": CoverLayout,
  "grid-layout": GridLayout,
  "frame-layout": FrameLayout,
  "reel-layout": ReelLayout,
  "imposter-layout": ImposterLayout,
  "icon-layout": IconLayout
};
var layoutCustomElementNames = Object.keys(layoutMap);
function injectLayoutStyles(inputHtml) {
  const styles = /* @__PURE__ */ new Map();
  inputHtml = inputHtml.replace(/<(\w+-layout)[\s\n\r]+?([\w\W]*?)>/g, (match, layout, attrs) => {
    const props = _parseHtmlAttributes(attrs);
    const result = _processLayoutMatch(layout, props, styles);
    if (!result) {
      console.warn("Skipping unknown layout %o", layout);
      return match;
    }
    if (!styles.has(result.id))
      styles.set(result.id, result.css);
    return result.newTag;
  });
  const stlyesheets = Array.from(styles.entries()).map(([id, css]) => _createLayoutStyle(id, css)).join("");
  return _injectLayoutStyles(inputHtml, stlyesheets);
}
function _injectLayoutStyles(inputHtml, styles) {
  return inputHtml.replace(/<!--\s+@openlab\/alembic\s+inject-css\s+-->/, styles);
}
function _createLayoutStyle(id, css) {
  return `<style id="${id}">${css}</style>`;
}
function _parseHtmlAttributes(attrs) {
  const props = {};
  for (const attr of attrs.matchAll(/(\w+)(?:="?([^"]*)"?)?/g)) {
    props[attr[1]] = attr[2] ?? "";
  }
  return props;
}
function _processLayoutMatch(layout, props) {
  if (!layoutMap[layout])
    return null;
  const styles = layoutMap[layout].getStyles(props);
  const newTag = `<${layout} ${_formatHtmlAttributes(props)} data-i="${styles.id}">`;
  return { ...styles, newTag };
}
function _formatHtmlAttributes(attrs) {
  return Array.from(Object.keys(attrs)).map((key) => `${key}="${attrs[key]}"`).join(" ");
}
export {
  BoxLayout,
  CenterLayout,
  ClusterLayout,
  CoverLayout,
  DetailsUtils,
  FrameLayout,
  GridLayout,
  IconLayout,
  ImposterLayout,
  ReelLayout,
  SidebarLayout,
  StackLayout,
  SwitcherLayout,
  _createLayoutStyle,
  _formatHtmlAttributes,
  _injectLayoutStyles,
  _parseHtmlAttributes,
  _processLayoutMatch,
  addGlobalStyle,
  defineLayoutElements,
  injectLayoutStyles,
  layoutCustomElementNames,
  layoutMap,
  trimCss
};
