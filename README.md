# ⚗️ Alembic

A Design System for Open Lab research projects.

[**Go to the docs →**](https://digitalinteraction.github.io/alembic/)

## Release process

1. Run the build
2. Update API docs if needed
3. Run `npm version minor|major|patch`
4. Run `npm publish`

## Uses

This library is used by several Open Lab projects:

- [openlab.ncl.ac.uk](https://openlab.ncl.ac.uk) - [repo](http://github.com/digitalinteraction/openlab.ncl.ac.uk)
- [datadiaries.uk](https://datadiaries.uk) - [repo](https://github.com/digitalinteraction/datadiaries-app)
- [alembic.openlab.dev](https://alembic.openlab.dev) - (this repo)
- [Coffee Club](https://github.com/digitalinteraction/beancounter)
- [Open Lab Hub](https://hub.openlab.dev)
- [Nunjucks playground](https://nunjucks.r0b.io/)

## Design

**Goals**

1. Provide a step up (design-wise) for developers
2. Reduce duplication in effort/code/work
3. Improve collaboration on projects and focus evolution in the same direction

**What**

- A library of components and patterns
- A documentation site to describe the design system

**To explore**

- More accessibility concerns
- Document the reason behind decisions / solutions
- Think about adaptability, evolution and collaboration

## Coding conventions

> TODO: find a better place for these

**css variables**

- "axioms" are single words like `--measure`
- everything else is type-prefixed like `--color-background` or `--border-thin`

**imports**

`module.js` is the main entrypoint, sub-modules are self-named files in their own folder e.g. `lib/lib.js` or `layouts/layouts.js`.

**misc**

- group source by the module, js + css alongside eachother is fine. It makes it easy to work on a module.
- avoid JavaScript's default exports
- sub-modules should explicitly export things, avoid `export * from '...'`-type code
- pure functions where possible
- exported code prefixed with `_` (an underscore) is internal, should not be used and may change between major releases

---

> This project was set up by [puggle](https://npm.im/puggle)
