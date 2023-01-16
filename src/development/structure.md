---
layout: markdown.njk
title: Structure
strapline: How the project is setup and where things go
tags:
  - development
---

This project is set up with locality in mind, files that are often edited together should be near each other. The code is in the `src/` directory in the repo where it is then split up into the different modules of the library. Those modules correlate closely to the structure of the documentation site. The documentation is in the same directory structure as the code itself.

The library is built using [esbuild](https://esbuild.github.io/) in `scripts/build-library.js` and the documentation website is built with [Eleventy](https://www.11ty.dev/) from `scripts/build-docs.js`.

Significant folders:

- `dist` — where the library and website are written to
- `examples` — a few well-formed examples of using Alembic
- `research` — notes on future feature design or refactors
- `scripts` — scripts to build the library or documentation website
- `src` — all the source code for the library and documentation website,
  top-level files are also entry-points for NPM consumers.
- `src/_*` — meta directories in Eleventy for building the documentation site
- `src/@types` — custom TypeScript types
- `src/assets` — assets to be built in to the library
- `src/development` — documentation around developing Alembic itself
- `src/docs` — tools to help creating the documentation website
- `src/forms` — **forms** module, inspired by [Form Design Patterns](https://formdesignpatterns.com/)
- `src/install` — documentation about install Alembic in different types of project
- `src/layouts` — **layouts** module, based on [EveryLayout](https://every-layout.dev/)
- `src/lib` — **lib** module, common tools for all modules

Public entry-points:

- `11ty.js` — Eleventy plugin
- `everything.css` — all the static CSS styles
- `everything.js` — client-side self-installing scripts to enable runtime usage
- `module.js` — client-side scripts to enable runtime usage
- `tools.js` — scripts for processing before client-side

Key files:

- `.eleventy.cjs` — Eleventy entry-point
- `CHANGELOG.md` — documentation for different versions
