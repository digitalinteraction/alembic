---
layout: md-docs-layout.njk
title: Home
---

## 0.1.x API

**install**

```bash
npm install @openlab/alembic@0.1.x
```

**import styles**

```css
@import '@openlab/alembic/reset.css';
@import '@openlab/alembic/layouts.css';
```

**import scripts**

```js
import {
  defineLayoutElements,
  layoutCustomElementNames,
  layoutMap,
  StackLayout,
  ...,
  IconLayout,
} from '@openlab/alembic/layouts.js'
import { addGlobalStyle, trimCss } from '@openlab/alembic/lib.js'

defineLayoutElements()

// Each layout is exported so you can manually define them,
// e.g. `StackLayout.defineElement()`
```

**static generation**

Each layout has a static method `getStyles(attributes)` which is used to compute styles.
When statically generating content, you can precompute the styles layouts will need
and inject them into HTML before it is served to clients.

> You need to import `@openlab/alembic/fake-dom-env.js` first which
> stubs-out HTMLElement so the layouts can be imported from Node.js.

```js
import '@openlab/alembic/fake-dom-env.js'
import { injectStyles } from '@openlab/alembic'

const inputFile = `
<html>
  <head>
    ...
    <!-- @openlab/alembic inject-css -->
  </head>
  <body>
    <box-layout padding="0"> ... </box-layout>
  </body>
</html>
`

console.log(injectStyles(inputFile))
```
