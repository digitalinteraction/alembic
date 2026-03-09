---
permalink: false
tags: gridLayout
tile: /assets/tiles/grid.svg
---

**GridLayout** creates a responsive grid of same-sized elements.
Elements will grow horizontally until another element will fit on the same row.
"Ghost" elements are added on the last row to ensure the last cells aren't stretched.
Useful for pages like grids of people or projects.

| Attribute | Type       | Default   | Info                                   |
| --------- | ---------- | --------- | -------------------------------------- |
| min       | CSS length | 250px     | The minimum width of each cell         |
| space     | CSS gap    | var(--s1) | How much empty space between each cell |
