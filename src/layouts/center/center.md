---
permalink: false
tags: centerLayout
tile: /assets/tiles/center.svg
---

**CenterLayout** ensures an element is centered horizontally with a minimum width.
It can have `gutters` to apply a padding outside of the element so it's children can pop out, like images in a blog post.
If it is `intrinsic`, the element will be its own width, while it is less than `max`.

| Attribute | Type       | Default        | Info                                                                           |
| --------- | ---------- | -------------- | ------------------------------------------------------------------------------ |
| max       | CSS length | var(--measure) | The maximum horizontal width of the laid-out element                           |
| gutters   | CSS length | 0              | How much horizontal empty space to add to either side of the laid-out element  |
| intrinsic | boolean    | false          | Turn on to use the width of the laid-out element itself, rather than the `max` |

- **GOTCHA** — a `center-layout` doesn't work inside a `stack-layout`, try putting an element between them. e.g. `stack-layout > section > center-layout`
