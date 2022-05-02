---
permalink: false
tags: reelLayout
---

**ReelLayout** places elements horizontally with a set `space` between them and ensures overflow scrolling happens.
Unless `noBar` is set, the ReelLayout will show scrollbars to indicate that there is horizontally scrollable content.

Use the `height` prop to force all laid-out elements to be a set height,
otherwise it will use the elements' intrinsic height.
Set `itemWidth` to force a width on all elements instead of using their intrinsic width.

| Attribute | Type           | Default   | Info                            |
| --------- | -------------- | --------- | ------------------------------- |
| itemWidth | CSS flex-basis | auto      | Set to fix each elements width  |
| space     | CSS length     | var(--s0) | The space between each element  |
| height    | CSS length     | auto      | The height of the layout itself |
| noBar     | boolean        | false     | Whether to hide the scrollbar   |
