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

---

{% include 'install.njk' %}

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

The plugin does two things. First it adds a [eleventy.after event](https://www.11ty.dev/docs/events/#eleventy.after) which creates `alembic/style.css` and `alembic/script.js` in your site output folder.

Second it adds a [transform](https://www.11ty.dev/docs/config/#transforms) for any HTML file to generate any custom element styles and insert them back into the document. You need to add one of both of these comments to you HTML template/layout for this to take effect. The plugin will replace the comments with the generated styles/scripts.

`<!-- @openlab/alembic inject-css -->`
tells the plugin where to put styles. It will put generated custom element styles and a link to the `alembic/style.css` mentioned above where this comment is.

`<!-- @openlab/alembic inject-js -->`
tells the plugin where to put scripts. It will link to the `alembic/script.js` mentioned above here, it's only needed if you want dynamic styles on your pages. This is often useful for development but might not be needed for production builds.

---

## DIY

Alembic provides the tools to hook it up to a static site generator.

The methods you'll be interested in are: `processHtml`, `getStyles`, `getBaseStyles` and `getBaseScripts` which you can import from the "tools" script. These are the same tools the Eleventy plugin use.

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
