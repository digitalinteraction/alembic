---
permalink: false
tags: switcherLayout
---

**SwitcherLayout** dynamically displays a set of columns horizontally if there is enough space or stacks them vertically if not.
It is based on a `threshold` which all elements' widths added up must be less than for them to be laid out horizontally.

There is also a `limit` prop that says how many elements are allowed to display horizontally,
if exceeded all elements will always be displayed vertically.
If filled dynamically, this limit should be taken into consideration,
e.g. stop adding items after it has been reached.

| Attribute | Type       | Default        | Info                                                                |
| --------- | ---------- | -------------- | ------------------------------------------------------------------- |
| threshold | CSS width  | var(--measure) | The horizontal space that all elements should fit equally into      |
| space     | CSS margin | var(--s1)      | The uniform gap between each element                                |
| limit     | number     | 4              | The maximum number of elements allowed to be displayed horizontally |
