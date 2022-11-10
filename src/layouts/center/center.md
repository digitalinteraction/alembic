---
permalink: false
tags: centerLayout
tile: /assets/tiles/center.svg
---

**CenterLayout** ensures an element is centered horizontally in its parent.
It makes sure the element is at most `max` width by adding spacing at either side.
Add `gutters` too to apply a padding outside of the `max` width.
Use the `intrinsic` prop to use the actual width of the laid-out element,
while it is less than `max`

| Attribute | Type       | Default        | Info                                                                           |
| --------- | ---------- | -------------- | ------------------------------------------------------------------------------ |
| max       | CSS length | var(--measure) | The maximum horizontal width of the laid-out element                           |
| gutters   | CSS length | 0              | How much horizontal empty space to add to either side of the laid-out element  |
| intrinsic | boolean    | false          | Turn on to use the width of the laid-out element itself, rather than the `max` |
