"use strict";var P=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var U=Object.prototype.hasOwnProperty;var V=(a,t)=>{for(var e in t)P(a,e,{get:t[e],enumerable:!0})},X=(a,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Q(t))!U.call(a,i)&&i!==e&&P(a,i,{get:()=>t[i],enumerable:!(s=K(t,i))||s.enumerable});return a};var Y=a=>X(P({},"__esModule",{value:!0}),a);var Z=(a,t,e)=>{if(!t.has(a))throw TypeError("Cannot "+e)};var S=(a,t,e)=>(Z(a,t,"read from private field"),e?e.call(a):t.get(a)),D=(a,t,e)=>{if(t.has(a))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(a):t.set(a,e)};var _={};V(_,{AlembicStyleSheet:()=>M,BoxLayout:()=>m,CenterLayout:()=>g,ClusterLayout:()=>b,CoverLayout:()=>A,FrameLayout:()=>$,GridLayout:()=>y,IconLayout:()=>C,ImposterLayout:()=>v,ReelLayout:()=>x,SidebarLayout:()=>p,StackLayout:()=>h,SwitcherLayout:()=>f,addGlobalStyle:()=>o,allCustomElements:()=>N,defineCustomElements:()=>w,getHTMLElement:()=>l,layoutCustomElements:()=>z,trimCss:()=>c});module.exports=Y(_);function o(a,t){if(document.getElementById(a))return;let e=document.createElement("style");e.id=a,e.innerHTML=t,document.head.appendChild(e)}function c(a,...t){let e=[];for(let s=0;s<a.length;s++)e.push(a[s]),s<t.length&&e.push(t[s]);return e.join("").replace(/\s\s+/g," ").trim()}var u,M=class{constructor(){D(this,u,new Map)}reset(){S(this,u).clear()}getStyles(){return new Map(S(this,u))}addStyle({id:t,css:e}){return S(this,u).has(t)||S(this,u).set(t,e),t}*[Symbol.iterator](){for(let[t,e]of S(this,u))yield[t,e]}};u=new WeakMap;function l(){return globalThis.HTMLElement??class{constructor(){throw new TypeError(`Cannot instantiate ${this.constructor.name} outside of the DOM`)}}}function w(a){if(!("customElements"in window)){console.warn("customElements is not supported");return}for(let[t,e]of a)customElements.define(t,e)}var F={space:"var(--s1)"},h=class extends l(){static get observedAttributes(){return["space"]}static defineElement(){customElements.define("stack-layout",h)}static getStyles(t){let{space:e}={...F,...t},s=`StackLayout-${e}`,i=c`
      [data-i="${s}"] > * + * {
        margin-block-start: ${e};
      }
    `;return{id:s,css:i}}get space(){return this.getAttribute("space")??F.space}set space(t){this.setAttribute("space",t)}render(){let{space:t}=this,{id:e,css:s}=h.getStyles({space:t});this.dataset.i=e,o(e,s)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var B={padding:"var(--s1)",borderWidth:"var(--border-thin)",invert:!1},m=class extends l(){static get observedAttributes(){return["borderWidth","padding","invert"]}static defineElement(){customElements.define("box-layout",m)}static getStyles(t){let{padding:e,borderWidth:s,invert:i}={...B,...t},r=`BoxLayout-${e}${s}${i}`,d=c`
      [data-i="${r}"] {
        padding: ${e};
        border-width: ${s};
        ${i?"color: var(--color-background); background-color: var(--color-foreground);":"color: var(--color-foreground); background-color: var(--color-background);"}
      }
    `;return{id:r,css:d}}get padding(){return this.getAttribute("padding")??B.padding}set padding(t){this.setAttribute("padding",t)}get borderWidth(){return this.getAttribute("borderWidth")??B.borderWidth}set borderWidth(t){this.setAttribute("borderWidth",t)}get invert(){return this.hasAttribute("invert")}set invert(t){t?this.setAttribute("invert",""):this.removeAttribute("invert")}render(){let{padding:t,borderWidth:e,invert:s}=this,{id:i,css:r}=m.getStyles({padding:t,borderWidth:e,invert:s});this.dataset.i=i,o(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var L={max:"var(--measure)",gutters:void 0,intrinsic:!1},g=class extends l(){static get observedAttributes(){return["max","gutters","intrinsic"]}static defineElement(){customElements.define("center-layout",g)}static getStyles(t){let{max:e,gutters:s,intrinsic:i}={...L,...t},r=`CenterLayout-${e}${s}${i}`,n=`padding-inline: ${s};`,E=c`
      [data-i="${r}"] {
        max-width: ${e};
        ${s?n:""}
        ${i?`
      display: flex;
      flex-direction: column;
      align-items: center;
    `:""}
      }
    `;return{id:r,css:E}}get max(){return this.getAttribute("max")??L.max}set max(t){this.setAttribute("max",t)}get gutters(){return this.getAttribute("gutters")??L.gutters}set gutters(t){t?this.setAttribute("gutters",t):this.removeAttribute("gutters")}get intrinsic(){return this.hasAttribute("intrinsic")??L.intrinsic}set intrinsic(t){t?this.setAttribute("intrinsic",""):this.removeAttribute("intrinsic")}render(){let{max:t,gutters:e,intrinsic:s}=this,{id:i,css:r}=g.getStyles({max:t,gutters:e,intrinsic:s});this.dataset.i=i,o(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var H={justify:"flex-start",align:"flex-start",space:"var(--s1)"},b=class extends l(){static get observedAttributes(){return["justify","align","space"]}static defineElement(){customElements.define("cluster-layout",b)}static getStyles(t){let{justify:e,align:s,space:i}={...H,...t},r=`ClusterLayout-${e}${s}${i}`,n=c`
      [data-i="${r}"] {
        justify-content: ${e};
        align-items: ${s};
        gap: ${i};
      }
    `;return{id:r,css:n}}get justify(){return this.getAttribute("justify")??H.justify}set justify(t){this.setAttribute("justify",t)}get align(){return this.getAttribute("align")??H.align}set align(t){this.setAttribute("align",t)}get space(){return this.getAttribute("space")??H.space}set space(t){this.setAttribute("space",t)}render(){let{justify:t,align:e,space:s}=this,{id:i,css:r}=b.getStyles({justify:t,align:e,space:s});this.dataset.i=i,o(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var k={side:"left",sideWidth:void 0,contentMin:"50%",space:"var(--s1)",noStretch:!1},p=class extends l(){static get observedAttributes(){return["side","sideWidth","contentMin","space","noStretch"]}static defineElement(){customElements.define("sidebar-layout",p)}static getStyles(t){let{side:e,sideWidth:s,contentMin:i,space:r,noStretch:n}={...k,...t},d=`SidebarLayout-${e}${s}${i}${r}${n}`,E=e!=="left"?":first-child":":last-child",j=c`
      [data-i="${d}"] {
        gap: ${r};
        ${n?"align-items: flex-start;":""}
      }
      [data-i="${d}"] > * {
        ${s?`flex-basis: ${s};`:""}
      }
      [data-i="${d}"] > ${E} {
        flex-basis: 0;
        flex-grow: 999;
        min-inline-size: ${i};
      }
    `;return{id:d,css:j}}get side(){return this.getAttribute("side")||k.side}set side(t){this.setAttribute("side",t)}get sideWidth(){return this.getAttribute("sideWidth")||k.sideWidth}set sideWidth(t){t?this.setAttribute("sideWidth",t):this.removeAttribute("sideWidth")}get contentMin(){return this.getAttribute("contentMin")||k.contentMin}set contentMin(t){this.setAttribute("contentMin",t)}get space(){return this.getAttribute("space")||k.space}set space(t){this.setAttribute("space",t)}get noStretch(){return this.hasAttribute("noStretch")}set noStretch(t){t?this.setAttribute("noStretch",""):this.removeAttribute("noStretch")}render(){this.contentMin.includes("%")||console.warn("<sidebar-layout> `contentMin` property should be a percentage to prevent overflow. %o supplied",this.contentMin);let{side:t,sideWidth:e,contentMin:s,space:i,noStretch:r}=this,{id:n,css:d}=p.getStyles({side:t,sideWidth:e,contentMin:s,space:i,noStretch:r});this.dataset.i=n,o(n,d)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var W={threshold:"var(--measure)",space:"var(--s1)",limit:"4"},f=class extends l(){static get observedAttributes(){return["threshold","space","limit"]}static defineElement(){customElements.define("switcher-layout",f)}static getStyles(t){let{threshold:e,space:s,limit:i}={...W,...t},r=`SwitcherLayout-${e}${s}${i}`,n=parseInt(i)+1,d=c`
      [data-i="${r}"] {
        gap: ${s};
      }
      [data-i="${r}"] > * {
        flex-basis: calc((${e} - 100%) * 999);
      }
      [data-i="${r}"] > :nth-last-child(n+${n}),
      [data-i="${r}"] > :nth-last-child(n+${n}) ~ * {
        flex-basis: 100%;
      }
    `;return{id:r,css:d}}get threshold(){return this.getAttribute("threshold")||W.threshold}set threshold(t){this.setAttribute("threshold",t)}get space(){return this.getAttribute("space")||W.space}set space(t){this.setAttribute("space",t)}get limit(){return this.getAttribute("limit")||W.limit}set limit(t){this.setAttribute("limit",t)}render(){Number.isNaN(parseInt(this.limit))&&console.warn("<switcher-layout> `limit` is not a number, %o",this.limit,this);let{threshold:t,space:e,limit:s}=this,{id:i,css:r}=f.getStyles({threshold:t,space:e,limit:s});this.dataset.i=i,o(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var T={centered:"h1",space:"var(--s1)",minHeight:"100vh",noPad:!1},A=class extends l(){static get observedAttributes(){return["centered","space","minHeight","noPad"]}static defineElement(){customElements.define("cover-layout",A)}static getStyles(t){let{centered:e,space:s,minHeight:i,noPad:r}={...T,...t},n=`CoverLayout-${e}${s}${i}${r}`,d=c`
      [data-i="${n}"] {
        min-height: ${i};
        padding: ${r?"0":s};
      }
      [data-i="${n}"] > * {
        margin-block: ${s};
      }
      [data-i="${n}"] > :first-child:not(${e}) {
        margin-block-start: 0;
      }
      [data-i="${n}"] > :last-child:not(${e}) {
        margin-block-end: 0;
      }
      [data-i="${n}"] > ${e} {
        margin-block: auto;
      }
    `;return{id:n,css:d}}get centered(){return this.getAttribute("centered")??T.centered}set centered(t){this.setAttribute("centered",t)}get space(){return this.getAttribute("space")??T.space}set space(t){this.setAttribute("space",t)}get minHeight(){return this.getAttribute("minHeight")??T.minHeight}set minHeight(t){this.setAttribute("minHeight",t)}get noPad(){return this.hasAttribute("noPad")}set noPad(t){t?this.setAttribute("noPad",""):this.removeAttribute("noPad")}render(){let{centered:t,space:e,minHeight:s,noPad:i}=this,{id:r,css:n}=A.getStyles({centered:t,space:e,minHeight:s,noPad:i});this.dataset.i=r,o(r,n)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var O={min:"250px",space:"var(--s1)"},y=class extends l(){static get observedAttributes(){return["min","space"]}static defineElement(){customElements.define("grid-layout",y)}static getStyles(t){let{min:e,space:s}={...O,...t},i=`GridLayout-${e}${s}`,r=c`
      [data-i="${i}"] {
        grid-gap: ${s};
      }
      
      @supports (width: min(${e}, 100%)) {
        [data-i="${i}"] {
          grid-template-columns: repeat(auto-fill, minmax(min(${e}, 100%), 1fr));
        }
      }
    `;return{id:i,css:r}}get min(){return this.getAttribute("min")??O.min}set min(t){this.setAttribute("min",t)}get space(){return this.getAttribute("space")??O.space}set space(t){this.setAttribute("space",t)}render(){let{min:t,space:e}=this,{id:s,css:i}=y.getStyles({min:t,space:e});this.dataset.i=s,o(s,i)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var q=()=>/^(\d+):(\d+)$/,J={ratio:"16:9"},$=class extends l(){static get observedAttributes(){return["ratio"]}static defineElement(){customElements.define("frame-layout",$)}static getStyles(t){let{ratio:e}={...J,...t},s=q().exec(e);if(!s)throw new Error(`Invalid ratio '${e}'`);let i=`FrameLayout-${e}`,r=c`
      [data-i="${i}"] {
        aspect-ratio: ${s[1]} / ${s[2]};
      }
    `;return{id:i,css:r}}get ratio(){return this.getAttribute("ratio")??J.ratio}set ratio(t){this.setAttribute("ratio",t)}render(){if(this.children.length!=1&&console.warn("<frame-layout> should only have one child element"),!q().exec(this.ratio)){console.error("<frame-layout> `ratio` must in the format %o but got %o","16:9",this.ratio,this);return}let{id:e,css:s}=$.getStyles({ratio:this.ratio});this.dataset.i=e,o(e,s)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var R={itemWidth:"auto",height:"auto",space:"var(--s0)",noBar:!1},x=class extends l(){static get observedAttributes(){return["itemWidth","height","space","noBar"]}static defineElement(){customElements.define("reel-layout",x)}static getStyles(t){let{itemWidth:e,height:s,space:i,noBar:r}={...R,...t},n=`ReelLayout-${e}${s}${i}${r}`,d=`
      [data-i="${n}"] {
        scrollbar-width: none;
      }
      [data-i="${n}"]::-webkit-scrollbar {
        display: none;
      }
    `,E=c`
      [data-i="${n}"] {
        height: ${s};
      }
      [data-i="${n}"] > * {
        flex: 0 0 ${e};
      }
      [data-i="${n}"] > * + * {
        margin-inline-start: ${i};
      }
      [data-i="${n}"].overflowing {
        ${r?"":`padding-bottom: ${i}`}
      }
      ${r?d:""}
    `;return{id:n,css:E}}get itemWidth(){return this.getAttribute("itemWidth")||R.itemWidth}set itemWidth(t){this.setAttribute("itemWidth",t)}get height(){return this.getAttribute("height")||R.height}set height(t){this.setAttribute("height",t)}get space(){return this.getAttribute("space")||R.space}set space(t){this.setAttribute("space",t)}get noBar(){return this.hasAttribute("noBar")}set noBar(t){t?this.setAttribute("noBar",""):this.removeAttribute("noBar")}toggleOverflowClass(t){t.classList.toggle("overflowing",this.scrollWidth>this.clientWidth)}render(){let{itemWidth:t,height:e,space:s,noBar:i}=this,{id:r,css:n}=x.getStyles({itemWidth:t,height:e,space:s,noBar:i});this.dataset.i=r,o(r,n)}connectedCallback(){this.render(),"ResizeObserver"in window&&new ResizeObserver(t=>{this.toggleOverflowClass(t[0].target)}).observe(this),"MutationObserver"in window&&new MutationObserver(t=>{this.toggleOverflowClass(t[0].target)}).observe(this,{childList:!0})}attributeChangedCallback(){this.render()}};var G={breakout:!1,fixed:!1,margin:"0px"},v=class extends l(){static get observedAttributes(){return["breakout","margin","fixed"]}static defineElement(){customElements.define("imposter-layout",v)}static getStyles(t){let{breakout:e,fixed:s,margin:i}={...G,...t},r=`ImposterLayout-${e}${s}${i}`,n=i==="0"?"0px":i,d="position: fixed;",E=`
      max-inline-size: calc(100% - (${n} * 2));
      max-block-size: calc(100% - (${n} * 2));
      overflow: auto;
    `,j=c`
      [data-i="${r}"] {
        ${s?d:""}
        ${e?"":E}
      }
    `;return{id:r,css:j}}get breakout(){return this.hasAttribute("breakout")??G.breakout}set breakout(t){t?this.setAttribute("breakout",""):this.removeAttribute("breakout")}get fixed(){return this.hasAttribute("fixed")??G.fixed}set fixed(t){t?this.setAttribute("fixed",""):this.removeAttribute("fixed")}get margin(){return this.getAttribute("margin")??G.margin}set margin(t){this.setAttribute("margin",t)}render(){let{breakout:t,fixed:e,margin:s}=this,{id:i,css:r}=v.getStyles({breakout:t,fixed:e,margin:s});this.dataset.i=i,o(i,r)}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var I={space:void 0,label:void 0},C=class extends l(){static get observedAttributes(){return["space","label"]}static defineElement(){customElements.define("icon-layout",C)}static getStyles(t){let{space:e}={...I,...t},s=`IconLayout-${e}`,i=c`
      [data-i="${s}"] {
        display: inline-flex;
        align-items: baseline;
      }
      
      [data-i="${s}"] > svg {
        margin-inline-end: ${e};
      }
    `;return{id:s,css:e?i:""}}get space(){return this.getAttribute("space")??I.space}set space(t){t?this.setAttribute("space",t):this.removeAttribute("space")}get label(){return this.getAttribute("label")??I.label}set label(t){t?this.setAttribute("label",t):this.removeAttribute("label")}render(){if(this.label&&(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label)),this.space){let{id:t,css:e}=C.getStyles({space:this.space});this.dataset.i=t,o(t,e)}}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}};var z=new Map([["box-layout",m],["stack-layout",h],["center-layout",g],["cluster-layout",b],["sidebar-layout",p],["switcher-layout",f],["cover-layout",A],["grid-layout",y],["frame-layout",$],["reel-layout",x],["imposter-layout",v],["icon-layout",C]]);var N=new Map([...z]);w(N);0&&(module.exports={AlembicStyleSheet,BoxLayout,CenterLayout,ClusterLayout,CoverLayout,FrameLayout,GridLayout,IconLayout,ImposterLayout,ReelLayout,SidebarLayout,StackLayout,SwitcherLayout,addGlobalStyle,allCustomElements,defineCustomElements,getHTMLElement,layoutCustomElements,trimCss});
