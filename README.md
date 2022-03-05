A Design System for Open Lab research projects

## Contents

- [Layouts](src/layouts)

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
  StackLayout,
  ...,
  IconLayout,
} from '@openlab/alembic/layouts.js'
import { addGlobalStyle } from '@openlab/alembic/lib.js'

defineLayoutElements()

// Each layout is exported so you can manually define them,
// e.g. `StackLayout.defineElement()`
```

[**Component usage →**](src/layouts)

## Release process

1. Run the build
2. Update API docs if needed
3. Run `npm version minor|major|patch`
4. Run `npm publish`

---

> This project was set up by [puggle](https://npm.im/puggle)
