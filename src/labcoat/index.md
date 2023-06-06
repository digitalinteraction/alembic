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
      <center-layout data-i="CenterLayout-var(--measure)undefinedfalse">
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

- A full height `<body>` tag
- Styled `<header>` at the top when no class is applied to it
- Styled `<footer>` at the bottom when no class is applied to it
- Setup with all [Layout elements]({{ '/layouts/' | url }})
- Light + dark theme
- Styled `<blockquote>` elements
- Styled `<blockquote>` elements
- Use a `.flow` class to make HTML content flow nicely down the page

## Styled elements

- `<blockquote>`
- `<details>`
- `<code>`
- `<pre>`
- `<h1> ... </h6>`
