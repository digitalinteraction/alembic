---
permalink: false
tags: switcherLayout
tile: /assets/tiles/switcher.svg
---

**SwitcherLayout** dynamically displays a set of columns horizontally if there is enough space or stacks them vertically if not.
It is based on a `threshold` and `limit`. All elements' widths added up must be less than the threshold to be laid out horizontally.

There is also a `limit` prop that says how many elements are allowed to display horizontally,
which is a limitation of the CSS required to create this layout.
If filled dynamically, this `limit` should be taken into consideration,
e.g. stop adding items after it has been reached.

| Attribute | Type       | Default        | Info                                                                |
| --------- | ---------- | -------------- | ------------------------------------------------------------------- |
| threshold | CSS width  | var(--measure) | The horizontal space that all elements should fit equally into      |
| space     | CSS margin | var(--s1)      | The uniform gap between each element                                |
| limit     | number     | 4              | The maximum number of elements allowed to be displayed horizontally |
