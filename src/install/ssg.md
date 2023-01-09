---
layout: markdown.njk
title: Static Site Generators
tags:
  - install
---

{% from 'macros.njk' import apiDoc %}

Alembic is designed to be compiled up-front to reduce the amount of JavaScript you need to ship to users.
There are specific bits of the library for achieving this and there is also an [Eleventy](https://www.11ty.dev/) plugin too.

## Contents

- [How it works](#how-it-works)
- [Eleventy plugin](#eleventy-plugin)
- [DIY](#diy)
- [Configuration](#configuration)

---

{% include 'install.njk' %}

## How it works

- TODO: How SSG process is meant to work?
- TODO: How Alembic works, maybe an include?

## Eleventy plugin

If you're using [Eleventy](https://www.11ty.dev/), it's super easy to install!

Insert this into your existing **.eleventy.js**:

```js
const { eleventyAlembic } = require('@openlab/alembic/11ty')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyAlembic)

  return // ...
}
```

- TODO: notes on html comments, scripts and styles
- TODO: more about what it does under-the-hood.

---

## DIY

Alembic provides the tools to hook it up to a static site generator.

The methods you'll be interested in are: `processHtml`, `getStyles`, `getBaseStyles` and `getBaseScripts` which you can import from the "tools" script:

```ts
import {
  processHtml,
  getStyles,
  getBaseStyles,
  getBaseScripts,
} from '@openlab/alembic/tools.js'
```

{{ apiDoc(api, 'tools.ts', 'processHtml') }}

{{ apiDoc(api, 'tools.ts', 'getStyles') }}

{{ apiDoc(api, 'tools.ts', 'getBaseStyles') }}

{{ apiDoc(api, 'tools.ts', 'getBaseScripts') }}

## Configuration

TODO: For both Eleventy and DIY, you can configure ...
