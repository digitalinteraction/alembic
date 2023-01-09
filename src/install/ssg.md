---
layout: markdown.njk
title: Static Site Generators
tags:
  - install
---

Alembic is designed to be compiled up-front to reduce the amount of JavaScript you need to ship to users.
There are specific bits of the library for achieving this and there is also an [Eleventy](https://www.11ty.dev/) plugin too.

{% include 'install.njk' %}

## Contents

- [Eleventy plugin](#eleventy-plugin)
- [DIY](#diy)
- [Configuration](#configuration)

---

## Eleventy plugin

If you're using [Eleventy](https://www.11ty.dev/), it's super easy to install!

Insert this into your existing **.eleventy.js**:

```js
const { eleventyAlembic } = require('@openlab/alembic/11ty')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyAlembic)

  // TODO: notes on html comments, scripts and styles

  return // ...
}
```

TODO: more about what it does under-the-hood.

---

## DIY

Alembic provides the tools to hook it up to any static site generator or build process.

The methods you'll be interested in are: `processHtml`, `getStyles`, `getBaseStyles` and `getBaseScripts` which you can import from the "tools" script:

```ts
import {
  processHtml,
  getStyles,
  getBaseStyles,
  getBaseScripts,
} from '@openlab/alembic/tools.js'
```

### `processHtml(inputHtml, options = {})`

**processHtml** takes a HTML string then looks through it for Alembic usage and modifies the HTML to generate custom element styles (e.g. for the [layouts]({{ '/layouts/' | url }})).

You can optionally provide `options` to inject styles or scripts into the inputHtml too.

```js
const options = {
  extraStyles: [`<link rel="stylesheet" href="/alembic/style.css">`],
  extraScripts: [`<script type="module" src="/alembic/script.js"></script>`],
}
```

You control where the styles and scripts are injected using a special HTML comments `<!-- @openlab/alembic inject-css -->` and `<!-- @openlab/alembic inject-js -->`.

### `getStyles`

### `getBaseStyles`

### `getBaseScripts`

## Configuration

TODO: For both Eleventy and DIY, you can configure ...
