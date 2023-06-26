# Change log

Notable changes to Alembic are documented here

## 0.3.2

Labcoat improvements and website updates.

## 0.3.1

Adds new **unstable** labcoat, a set of generic styles to make basic HTML pages look good.
Also upgraded various development dependencies and fix some documentation issues.

Also **unstable**, adds experimental shortcodes when using Custom Element attributes, for now there are shortcodes for scale-values. See `lib/attributes.ts` for the current mapping. For example, you can specify `space="s0"` rather than of `space="var(--s0)"`.

## 0.3.0

JavaScript has been converted to TypeScript

**added**

- **layouts:** `layoutCustomElements`
- **layouts:** `{Name}LayoutAttributes` interface for each layout's attribute signature

**changed**

- ?

**removed**

- **layouts:** `layoutMap` → use new `layoutCustomElements`
- **layouts:** `layoutCustomElementNames` → use new `layoutCustomElements`
- **lib:** `fake-dom-env.js` → not needed any more
- drop CommonJs support

## 0.2.5

**tweaks**

- Added tile navigation to the layouts page
- Added `DocSection#toggleOpen(force?)`
- Added `DetailsUtils#toggleOpen(force?)`

**dev**

- Added `bin/serve.sh` to run the eleventy in serve mode for development
- Upgraded various build tooling

## 0.2.4

Everything is new, the change log began here
