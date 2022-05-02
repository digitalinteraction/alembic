---
layout: md-docs-layout.njk
title: Home
---

## 0.1.0 API

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
  StackLayout,
  ...,
  IconLayout,
} from '@openlab/alembic/layouts.js'
import { addGlobalStyle } from '@openlab/alembic/lib.js'

defineLayoutElements()

// Each layout is exported so you can manually define them,
// e.g. `StackLayout.defineElement()`
```

<!-- [**Component usage →**](https://digitalinteraction.github.io/alembic/src/layouts/) -->
