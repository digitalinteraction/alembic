var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};

// src/lib/style.ts
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
var _styles;
var AlembicStyleSheet = class {
  constructor() {
    __privateAdd(this, _styles, /* @__PURE__ */ new Map());
  }
  reset() {
    __privateGet(this, _styles).clear();
  }
  getStyles() {
    return new Map(__privateGet(this, _styles));
  }
  addStyle({ id, css }) {
    if (__privateGet(this, _styles).has(id))
      return id;
    __privateGet(this, _styles).set(id, css);
    return id;
  }
  *[Symbol.iterator]() {
    for (const [id, css] of __privateGet(this, _styles)) {
      yield [id, css];
    }
  }
};
_styles = new WeakMap();

// src/lib/html.ts
function getHTMLElement() {
  return globalThis.HTMLElement ?? class {
    constructor() {
      throw new TypeError(
        `Cannot instantiate ${this.constructor.name} outside of the DOM`
      );
    }
  };
}
function defineCustomElements(map) {
  if (!("customElements" in window)) {
    console.warn("customElements is not supported");
    return;
  }
  for (const [name, element] of map)
    customElements.define(name, element);
}

// src/layouts/stack/stack.ts
var defaultAttributes = {
  space: "var(--s1)"
};
var StackLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["space"];
  }
  static defineElement() {
    customElements.define("stack-layout", StackLayout);
  }
  static getStyles(attrs) {
    const { space } = { ...defaultAttributes, ...attrs };
    const id = `StackLayout-${space}`;
    const css = trimCss`
      [data-i="${id}"] > * + * {
        margin-block-start: ${space};
      }
    `;
    return { id, css };
  }
  get space() {
    return this.getAttribute("space") ?? defaultAttributes.space;
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

// src/layouts/box/box.ts
var defaultAttributes2 = {
  padding: "var(--s1)",
  borderWidth: "var(--border-thin)",
  invert: false
};
var BoxLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["borderWidth", "padding", "invert"];
  }
  static defineElement() {
    customElements.define("box-layout", BoxLayout);
  }
  static getStyles(attrs) {
    const { padding, borderWidth, invert } = { ...defaultAttributes2, ...attrs };
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
    return this.getAttribute("padding") ?? defaultAttributes2.padding;
  }
  set padding(value) {
    this.setAttribute("padding", value);
  }
  get borderWidth() {
    return this.getAttribute("borderWidth") ?? defaultAttributes2.borderWidth;
  }
  set borderWidth(value) {
    this.setAttribute("borderWidth", value);
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

// src/layouts/center/center.ts
var defaultAttributes3 = {
  max: "var(--measure)",
  gutters: void 0,
  intrinsic: false
};
var CenterLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["max", "gutters", "intrinsic"];
  }
  static defineElement() {
    customElements.define("center-layout", CenterLayout);
  }
  static getStyles(attrs) {
    const { max, gutters, intrinsic } = { ...defaultAttributes3, ...attrs };
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
    return this.getAttribute("max") ?? defaultAttributes3.max;
  }
  set max(value) {
    this.setAttribute("max", value);
  }
  get gutters() {
    return this.getAttribute("gutters") ?? defaultAttributes3.gutters;
  }
  set gutters(value) {
    if (value)
      this.setAttribute("gutters", value);
    else
      this.removeAttribute("gutters");
  }
  get intrinsic() {
    return this.hasAttribute("intrinsic") ?? defaultAttributes3.intrinsic;
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

// src/layouts/cluster/cluster.ts
var defaultAttributes4 = {
  justify: "flex-start",
  align: "flex-start",
  space: "var(--s1)"
};
var ClusterLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["justify", "align", "space"];
  }
  static defineElement() {
    customElements.define("cluster-layout", ClusterLayout);
  }
  static getStyles(attrs) {
    const { justify, align, space } = { ...defaultAttributes4, ...attrs };
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
    return this.getAttribute("justify") ?? defaultAttributes4.justify;
  }
  set justify(value) {
    this.setAttribute("justify", value);
  }
  get align() {
    return this.getAttribute("align") ?? defaultAttributes4.align;
  }
  set align(value) {
    this.setAttribute("align", value);
  }
  get space() {
    return this.getAttribute("space") ?? defaultAttributes4.space;
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

// src/layouts/sidebar/sidebar.ts
var defaultAttributes5 = {
  side: "left",
  sideWidth: void 0,
  contentMin: "50%",
  space: "var(--s1)",
  noStretch: false
};
var SidebarLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["side", "sideWidth", "contentMin", "space", "noStretch"];
  }
  static defineElement() {
    customElements.define("sidebar-layout", SidebarLayout);
  }
  static getStyles(attrs) {
    const { side, sideWidth, contentMin, space, noStretch } = {
      ...defaultAttributes5,
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
    return this.getAttribute("side") || defaultAttributes5.side;
  }
  set side(value) {
    this.setAttribute("side", value);
  }
  get sideWidth() {
    return this.getAttribute("sideWidth") || defaultAttributes5.sideWidth;
  }
  set sideWidth(value) {
    if (value)
      this.setAttribute("sideWidth", value);
    else
      this.removeAttribute("sideWidth");
  }
  get contentMin() {
    return this.getAttribute("contentMin") || defaultAttributes5.contentMin;
  }
  set contentMin(value) {
    this.setAttribute("contentMin", value);
  }
  get space() {
    return this.getAttribute("space") || defaultAttributes5.space;
  }
  set space(value) {
    this.setAttribute("space", value);
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

// src/layouts/switcher/switcher.ts
var defaultAttributes6 = {
  threshold: "var(--measure)",
  space: "var(--s1)",
  limit: "4"
};
var SwitcherLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["threshold", "space", "limit"];
  }
  static defineElement() {
    customElements.define("switcher-layout", SwitcherLayout);
  }
  static getStyles(attrs) {
    const { threshold, space, limit } = { ...defaultAttributes6, ...attrs };
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
    return this.getAttribute("threshold") || defaultAttributes6.threshold;
  }
  set threshold(value) {
    this.setAttribute("threshold", value);
  }
  get space() {
    return this.getAttribute("space") || defaultAttributes6.space;
  }
  set space(value) {
    this.setAttribute("space", value);
  }
  get limit() {
    return this.getAttribute("limit") || defaultAttributes6.limit;
  }
  set limit(value) {
    this.setAttribute("limit", value);
  }
  render() {
    if (Number.isNaN(parseInt(this.limit))) {
      console.warn(
        "<switcher-layout> `limit` is not a number, %o",
        this.limit,
        this
      );
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

// src/layouts/cover/cover.ts
var defaultAttributes7 = {
  centered: "h1",
  space: "var(--s1)",
  minHeight: "100vh",
  noPad: false
};
var CoverLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["centered", "space", "minHeight", "noPad"];
  }
  static defineElement() {
    customElements.define("cover-layout", CoverLayout);
  }
  static getStyles(attrs) {
    const { centered, space, minHeight, noPad } = {
      ...defaultAttributes7,
      ...attrs
    };
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
    return this.getAttribute("centered") ?? defaultAttributes7.centered;
  }
  set centered(value) {
    this.setAttribute("centered", value);
  }
  get space() {
    return this.getAttribute("space") ?? defaultAttributes7.space;
  }
  set space(value) {
    this.setAttribute("space", value);
  }
  get minHeight() {
    return this.getAttribute("minHeight") ?? defaultAttributes7.minHeight;
  }
  set minHeight(value) {
    this.setAttribute("minHeight", value);
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

// src/layouts/grid/grid.ts
var defaultAttributes8 = {
  min: "250px",
  space: "var(--s1)"
};
var GridLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["min", "space"];
  }
  static defineElement() {
    customElements.define("grid-layout", GridLayout);
  }
  static getStyles(attrs) {
    const { min, space } = { ...defaultAttributes8, ...attrs };
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
    return this.getAttribute("min") ?? defaultAttributes8.min;
  }
  set min(value) {
    this.setAttribute("min", value);
  }
  get space() {
    return this.getAttribute("space") ?? defaultAttributes8.space;
  }
  set space(value) {
    this.setAttribute("space", value);
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

// src/layouts/frame/frame.ts
var ratioRegex = () => /^(\d+):(\d+)$/;
var defaultAttributes9 = {
  ratio: "16:9"
};
var FrameLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["ratio"];
  }
  static defineElement() {
    customElements.define("frame-layout", FrameLayout);
  }
  static getStyles(attrs) {
    const { ratio } = { ...defaultAttributes9, ...attrs };
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
    return this.getAttribute("ratio") ?? defaultAttributes9.ratio;
  }
  set ratio(value) {
    this.setAttribute("ratio", value);
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
        this.ratio,
        this
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

// src/layouts/reel/reel.ts
var defaultAttributes10 = {
  itemWidth: "auto",
  height: "auto",
  space: "var(--s0)",
  noBar: false
};
var ReelLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["itemWidth", "height", "space", "noBar"];
  }
  static defineElement() {
    customElements.define("reel-layout", ReelLayout);
  }
  static getStyles(attrs) {
    const { itemWidth, height, space, noBar } = {
      ...defaultAttributes10,
      ...attrs
    };
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
    return this.getAttribute("itemWidth") || defaultAttributes10.itemWidth;
  }
  set itemWidth(value) {
    this.setAttribute("itemWidth", value);
  }
  get height() {
    return this.getAttribute("height") || defaultAttributes10.height;
  }
  set height(value) {
    this.setAttribute("height", value);
  }
  get space() {
    return this.getAttribute("space") || defaultAttributes10.space;
  }
  set space(value) {
    this.setAttribute("space", value);
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

// src/layouts/imposter/imposter.ts
var defaultAttributes11 = {
  breakout: false,
  fixed: false,
  margin: "0px"
};
var ImposterLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["breakout", "margin", "fixed"];
  }
  static defineElement() {
    customElements.define("imposter-layout", ImposterLayout);
  }
  static getStyles(attrs) {
    const { breakout, fixed, margin } = { ...defaultAttributes11, ...attrs };
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
    return this.hasAttribute("breakout") ?? defaultAttributes11.breakout;
  }
  set breakout(value) {
    if (value)
      this.setAttribute("breakout", "");
    else
      this.removeAttribute("breakout");
  }
  get fixed() {
    return this.hasAttribute("fixed") ?? defaultAttributes11.fixed;
  }
  set fixed(value) {
    if (value)
      this.setAttribute("fixed", "");
    else
      this.removeAttribute("fixed");
  }
  get margin() {
    return this.getAttribute("margin") ?? defaultAttributes11.margin;
  }
  set margin(value) {
    this.setAttribute("margin", value);
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

// src/layouts/icon/icon.ts
var defaultAttributes12 = {
  space: void 0,
  label: void 0
};
var IconLayout = class extends getHTMLElement() {
  static get observedAttributes() {
    return ["space", "label"];
  }
  static defineElement() {
    customElements.define("icon-layout", IconLayout);
  }
  static getStyles(attrs) {
    const { space } = { ...defaultAttributes12, ...attrs };
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
    return this.getAttribute("space") ?? defaultAttributes12.space;
  }
  set space(value) {
    if (value)
      this.setAttribute("space", value);
    else
      this.removeAttribute("space");
  }
  get label() {
    return this.getAttribute("label") ?? defaultAttributes12.label;
  }
  set label(value) {
    if (value)
      this.setAttribute("label", value);
    else
      this.removeAttribute("label");
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

// src/layouts/layouts.ts
var layoutCustomElements = /* @__PURE__ */ new Map([
  ["box-layout", BoxLayout],
  ["stack-layout", StackLayout],
  ["center-layout", CenterLayout],
  ["cluster-layout", ClusterLayout],
  ["sidebar-layout", SidebarLayout],
  ["switcher-layout", SwitcherLayout],
  ["cover-layout", CoverLayout],
  ["grid-layout", GridLayout],
  ["frame-layout", FrameLayout],
  ["reel-layout", ReelLayout],
  ["imposter-layout", ImposterLayout],
  ["icon-layout", IconLayout]
]);

// src/module.ts
var allCustomElements = new Map([...layoutCustomElements]);

// src/everything.ts
defineCustomElements(allCustomElements);
export {
  AlembicStyleSheet,
  BoxLayout,
  CenterLayout,
  ClusterLayout,
  CoverLayout,
  FrameLayout,
  GridLayout,
  IconLayout,
  ImposterLayout,
  ReelLayout,
  SidebarLayout,
  StackLayout,
  SwitcherLayout,
  addGlobalStyle,
  allCustomElements,
  defineCustomElements,
  getHTMLElement,
  layoutCustomElements,
  trimCss
};
