---
permalink: false
tags: coverLayout
tile: /assets/tiles/cover.svg
---

**CoverLayout** fills a minimum vertical height and centers a principle element vertically within that layout.
It places accessory elements above/below which keep their intrinsic height.
By default a nested "h1" element is the principle element,
set `centered` to a CSS selector for an alternate principle element.

| Attribute | Type         | Default   | Info                                                         |
| --------- | ------------ | --------- | ------------------------------------------------------------ |
| centered  | CSS selector | h1        | A selector for the element to be centered                    |
| space     | CSS margin   | var(--s1) | The minimum space between all laid-out elements              |
| minHeight | CSS length   | 100vh     | The minimum block-size (height) for the entire layout        |
| noPad     | boolean      | false     | Whether the spacing should also pad the inside of the layout |
