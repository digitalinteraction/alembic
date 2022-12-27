# Change log

Notable changes to Alembic are documented here

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
