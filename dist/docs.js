// src/lib/style.js
function addGlobalStyle(id, style4) {
  if (document.getElementById(id))
    return;
  const elem = document.createElement("style");
  elem.id = id;
  elem.innerHTML = style4;
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
      console.warn(
        "<sidebar-layout> `contentMin` property should be a percentage to prevent overflow. %o supplied",
        this.contentMin
      );
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
      console.error(
        "<frame-layout> `ratio` must in the format %o but got %o",
        "16:9",
        this.ratio
      );
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

// src/docs/component-def.js
var style = trimCss`
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
`;
var template = document.createElement("template");
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
`;
var ComponentDef = class extends HTMLElement {
  static get observedAttributes() {
    return ["title", "no-pad"];
  }
  get title() {
    return this.getAttribute("label") ?? "";
  }
  get noPad() {
    return this.hasAttribute("no-pad");
  }
  set noPad(value) {
    if (value)
      this.setAttribute("no-pad", "");
    else
      this.removeAttribute("no-pad");
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const button = this.shadowRoot.querySelector("[part='toggle']");
    const slot = this.shadowRoot.querySelector("slot");
    const pre = document.createElement("pre");
    pre.setAttribute("part", "code");
    pre.innerText = this.renderCode(this.innerHTML);
    button.addEventListener("click", () => {
      const showCode = Boolean(slot.parentElement);
      const current = showCode ? slot : pre;
      const next = showCode ? pre : slot;
      button.textContent = showCode ? "hide code" : "show code";
      current.replaceWith(next);
    });
  }
  render() {
    const titleElem = this.shadowRoot.querySelector("[part='title']");
    titleElem.textContent = this.title;
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  renderCode(html) {
    const indent = /[ \t]+/.exec(html);
    return html.split(/\r?\n/).map((l) => l.replace(indent, "")).join("\n").replace(/\s*data-i=".+"/g, "").trim();
  }
};

// src/docs/doc-box.js
var DocBox = class extends HTMLElement {
  static get observedAttributes() {
    return ["height", "width", "accent"];
  }
  get height() {
    return this.getAttribute("height") ?? null;
  }
  set height(value) {
    this.setAttribute("height", value);
  }
  get width() {
    return this.getAttribute("width") ?? null;
  }
  set width(value) {
    this.setAttribute("width", value);
  }
  get accent() {
    return this.getAttribute("accent") ?? "rebeccapurple";
  }
  set accent(value) {
    this.setAttribute("accent", value);
  }
  render() {
    this.dataset.i = `DocBox-${this.width}${this.height}${this.accent}`;
    let rules = [
      `display: ${this.width !== null ? "inline-block" : "block"}`,
      `background-color: ${this.accent}`,
      `color: white`,
      `color: color-contrast(white vs black, ${this.accent});`
    ];
    if (this.height !== null)
      rules.push(`height: ${this.height}`);
    if (this.width !== null)
      rules.push(`width: 100%; max-width: ${this.width}`);
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          ${rules.join(";")}
        }
      `
    );
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/docs/doc-resizer.js
var style2 = trimCss`
/* These styles are used in Firefox/chrome */
@media (hover: hover) {
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
}
`;
var template2 = document.createElement("template");
template2.innerHTML = `
<style>${style2}</style>
<div part="content">
  <slot></slot>
</div>
<div part="handle" title="Drag to resize">
</div>
`;
var DocResizer = class extends HTMLElement {
  static get observedAttributes() {
    return [];
  }
  get handleElem() {
    return this.shadowRoot.querySelector("[part='handle']");
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template2.content.cloneNode(true));
    let resized = 0;
    this.handleElem.addEventListener("mousedown", (e) => {
      let current = e.screenX + resized;
      const onMove = (e2) => {
        e2.preventDefault();
        resized = Math.max(0, current - e2.screenX);
        this.style.marginInlineEnd = `${resized}px`;
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener(
        "mouseup",
        () => window.removeEventListener("mousemove", onMove),
        { once: true }
      );
    });
    window.addEventListener("resize", () => {
      if (resized)
        resized = 0;
      if (this.style.marginInlineEnd)
        this.style.marginInlineEnd = null;
    });
  }
};

