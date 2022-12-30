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

// alembic_embed:./everything.css
var everything_default = "body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5}*,*:before,*:after{box-sizing:border-box}body,h1,h2,h3,h4,p,figure,blockquote,dl,dd{margin:0}img,picture{max-width:100%;display:block}input,button,textarea,select{font:inherit}ul[role=list],ol[role=list]{list-style:none;padding:0;margin:0}stack-layout{display:flex;flex-direction:column;justify-content:flex-start}stack-layout>*+*{margin-block-start:var(--s1)}box-layout{display:block;padding:var(--s1);border-width:var(--border-thin);border-style:solid;outline:var(--border-thin) solid transparent;outline-offset:calc(var(--border-thin) * -1)}box-layout *{color:inherit}center-layout{display:block;box-sizing:content-box;margin-inline:auto;max-inline-size:var(--measure)}cluster-layout{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:flex-start}sidebar-layout{display:flex;flex-wrap:wrap}sidebar-layout>*{flex-grow:1}switcher-layout{display:flex;flex-wrap:wrap}switcher-layout>*{flex-basis:calc((var(--measure) - 100%) * 999);flex-grow:1}cover-layout{display:flex;flex-direction:column;min-block-size:100vh;padding:var(--s1)}grid-layout{display:grid;grid-gap:var(--s1);align-content:start;grid-template-columns:100%}frame-layout{aspect-ratio:16 / 9;overflow:hidden;display:flex;justify-content:center;align-items:center}frame-layout>img,frame-layout>video{inline-size:100%;block-size:100%;object-fit:cover}reel-layout{display:flex;overflow-x:auto;overflow-y:hidden;scrollbar-color:var(--color-foreground) var(--color-background)}reel-layout>*{flex:0 0 var(--item-width)}reel-layout>img{block-size:100%;flex-basis:auto;inline-size:auto}reel-layout::-webkit-scrollbar{block-size:.8rem}reel-layout::-webkit-scrollbar-track{background-color:var(--color-background);border-radius:.4rem}reel-layout::-webkit-scrollbar-thumb{background-color:var(--color-foreground);border-radius:.4rem}imposter-layout{position:absolute;inset-block-start:50%;inset-inline-start:50%;transform:translate(-50%,-50%)}icon-layout svg{height:.75em;height:1cap;width:.75em;width:1cap}:root{--ratio: 1.5;--s-5: calc(var(--s-4) / var(--ratio));--s-4: calc(var(--s-3) / var(--ratio));--s-3: calc(var(--s-2) / var(--ratio));--s-2: calc(var(--s-1) / var(--ratio));--s-1: calc(var(--s0) / var(--ratio));--s0: 1rem;--s1: calc(var(--s0) * var(--ratio));--s2: calc(var(--s1) * var(--ratio));--s3: calc(var(--s2) * var(--ratio));--s4: calc(var(--s3) * var(--ratio));--s5: calc(var(--s4) * var(--ratio))}fieldset>:not(legend)+*,form>*+*{margin-top:var(--s0)}.field,.checkboxGroup,.checkbox{max-width:var(--gestalt)}:is(input,select,textarea,button):focus{outline:var(--s-4) solid var(--focus);outline-offset:var(--border-thin)}.field label{margin-bottom:var(--s-4);display:block;line-height:1.25}.field-label{font-weight:600;display:block}.field-hint{font-weight:400;display:block;margin-bottom:var(--s-4);color:var(--color-darkish);font-size:.9em}.field input,.field select,.field textarea{background-color:transparent;border:var(--border-thin) solid var(--fillable);margin:0;padding:var(--s-2);width:100%}.field input[type=checkbox]{width:initial}.field textarea{resize:vertical;min-height:5em}.field select{line-height:1.5}fieldset{border:var(--border-thin) solid var(--fillable);padding:var(--s-1)}fieldset legend{font-size:var(--s1);font-weight:600}.fieldset-hint{font-weight:400;display:block;font-size:.9em;margin-block-start:calc(-1 * var(--s-1))}.checkboxGroup-label{font-weight:600;display:block}.checkbox{padding:.25em .5em;border:var(--border-thin) solid var(--fillable);display:flex;align-items:center;justify-content:stretch;gap:var(--s-2)}.checkbox:not(:hover){border-color:transparent}.checkbox input{font-size:1rem;margin:0;flex-grow:0}.formMessage{border:var(--border-thick) solid;padding:var(--s-1)}.formMessage[data-accent=info]{border-color:var(--color-info)}.formMessage[data-accent=error]{border-color:var(--color-error)}.formMessage[data-accent=success]{border-color:var(--color-success)}.rangeHints{display:flex;justify-content:space-between;font-size:.9em;font-style:italic;margin-top:var(--s-5)}\n";

