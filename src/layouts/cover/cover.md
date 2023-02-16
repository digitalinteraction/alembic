---
permalink: false
tags: coverLayout
tile: /assets/tiles/cover.svg
---

**CoverLayout** fills a minimum vertical height and centers a principle element vertically.
It places accessory elements above or below which keep their intrinsic height.
The principle element is a `h1` unless `centered` is set.

| Attribute | Type         | Default   | Info                                                         |
| --------- | ------------ | --------- | ------------------------------------------------------------ |
| centered  | CSS selector | h1        | A CSS selector for the principle element                     |
| space     | CSS margin   | var(--s1) | The minimum space between all laid-out elements              |
| minHeight | CSS length   | 100vh     | The minimum block-size (height) for the entire layout        |
| noPad     | boolean      | false     | Whether the spacing should also pad the inside of the layout |