// src/docs/doc-section.js
var style3 = trimCss`
:host {
  position: relative;
}
:host::part(title) {
  position: sticky;
  top: 0;
  background: var(--doc-background);
  font-size: 1.5em;
  font-family: var(--doc-family);
  cursor: pointer;
  font-weight: bold;
}
:host::slotted(*:not(:first-child)) {
  margin-block-start: var(--s2);
}
::slotted(*:not(:first-child)) {
  margin-block-start: var(--s2);
}
`;
var template3 = document.createElement("template");
template3.innerHTML = `
<style>${style3}</style>
<details-utils part="detailUtils">
  <details>
    <summary part="title"></summary>
    <slot></slot>
  </details>
</details-utils>
`;
var DocSection = class extends HTMLElement {
  get title() {
    return this.getAttribute("label") ?? "";
  }
  get prefix() {
    return this.getAttribute("prefix") ?? "";
  }
  get detailsUtilsElem() {
    return this.shadowRoot.querySelector("[part='detailUtils']");
  }
  get titleElem() {
    return this.shadowRoot.querySelector("[part='title']");
  }
  constructor() {
    super();
    this.classList.add("docSection");
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template3.content.cloneNode(true));
    this.render();
  }
  render() {
    this.titleElem.textContent = this.title;
    this.id = this.getSlug(this.title);
    this.detailsUtilsElem.persist = this.prefix + this.id;
  }
  connectedCallback() {
    this.render();
  }
  toggleOpen(force) {
    this.detailsUtilsElem.toggleOpen(force);
  }
  getSlug(input = "") {
    return input.toLowerCase().trim().replace(/[^\w\s]+/g, "").replace(/[\s-]+/g, "-");
  }
};

// src/docs/doc-text.js
var LOREM_WORDS = JSON.parse(
  '["a","ac","accumsan","adipiscing","aenean","aliqua","aliquam","aliquet","amet","ante","arcu","at","auctor","augue","bibendum","commodo","consectetur","convallis","curabitur","cursus","dapibus","diam","dictum","dictumst","dignissim","do","dolor","dolore","donec","dui","duis","egestas","eget","eiusmod","eleifend","elementum","elit","enim","erat","eros","est","et","etiam","eu","euismod","facilisi","facilisis","fames","faucibus","fermentum","feugiat","fringilla","fusce","gravida","habitasse","hac","hendrerit","iaculis","id","imperdiet","in","incididunt","integer","interdum","ipsum","justo","labore","lacinia","lacus","laoreet","lectus","leo","libero","ligula","lobortis","lorem","luctus","maecenas","magna","malesuada","massa","mattis","mauris","metus","mi","morbi","nam","nec","neque","nibh","nisl","non","nulla","nullam","nunc","odio","orci","ornare","pellentesque","pharetra","phasellus","placerat","platea","porta","porttitor","posuere","praesent","pretium","proin","pulvinar","purus","quam","quis","rhoncus","risus","sagittis","sapien","scelerisque","sed","sem","semper","sit","suspendisse","tellus","tempor","tempus","tincidunt","tortor","tristique","turpis","ullamcorper","ultrices","ultricies","urna","ut","varius","vehicula","vel","velit","vestibulum","vitae","viverra","volutpat","vulputate"]'
);
var DocText = class extends HTMLElement {
  static get observedAttributes() {
    return ["words"];
  }
  get words() {
    return this.getAttribute("words") ?? "5";
  }
  set words(value) {
    return this.setAttribute("words", value);
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.textNode = this.shadowRoot.appendChild(document.createTextNode(""));
  }
  randomNumber(min, max) {
    return min + Math.round(Math.random() * (max - min));
  }
  sentenceCase(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  render() {
    let range = /^(\d+),(\d+)$/.exec(this.words)?.slice(1);
    if (!range) {
      const number = parseInt(this.words, 10);
      if (!Number.isNaN(number))
        range = [number, number];
    }
    if (!range) {
      console.error(
        "<doc-text> invalid `range`, expected a number or a range like %o, got %o",
        "5,10",
        this.range
      );
      return;
    }
    range = range.map((i) => parseInt(i, 10));
    this.textNode.data = Array.from(
      { length: this.randomNumber(range[0], range[1]) },
      () => LOREM_WORDS[this.randomNumber(0, LOREM_WORDS.length)]
    ).join(" ");
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
};

// src/docs/docs.js
if ("customElements" in window) {
  defineLayoutElements();
  DetailsUtils.defineElement();
  customElements.define("component-def", ComponentDef);
  customElements.define("doc-box", DocBox);
  customElements.define("doc-resizer", DocResizer);
  customElements.define("doc-section", DocSection);
  customElements.define("doc-text", DocText);
  window.addEventListener("DOMContentLoaded", () => {
    if (location.hash)
      toggleSection(location.hash);
    for (const elem of document.querySelectorAll(".layoutNav-item")) {
      const url = new URL(elem.href, location.href);
      elem.addEventListener("click", () => toggleSection(url.hash));
    }
  });
}
function toggleSection(selector) {
  const target = document.querySelector(selector);
  if (!target || typeof target.toggleOpen !== "function")
    return;
  target.toggleOpen(true);
}