// alembic_embed:./everything.js
var everything_default2 = 'var J=(l,t,e)=>{if(!t.has(l))throw TypeError("Cannot "+e)};var S=(l,t,e)=>(J(l,t,"read from private field"),e?e.call(l):t.get(l)),I=(l,t,e)=>{if(t.has(l))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(l):t.set(l,e)};function a(l,t){if(document.getElementById(l))return;let e=document.createElement("style");e.id=l,e.innerHTML=t,document.head.appendChild(e)}function o(l,...t){let e=[];for(let s=0;s<l.length;s++)e.push(l[s]),s<t.length&&e.push(t[s]);return e.join("").replace(/\\s\\s+/g," ").trim()}var u,G=class{constructor(){I(this,u,new Map)}reset(){S(this,u).clear()}getStyles(){return new Map(S(this,u))}addStyle({id:t,css:e}){return S(this,u).has(t)||S(this,u).set(t,e),t}*[Symbol.iterator](){for(let[t,e]of S(this,u))yield[t,e]}};u=new WeakMap;function c(){return globalThis.HTMLElement??class{constructor(){throw new TypeError(`Cannot instantiate ${this.constructor.name} outside of the DOM`)}}}function j(l){if(!("customElements"in window)){console.warn("customElements is not supported");return}for(let[t,e]of l)customElements.define(t,e)}var z={space:"var(--s1)"},m=class extends c(){static get observedAttributes(){return["space"]}static defineElement(){customElements.define("stack-layout",m)}static getStyles(t){let{space:e}={...z,...t},s=`StackLayout-${e}`,i=o`\n      [data-i="${s}"] > * + * {\n        margin-block-start: ${e};\n      }\n    `;return{id:s,css:i}}get space(){return this.getAttribute("space")??z.space}set space(t){this.setAttribute("space",t)}render(){let{space:t}=this,{id:e,css:s}=m.getStyles({space:t});this.dataset.i=e,a(e,s)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var P={padding:"var(--s1)",borderWidth:"var(--border-thin)",invert:!1},g=class extends c(){static get observedAttributes(){return["borderWidth","padding","invert"]}static defineElement(){customElements.define("box-layout",g)}static getStyles(t){let{padding:e,borderWidth:s,invert:i}={...P,...t},r=`BoxLayout-${e}${s}${i}`,d=o`\n      [data-i="${r}"] {\n        padding: ${e};\n        border-width: ${s};\n        ${i?"color: var(--color-background); background-color: var(--color-foreground);":"color: var(--color-foreground); background-color: var(--color-background);"}\n      }\n    `;return{id:r,css:d}}get padding(){return this.getAttribute("padding")??P.padding}set padding(t){this.setAttribute("padding",t)}get borderWidth(){return this.getAttribute("borderWidth")??P.borderWidth}set borderWidth(t){this.setAttribute("borderWidth",t)}get invert(){return this.hasAttribute("invert")}set invert(t){t?this.setAttribute("invert",""):this.removeAttribute("invert")}render(){let{padding:t,borderWidth:e,invert:s}=this,{id:i,css:r}=g.getStyles({padding:t,borderWidth:e,invert:s});this.dataset.i=i,a(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var M={max:"var(--measure)",gutters:void 0,intrinsic:!1},b=class extends c(){static get observedAttributes(){return["max","gutters","intrinsic"]}static defineElement(){customElements.define("center-layout",b)}static getStyles(t){let{max:e,gutters:s,intrinsic:i}={...M,...t},r=`CenterLayout-${e}${s}${i}`,n=`padding-inline: ${s};`,h=o`\n      [data-i="${r}"] {\n        max-width: ${e};\n        ${s?n:""}\n        ${i?`\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    `:""}\n      }\n    `;return{id:r,css:h}}get max(){return this.getAttribute("max")??M.max}set max(t){this.setAttribute("max",t)}get gutters(){return this.getAttribute("gutters")??M.gutters}set gutters(t){t?this.setAttribute("gutters",t):this.removeAttribute("gutters")}get intrinsic(){return this.hasAttribute("intrinsic")??M.intrinsic}set intrinsic(t){t?this.setAttribute("intrinsic",""):this.removeAttribute("intrinsic")}render(){let{max:t,gutters:e,intrinsic:s}=this,{id:i,css:r}=b.getStyles({max:t,gutters:e,intrinsic:s});this.dataset.i=i,a(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var w={justify:"flex-start",align:"flex-start",space:"var(--s1)"},p=class extends c(){static get observedAttributes(){return["justify","align","space"]}static defineElement(){customElements.define("cluster-layout",p)}static getStyles(t){let{justify:e,align:s,space:i}={...w,...t},r=`ClusterLayout-${e}${s}${i}`,n=o`\n      [data-i="${r}"] {\n        justify-content: ${e};\n        align-items: ${s};\n        gap: ${i};\n      }\n    `;return{id:r,css:n}}get justify(){return this.getAttribute("justify")??w.justify}set justify(t){this.setAttribute("justify",t)}get align(){return this.getAttribute("align")??w.align}set align(t){this.setAttribute("align",t)}get space(){return this.getAttribute("space")??w.space}set space(t){this.setAttribute("space",t)}render(){let{justify:t,align:e,space:s}=this,{id:i,css:r}=p.getStyles({justify:t,align:e,space:s});this.dataset.i=i,a(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var k={side:"left",sideWidth:void 0,contentMin:"50%",space:"var(--s1)",noStretch:!1},f=class extends c(){static get observedAttributes(){return["side","sideWidth","contentMin","space","noStretch"]}static defineElement(){customElements.define("sidebar-layout",f)}static getStyles(t){let{side:e,sideWidth:s,contentMin:i,space:r,noStretch:n}={...k,...t},d=`SidebarLayout-${e}${s}${i}${r}${n}`,h=e!=="left"?":first-child":":last-child",R=o`\n      [data-i="${d}"] {\n        gap: ${r};\n        ${n?"align-items: flex-start;":""}\n      }\n      [data-i="${d}"] > * {\n        ${s?`flex-basis: ${s};`:""}\n      }\n      [data-i="${d}"] > ${h} {\n        flex-basis: 0;\n        flex-grow: 999;\n        min-inline-size: ${i};\n      }\n    `;return{id:d,css:R}}get side(){return this.getAttribute("side")||k.side}set side(t){this.setAttribute("side",t)}get sideWidth(){return this.getAttribute("sideWidth")||k.sideWidth}set sideWidth(t){t?this.setAttribute("sideWidth",t):this.removeAttribute("sideWidth")}get contentMin(){return this.getAttribute("contentMin")||k.contentMin}set contentMin(t){this.setAttribute("contentMin",t)}get space(){return this.getAttribute("space")||k.space}set space(t){this.setAttribute("space",t)}get noStretch(){return this.hasAttribute("noStretch")}set noStretch(t){t?this.setAttribute("noStretch",""):this.removeAttribute("noStretch")}render(){this.contentMin.includes("%")||console.warn("<sidebar-layout> `contentMin` property should be a percentage to prevent overflow. %o supplied",this.contentMin);let{side:t,sideWidth:e,contentMin:s,space:i,noStretch:r}=this,{id:n,css:d}=f.getStyles({side:t,sideWidth:e,contentMin:s,space:i,noStretch:r});this.dataset.i=n,a(n,d)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var L={threshold:"var(--measure)",space:"var(--s1)",limit:"4"},A=class extends c(){static get observedAttributes(){return["threshold","space","limit"]}static defineElement(){customElements.define("switcher-layout",A)}static getStyles(t){let{threshold:e,space:s,limit:i}={...L,...t},r=`SwitcherLayout-${e}${s}${i}`,n=parseInt(i)+1,d=o`\n      [data-i="${r}"] {\n        gap: ${s};\n      }\n      [data-i="${r}"] > * {\n        flex-basis: calc((${e} - 100%) * 999);\n      }\n      [data-i="${r}"] > :nth-last-child(n+${n}),\n      [data-i="${r}"] > :nth-last-child(n+${n}) ~ * {\n        flex-basis: 100%;\n      }\n    `;return{id:r,css:d}}get threshold(){return this.getAttribute("threshold")||L.threshold}set threshold(t){this.setAttribute("threshold",t)}get space(){return this.getAttribute("space")||L.space}set space(t){this.setAttribute("space",t)}get limit(){return this.getAttribute("limit")||L.limit}set limit(t){this.setAttribute("limit",t)}render(){Number.isNaN(parseInt(this.limit))&&console.warn("<switcher-layout> `limit` is not a number, %o",this.limit,this);let{threshold:t,space:e,limit:s}=this,{id:i,css:r}=A.getStyles({threshold:t,space:e,limit:s});this.dataset.i=i,a(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var H={centered:"h1",space:"var(--s1)",minHeight:"100vh",noPad:!1},y=class extends c(){static get observedAttributes(){return["centered","space","minHeight","noPad"]}static defineElement(){customElements.define("cover-layout",y)}static getStyles(t){let{centered:e,space:s,minHeight:i,noPad:r}={...H,...t},n=`CoverLayout-${e}${s}${i}${r}`,d=o`\n      [data-i="${n}"] {\n        min-height: ${i};\n        padding: ${r?"0":s};\n      }\n      [data-i="${n}"] > * {\n        margin-block: ${s};\n      }\n      [data-i="${n}"] > :first-child:not(${e}) {\n        margin-block-start: 0;\n      }\n      [data-i="${n}"] > :last-child:not(${e}) {\n        margin-block-end: 0;\n      }\n      [data-i="${n}"] > ${e} {\n        margin-block: auto;\n      }\n    `;return{id:n,css:d}}get centered(){return this.getAttribute("centered")??H.centered}set centered(t){this.setAttribute("centered",t)}get space(){return this.getAttribute("space")??H.space}set space(t){this.setAttribute("space",t)}get minHeight(){return this.getAttribute("minHeight")??H.minHeight}set minHeight(t){this.setAttribute("minHeight",t)}get noPad(){return this.hasAttribute("noPad")}set noPad(t){t?this.setAttribute("noPad",""):this.removeAttribute("noPad")}render(){let{centered:t,space:e,minHeight:s,noPad:i}=this,{id:r,css:n}=y.getStyles({centered:t,space:e,minHeight:s,noPad:i});this.dataset.i=r,a(r,n)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var B={min:"250px",space:"var(--s1)"},$=class extends c(){static get observedAttributes(){return["min","space"]}static defineElement(){customElements.define("grid-layout",$)}static getStyles(t){let{min:e,space:s}={...B,...t},i=`GridLayout-${e}${s}`,r=o`\n      [data-i="${i}"] {\n        grid-gap: ${s};\n      }\n      \n      @supports (width: min(${e}, 100%)) {\n        [data-i="${i}"] {\n          grid-template-columns: repeat(auto-fill, minmax(min(${e}, 100%), 1fr));\n        }\n      }\n    `;return{id:i,css:r}}get min(){return this.getAttribute("min")??B.min}set min(t){this.setAttribute("min",t)}get space(){return this.getAttribute("space")??B.space}set space(t){this.setAttribute("space",t)}render(){let{min:t,space:e}=this,{id:s,css:i}=$.getStyles({min:t,space:e});this.dataset.i=s,a(s,i)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var N=()=>/^(\\d+):(\\d+)$/,D={ratio:"16:9"},x=class extends c(){static get observedAttributes(){return["ratio"]}static defineElement(){customElements.define("frame-layout",x)}static getStyles(t){let{ratio:e}={...D,...t},s=N().exec(e);if(!s)throw new Error(`Invalid ratio \'${e}\'`);let i=`FrameLayout-${e}`,r=o`\n      [data-i="${i}"] {\n        aspect-ratio: ${s[1]} / ${s[2]};\n      }\n    `;return{id:i,css:r}}get ratio(){return this.getAttribute("ratio")??D.ratio}set ratio(t){this.setAttribute("ratio",t)}render(){if(this.children.length!=1&&console.warn("<frame-layout> should only have one child element"),!N().exec(this.ratio)){console.error("<frame-layout> `ratio` must in the format %o but got %o","16:9",this.ratio,this);return}let{id:e,css:s}=x.getStyles({ratio:this.ratio});this.dataset.i=e,a(e,s)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var W={itemWidth:"auto",height:"auto",space:"var(--s0)",noBar:!1},v=class extends c(){static get observedAttributes(){return["itemWidth","height","space","noBar"]}static defineElement(){customElements.define("reel-layout",v)}static getStyles(t){let{itemWidth:e,height:s,space:i,noBar:r}={...W,...t},n=`ReelLayout-${e}${s}${i}${r}`,d=`\n      [data-i="${n}"] {\n        scrollbar-width: none;\n      }\n      [data-i="${n}"]::-webkit-scrollbar {\n        display: none;\n      }\n    `,h=o`\n      [data-i="${n}"] {\n        height: ${s};\n      }\n      [data-i="${n}"] > * {\n        flex: 0 0 ${e};\n      }\n      [data-i="${n}"] > * + * {\n        margin-inline-start: ${i};\n      }\n      [data-i="${n}"].overflowing {\n        ${r?"":`padding-bottom: ${i}`}\n      }\n      ${r?d:""}\n    `;return{id:n,css:h}}get itemWidth(){return this.getAttribute("itemWidth")||W.itemWidth}set itemWidth(t){this.setAttribute("itemWidth",t)}get height(){return this.getAttribute("height")||W.height}set height(t){this.setAttribute("height",t)}get space(){return this.getAttribute("space")||W.space}set space(t){this.setAttribute("space",t)}get noBar(){return this.hasAttribute("noBar")}set noBar(t){t?this.setAttribute("noBar",""):this.removeAttribute("noBar")}toggleOverflowClass(t){t.classList.toggle("overflowing",this.scrollWidth>this.clientWidth)}render(){let{itemWidth:t,height:e,space:s,noBar:i}=this,{id:r,css:n}=v.getStyles({itemWidth:t,height:e,space:s,noBar:i});this.dataset.i=r,a(r,n)}connectedCallback(){this.render(),"ResizeObserver"in window&&new ResizeObserver(t=>{this.toggleOverflowClass(t[0].target)}).observe(this),"MutationObserver"in window&&new MutationObserver(t=>{this.toggleOverflowClass(t[0].target)}).observe(this,{childList:!0})}attributeChangedCallback(){this.render()}};var T={breakout:!1,fixed:!1,margin:"0px"},C=class extends c(){static get observedAttributes(){return["breakout","margin","fixed"]}static defineElement(){customElements.define("imposter-layout",C)}static getStyles(t){let{breakout:e,fixed:s,margin:i}={...T,...t},r=`ImposterLayout-${e}${s}${i}`,n=i==="0"?"0px":i,d="position: fixed;",h=`\n      max-inline-size: calc(100% - (${n} * 2));\n      max-block-size: calc(100% - (${n} * 2));\n      overflow: auto;\n    `,R=o`\n      [data-i="${r}"] {\n        ${s?d:""}\n        ${e?"":h}\n      }\n    `;return{id:r,css:R}}get breakout(){return this.hasAttribute("breakout")??T.breakout}set breakout(t){t?this.setAttribute("breakout",""):this.removeAttribute("breakout")}get fixed(){return this.hasAttribute("fixed")??T.fixed}set fixed(t){t?this.setAttribute("fixed",""):this.removeAttribute("fixed")}get margin(){return this.getAttribute("margin")??T.margin}set margin(t){this.setAttribute("margin",t)}render(){let{breakout:t,fixed:e,margin:s}=this,{id:i,css:r}=C.getStyles({breakout:t,fixed:e,margin:s});this.dataset.i=i,a(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var O={space:void 0,label:void 0},E=class extends c(){static get observedAttributes(){return["space","label"]}static defineElement(){customElements.define("icon-layout",E)}static getStyles(t){let{space:e}={...O,...t},s=`IconLayout-${e}`,i=o`\n      [data-i="${s}"] {\n        display: inline-flex;\n        align-items: baseline;\n      }\n      \n      [data-i="${s}"] > svg {\n        margin-inline-end: ${e};\n      }\n    `;return{id:s,css:e?i:""}}get space(){return this.getAttribute("space")??O.space}set space(t){t?this.setAttribute("space",t):this.removeAttribute("space")}get label(){return this.getAttribute("label")??O.label}set label(t){t?this.setAttribute("label",t):this.removeAttribute("label")}render(){if(this.label&&(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label)),this.space){let{id:t,css:e}=E.getStyles({space:this.space});this.dataset.i=t,a(t,e)}}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var F=new Map([["box-layout",g],["stack-layout",m],["center-layout",b],["cluster-layout",p],["sidebar-layout",f],["switcher-layout",A],["cover-layout",y],["grid-layout",$],["frame-layout",x],["reel-layout",v],["imposter-layout",C],["icon-layout",E]]);var q=new Map([...F]);j(q);export{G as AlembicStyleSheet,g as BoxLayout,b as CenterLayout,p as ClusterLayout,y as CoverLayout,x as FrameLayout,$ as GridLayout,E as IconLayout,C as ImposterLayout,v as ReelLayout,f as SidebarLayout,m as StackLayout,A as SwitcherLayout,a as addGlobalStyle,q as allCustomElements,j as defineCustomElements,c as getHTMLElement,F as layoutCustomElements,o as trimCss};\n';

