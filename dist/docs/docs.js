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
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/lib/style.ts
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

// src/docs/details-utils.ts
var defaultAttributes13 = {
  persist: void 0
};
var DetailsUtils = class extends getHTMLElement() {
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
    return this.getAttribute("persist") ?? defaultAttributes13.persist;
  }
  set persist(value) {
    if (value)
      this.setAttribute("persist", value);
    else
      this.removeAttribute("persist");
  }
  constructor() {
    super();
    this.detailsElem?.addEventListener("toggle", (e) => {
      const target = e.target;
      if (this.persist) {
        const key = `details-utils.${this.persist}`;
        if (target.open)
          localStorage.setItem(key, "true");
        else
          localStorage.removeItem(key);
      }
      const offset = target.getBoundingClientRect().top;
      if (target.open === false && offset < 0) {
        window.scrollTo({ top: window.scrollY + offset });
      }
    });
  }
  render() {
    if (this.detailsElem && this.persist) {
      const key = `details-utils.${this.persist}`;
      this.detailsElem.open = Boolean(localStorage.getItem(key));
    }
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  toggleOpen(force) {
    if (!this.detailsElem) {
      throw new TypeError("DetailsUtils: no <details> child");
    }
    this.detailsElem.open = force ?? !this.detailsElem.open;
  }
};

// src/docs/component-def.ts
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
  get label() {
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
    const button = this.shadowRoot?.querySelector("[part='toggle']");
    const slot = this.shadowRoot?.querySelector("slot");
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
    const titleElem = this.shadowRoot?.querySelector("[part='title']");
    titleElem.textContent = this.label;
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  renderCode(html) {
    const indent = /[ \t]+/.exec(html)?.[0];
    return html.split(/\r?\n/).map((l) => indent ? l.replace(indent, "") : l).join("\n").replace(/\s*data-i=".+"/g, "").trim();
  }
};

