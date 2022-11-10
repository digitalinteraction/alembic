---
permalink: false
tags: gridLayout
tile: /assets/tiles/grid.svg
---

**GridLayout** creates a responsive CSS Grid where each element has the same `min`(imum) width.
Element start at the minimum width and grow proportionally until there is space for another element,
at which point the element moves up and it restarts.
If there are no more elements to bring up into a row, a "ghost" element is added and it resets again.

GridLayout is suited for lists of same-sized content that are to be displayed at roughly the same size.
For example, a set of cards showing people on a website.
It avoids the last-row stretching of some Flexbox implementations.

| Attribute | Type       | Default   | Info                                   |
| --------- | ---------- | --------- | -------------------------------------- |
| min       | CSS length | 250px     | The minimum width of each cell         |
| space     | CSS gap    | var(--s1) | How much empty space between each cell |