// src/tools.ts
var allElements = new Map([...layoutCustomElements]);
function processHtml(inputHtml, options = {}) {
  const styles = new AlembicStyleSheet();
  let outputHtml = inputHtml;
  for (const [elemName, element] of allElements) {
    const regex = _elementRegex(elemName);
    outputHtml = outputHtml.replace(regex, (_match, attrText) => {
      const attrs = _parseHtmlAttributes(attrText);
      const id = styles.addStyle(element.getStyles(attrs));
      return _recreateElement(elemName, attrText, id);
    });
  }
  const allStyles = Array.from(styles).map(([id, css]) => _createStyle(id, css)).concat(options.extraStyles ?? []).join("");
  const allScripts = (options.extraScripts ?? []).join("");
  outputHtml = outputHtml.replace(_commentRegex("inject-css"), allStyles).replace(_commentRegex("inject-js"), allScripts);
  return outputHtml;
}
function getStyles(inputHtml) {
  const styles = new AlembicStyleSheet();
  for (let [match, element] of _iterateElements(inputHtml, allElements)) {
    styles.addStyle(element.getStyles(_parseHtmlAttributes(match[1])));
  }
  return styles.getStyles();
}
function getBaseStyles() {
  return everything_default;
}
function getBaseScripts() {
  return everything_default2;
}
function* _iterateElements(html, elements) {
  for (const [name, element] of elements) {
    const regex = _elementRegex(name);
    let match = null;
    while (match = regex.exec(html)) {
      yield [match, element];
    }
  }
}
function _createStyle(id, css) {
  return `<style id="${id}">${css}</style>`;
}
function _recreateElement(name, attrs, id) {
  return `<${name} ${attrs} data-i="${id}">`;
}
function _parseHtmlAttributes(attrs) {
  const props = {};
  for (const attr of attrs.matchAll(/(\w[\w-]+)(?:="?([^"]*)"?)?/g)) {
    props[attr[1]] = attr[2] ?? "";
  }
  return props;
}
function _elementRegex(name) {
  return new RegExp(`<${name}[\\s\\n\\r]+?([\\w\\W]*?)>`, "g");
}
function _commentRegex(name) {
  return new RegExp(`<!--\\s+@openlab/alembic\\s+${name}\\s+-->`);
}
export {
  _commentRegex,
  _createStyle,
  _elementRegex,
  _iterateElements,
  _parseHtmlAttributes,
  _recreateElement,
  getBaseScripts,
  getBaseStyles,
  getStyles,
  processHtml
};
