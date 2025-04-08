# Change log

Notable changes to Alembic are documented here

## 0.4.0

**features**

- Style description lists in labcoat
- Style figures and captions in labcoat
- Style details & summary elements in labcoat
- Add form syles to labcoat
- Support `<video>`, `<picture>` & `<svg>` elements inside a FrameLayout
- Add `justify` and `align` parameters to StackLayout
- New shorthands for scales in layouts, e.g. `s5` or `s-3` rather than `var(--s0)`
- `<input type="radio">` are now supported like checkboxes
- Links in a labcoar heading are prettier

**improvements**

- Document labcoat CSS variables
- Form inputs have their color reset to `currentColor`
- Add various GOTCHAs and NOTEs to the documentation
- Make the layout drag handles larger
- Improve the cluster-layout demo
- Add full Labcoat example page to show all features
- The labcoat "fillable" is now a nice colour

**fixes**

- labcoat only styles `<main>` elements when they have no class
- labcoat only styles `<a>` elements when they have no class
- Fix 11ty type definitions

**deprecations**

These features still work but should not be used any more.

- labcaot `aria-hidden=true` — This was a bad idea and somethings should be hidden from only screen-readers.
- `checkboxGroup` — use a `div.field` and `p.field-label` instead, hopefully this simplifies things.

## 0.3.3

Improve labcoat `pre` styles and work on documentation.

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
