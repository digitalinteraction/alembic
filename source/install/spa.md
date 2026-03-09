---
layout: markdown.njk
title: Single Page Applications
strapline: Link up with SPAs for JavaScript-based apps
tags:
  - install
---

{% from 'macros.njk' import apiDoc %}

Alembic is designed to be compiled up-front to reduce client-side JavaScript but you can still use it in JavaScript-based single page apps. Your framework will probably come with a bundler to use with it so this guide will cover a few.

## Contents

- [Getting started](#getting-started)
- [Vite](#vite)
- [Parcel](#parcel)
- [DIY](#diy)

---

{% include 'install.njk' %}

## Getting started

Your bundler should pick up an import to Alembic assets and process the code it its own way, .e.g to minify or optimise them. These are the files you can import:

- `@openlab/alembic` (same as **module.js**)
- `@openlab/alembic/module.js`
- `@openlab/alembic/reset.css`
- `@openlab/alembic/everything.js`
- `@openlab/alembic/everything.css`
- `@openlab/alembic/tools.js`

> It's worth noting that Alembic only supports **ESM**.

If you just want an import and everything will work, import `everything.js` from your JavaScript
and link to `everything.css` from your CSS.

If you want to manually trigger Alembic client-side, import `module.js` like this:

```js
import { allCustomElements, defineCustomElements } from '@openlab/alembic'

// Then whenever call this you want to trigger Alembic to run:
defineCustomElements(allCustomElements)
```

and then in your CSS file:

```css
@import '@openlab/alembic/everything.css';
```

## Vite + vue

When using Vite, you **also** need to tell it which elements from Alembic are custom elements, so it knows not to process these. Create or update your [Vite config](https://vitejs.dev/config/) to include:

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { allCustomElements } from '@openlab/alembic'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => allCustomElements.has(tag),
        },
      },
    }),
  ],
})
```

> Last tested with `vite@3` and `@vitejs/plugin-vue@3`

## Parcel

When using Parcel, do the same initial setup but you'll need `npm:` prefixes in your imports in JavaScript:

```js
import 'npm:@openlab/alembic/everything.js'
```

and in CSS:

```css
@import 'npm:@openlab/alembic/everything.css';
```

<!-- TODO: test with parcel and report versions -->

## DIY

See the [api docs]({{ '/development/api/' | url }}) for the tools available to hook things up yourself.
