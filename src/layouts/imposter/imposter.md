---
permalink: false
tags: imposterLayout
---

**ImposterLayout** positions an element over other elements.
The positioned element is vertically and horizontally centered in it's nearest positioned parent and will not exceed it's height or width, unless `breakout` is set.
You can fix it to the viewport instead with `fixed`.
The width of the element is 50% of the positioned parent unless overridden in CSS,
it is setup to not exceed 100% of the parent's height or width.

| Attribute | Type       | Default | Info                                                                                              |
| --------- | ---------- | ------- | ------------------------------------------------------------------------------------------------- |
| breakout  | boolean    | false   | Whether the imposter is allowed to be larger that its positioned parent.                          |
| margin    | CSS length | 0px     | The minimum space between the element and its positioning container (when `breakout` isn't used). |
| fixed     | boolean    | false   | Whether to fix the element to the viewport instead (i.e. `position: fixed`).                      |
