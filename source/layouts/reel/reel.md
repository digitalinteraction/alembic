---
permalink: false
tags: reelLayout
tile: /assets/tiles/reel.svg
---

**ReelLayout** places elements horizontally and ensures horizontal overflow scrolling happens.
It will show scrollbars to indicate that there is horizontally scrollable content.

If JavaScript is not available, ReelLayout will fall back to setting each element's width with the `--item-width` custom property.

| Attribute | Type           | Default   | Info                                                                  |
| --------- | -------------- | --------- | --------------------------------------------------------------------- |
| itemWidth | CSS flex-basis | auto      | Set to fix each elements width, rather than use their intrinsic width |
| space     | CSS length     | var(--s0) | The gap between each element                                          |
| height    | CSS length     | auto      | Fix height of the layout itself                                       |
| noBar     | boolean        | false     | Whether to hide the scrollbar                                         |
