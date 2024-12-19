---
layout: index.njk
title: Labcoat
links:
  - labcoat
---

> UNSTABLE

Quickly add basic styles to HTML to get a responsive & pretty page.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Peculiar Page</title>
    <meta charset="utf8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="https://alembic.openlab.dev/labcoat.css" />
    <link rel="stylesheet" href="https://fonts.openlab.dev/inter/inter.css" />
  </head>
  <body>
    <header>Peculiar Page</header>
    <main>
      <center-layout>
        <article class="flow">
          <h1>Hello, World!</h1>
          <p>
            Arcu porttitor elit bibendum lacus libero velit labore dolor
            pharetra diam. Quam non dictum non laoreet scelerisque fringilla
            auctor aliqua hac aenean elementum.
          </p>
          <blockquote>Wow!</blockquote>
        </article>
      </center-layout>
    </main>
    <script
      type="module"
      src="https://alembic.openlab.dev/everything.js"
    ></script>
  </body>
</html>
```

## Features

- A [HTML reset]({{ '/development/reset-css/' | url }})
- Setup with all [Layout elements]({{ '/layouts/' | url }})
- [Form patterns]({{ '/forms/' | url }}) are available too
- A full height `<body>` tag
- A `<main>` element that fills the full-height `<body>` when directly nested
- A custom `<header>` at the top when no class is applied to it
- A custom `<footer>` at the bottom when no class is applied to it
- Light + dark themes based on user's OS preference
- Styled HTML elements (see below)
- A `.flow` class to make HTML content flow nicely down the page
- Hide anything with `aria-hidden="true"`

## Styled elements

- `<a>`
- `<blockquote>`
- `<code>`
- `<details> + <summary>`
- `<h1> ... </h6>`
- `<pre>`
- `<table>`
- `<dl> + <dt> + <dd>`
- `<figure> + <figcaption>`
- `<blockquote>`

## Customisation

You can override these CSS variables to tweak labcoat a bit, anything more and you should not be using labcoat!

- `--fillable` — A colour to signify a field is editable
- `--font-main` — A font stack for most text
- `--font-mono` — A font stack for monospace text
- `--anchor` — The colour of links and anchors
- `--color` — The colour of text
- `--background` — The colour of the page background
- `--border` — The colour to show borders
- `--highlight` — The background to highlight an element, like a blockquote
- `--focus` — The colour to signify the currently focussed item

> Any styled elements will be reset if you add a `class` to them,
> to make the styles easy to override.