// src/docs/doc-box.ts
var defaultAttributes14 = {
  height: void 0,
  width: void 0,
  pattern: "a"
};
var DocBox = class extends HTMLElement {
  static get observedAttributes() {
    return ["height", "width", "pattern"];
  }
  get height() {
    return this.getAttribute("height") ?? defaultAttributes14.height;
  }
  set height(value) {
    if (value)
      this.setAttribute("height", value);
    else
      this.removeAttribute("height");
  }
  get width() {
    return this.getAttribute("width") ?? defaultAttributes14.width;
  }
  set width(value) {
    if (value)
      this.setAttribute("width", value);
    else
      this.removeAttribute("width");
  }
  get pattern() {
    return this.getAttribute("pattern") ?? defaultAttributes14.pattern;
  }
  set pattern(value) {
    this.setAttribute("pattern", value);
  }
  render() {
    this.dataset.i = `DocBox-${this.width}${this.height}${this.pattern}`;
    const rules = [
      `display: ${this.width !== null ? "inline-block" : "block"}`,
      `color: var(--doc-background)`,
      `color: color-contrast(white vs black, var(--doc-foreground))`
    ];
    if (this.height !== null)
      rules.push(`height: ${this.height}`);
    if (this.width !== null)
      rules.push(`width: 100%; max-width: ${this.width}`);
    switch (this.pattern) {
      case "b":
        rules.push(trimCss`
          background-image: repeating-linear-gradient(
            -45deg,
            var(--doc-foreground),
            var(--doc-foreground) 5px,
            var(--doc-background) 5px,
            var(--doc-background) 10px
          );
        `);
        break;
      case "c":
        const size = "0.25em";
        rules.push(
          `background-color: var(--doc-foreground)`,
          `background-image: radial-gradient(var(--doc-background) ${size}, transparent ${size}),radial-gradient(var(--doc-background) ${size}, transparent ${size})`,
          `background-size: calc(6 * ${size}) calc(6 * ${size})`,
          `background-position: calc(3 * ${size}) calc(3 * ${size}), 0 0`
        );
        break;
      default:
        rules.push(`background-color: var(--doc-foreground)`);
        break;
    }
    addGlobalStyle(
      this.dataset.i,
      trimCss`
        [data-i='${this.dataset.i}'] {
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

// src/docs/doc-resizer.ts
var style2 = trimCss`
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
var _resized, _handleElem;
var DocResizer = class extends HTMLElement {
  constructor() {
    super();
    __privateAdd(this, _resized, 0);
    __privateAdd(this, _handleElem, void 0);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template2.content.cloneNode(true));
    __privateSet(this, _handleElem, this.shadowRoot.querySelector("[part='handle']"));
    __privateGet(this, _handleElem).onpointerdown = (event) => {
      let current = event.screenX + __privateGet(this, _resized);
      __privateGet(this, _handleElem).onpointermove = (event2) => {
        console.debug("onpointermove");
        __privateSet(this, _resized, Math.max(0, current - event2.screenX));
        this.style.marginInlineEnd = `${__privateGet(this, _resized)}px`;
      };
      __privateGet(this, _handleElem).setPointerCapture(event.pointerId);
    };
    __privateGet(this, _handleElem).onpointerup = (event) => {
      __privateGet(this, _handleElem).onpointermove = null;
      __privateGet(this, _handleElem).releasePointerCapture(event.pointerId);
    };
    window.addEventListener("resize", () => {
      if (__privateGet(this, _resized))
        __privateSet(this, _resized, 0);
      if (this.style.marginInlineEnd)
        this.style.marginInlineEnd = "";
    });
  }
  static get observedAttributes() {
    return [];
  }
};
_resized = new WeakMap();
_handleElem = new WeakMap();

// src/docs/doc-section.ts
var style3 = trimCss`
  :host {
    position: relative;
  }
  :host::part(label) {
    position: sticky;
    top: 0;
    background: var(--doc-background);
    font-size: 1.5em;
    font-family: var(--doc-family);
    cursor: pointer;
    font-weight: bold;
    z-index: 1;
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
    <summary part="label"></summary>
    <slot></slot>
  </details>
</details-utils>
`;
var defaultAttributes15 = {
  label: "",
  prefix: ""
};
var DocSection = class extends HTMLElement {
  get label() {
    return this.getAttribute("label") ?? defaultAttributes15.label;
  }
  get prefix() {
    return this.getAttribute("prefix") ?? defaultAttributes15.prefix;
  }
  get detailsUtilsElem() {
    return this.shadowRoot.querySelector(
      "[part='detailUtils']"
    );
  }
  get labelElem() {
    return this.shadowRoot.querySelector("[part='label']");
  }
  constructor() {
    super();
    this.classList.add("docSection");
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template3.content.cloneNode(true));
    this.render();
  }
  render() {
    this.labelElem.textContent = this.label;
    this.id = this.getSlug(this.label);
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

// src/docs/doc-text.ts
var LOREM_WORDS = JSON.parse(
  '["a","ac","accumsan","adipiscing","aenean","aliqua","aliquam","aliquet","amet","ante","arcu","at","auctor","augue","bibendum","commodo","consectetur","convallis","curabitur","cursus","dapibus","diam","dictum","dictumst","dignissim","do","dolor","dolore","donec","dui","duis","egestas","eget","eiusmod","eleifend","elementum","elit","enim","erat","eros","est","et","etiam","eu","euismod","facilisi","facilisis","fames","faucibus","fermentum","feugiat","fringilla","fusce","gravida","habitasse","hac","hendrerit","iaculis","id","imperdiet","in","incididunt","integer","interdum","ipsum","justo","labore","lacinia","lacus","laoreet","lectus","leo","libero","ligula","lobortis","lorem","luctus","maecenas","magna","malesuada","massa","mattis","mauris","metus","mi","morbi","nam","nec","neque","nibh","nisl","non","nulla","nullam","nunc","odio","orci","ornare","pellentesque","pharetra","phasellus","placerat","platea","porta","porttitor","posuere","praesent","pretium","proin","pulvinar","purus","quam","quis","rhoncus","risus","sagittis","sapien","scelerisque","sed","sem","semper","sit","suspendisse","tellus","tempor","tempus","tincidunt","tortor","tristique","turpis","ullamcorper","ultrices","ultricies","urna","ut","varius","vehicula","vel","velit","vestibulum","vitae","viverra","volutpat","vulputate"]'
);
var defaultAttributes16 = {
  words: "5"
};
var DocText = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.textNode = this.shadowRoot.appendChild(document.createTextNode(""));
  }
  static get observedAttributes() {
    return ["words"];
  }
  get words() {
    return this.getAttribute("words") ?? defaultAttributes16.words;
  }
  set words(value) {
    if (value)
      this.setAttribute("words", value);
    else
      this.removeAttribute("words");
  }
  randomNumber(min, max) {
    return min + Math.round(Math.random() * (max - min));
  }
  sentenceCase(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  render() {
    let range = /^(\d+),(\d+)$/.exec(this.words)?.slice(1).map((v) => parseInt(v, 10));
    if (!range) {
      const number = parseInt(this.words, 10);
      if (!Number.isNaN(number))
        range = [number, number];
    }
    if (!range) {
      console.error(
        "<doc-text> invalid `range`, expected a number or a range like %o, got %o",
        "5,10",
        range
      );
      return;
    }
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

// src/docs/docs.ts
var elements = new Map([
  ...layoutCustomElements,
  ["component-def", ComponentDef],
  ["doc-box", DocBox],
  ["doc-resizer", DocResizer],
  ["doc-section", DocSection],
  ["doc-text", DocText],
  ["details-utils", DetailsUtils]
]);
defineCustomElements(elements);
window.addEventListener("DOMContentLoaded", () => {
  if (location.hash)
    toggleSection(location.hash);
  for (const elem of document.querySelectorAll(
    "a.layoutReel-item"
  )) {
    const url = new URL(elem.href, location.href);
    elem.addEventListener("click", () => toggleSection(url.hash));
  }
  for (const elem of document.querySelectorAll(
    'reel-layout.layoutReel[data-autoscroll="true"]'
  )) {
    let tick2 = function() {
      let diff = Date.now() - lastTick;
      elem.scrollLeft = (elem.scrollLeft + diff * 0.1) % (elem.scrollWidth * 0.5);
      window.requestAnimationFrame(tick2);
      lastTick = Date.now();
    };
    var tick = tick2;
    let lastTick = Date.now();
    window.requestAnimationFrame(tick2);
  }
});
function toggleSection(selector) {
  const target = document.querySelector(selector);
  console.log(target);
  if (!target || !(target instanceof DocSection))
    return;
  target.toggleOpen(true);
}
