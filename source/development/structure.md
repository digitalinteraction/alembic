---
layout: markdown.njk
title: Project Structure
eleventyNavigation:
  key: Project Structure
  parent: Dev
  excerpt: How the project is setup and where things go
---

This project is set up with locality in mind, files that are often edited together should be near each other. The code is in the `src/` directory in the repo where it is then split up into the different modules of the library. Those modules correlate closely to the structure of the documentation site. The documentation is in the same directory structure as the code itself.

The library is built using [esbuild](https://esbuild.github.io/) in `scripts/build-library.js` and the documentation website is built with [Eleventy](https://www.11ty.dev/) from `scripts/build-docs.js`.

Significant folders:

- `dist` — where the library and website are written to
- `examples` — a few well-formed examples of using Alembic
- `research` — notes on future feature design or refactors
- `scripts` — scripts to build the library or documentation website
- `source` — all the source code for the library and documentation website,
  top-level files are also entry-points for NPM consumers.
- `source/_*` — meta directories in Eleventy for building the documentation site
- `source/@types` — custom TypeScript types
- `source/assets` — assets to be built in to the library
- `source/development` — documentation around developing Alembic itself
- `source/docs` — tools to help creating the documentation website
- `source/forms` — **forms** module, inspired by [Form Design Patterns](https://formdesignpatterns.com/)
- `source/install` — documentation about install Alembic in different types of project
- `source/layouts` — **layouts** module, based on [EveryLayout](https://every-layout.dev/)
- `source/lib` — **lib** module, common tools for all modules

Public entry-points:

- `11ty.js` — Eleventy plugin
- `everything.css` — all the static CSS styles
- `everything.js` — client-side self-installing scripts to enable runtime usage
- `module.js` — client-side scripts to enable runtime usage
- `tools.js` — scripts for processing before client-side

Key files:

- `.eleventy.cjs` — Eleventy entry-point
- `CHANGELOG.md` — documentation for different versions
