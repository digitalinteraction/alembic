---
permalink: false
tags: sidebarLayout
tile: /assets/tiles/sidebar.svg
---

**SidebarLayout** places two elements side-by-side if space permits it or stacks them on top of each other if not.
The sidebar can either be a set width (using `sideWidth`) or use its intrinsic width (the width of the content inside it).
The content element will fill up the rest of the horizontal space next to the sidebar.

`contentMin` controls the point at which the layout will collapse to its vertical arrangement.
For example, when set to 60% the layout will collapse when the sidebar is taking up more than 40% of the layout's width.

| Attribute  | Type           | Default   | Info                                                                                             |
| ---------- | -------------- | --------- | ------------------------------------------------------------------------------------------------ |
| side       | left\|right    | left      | Whether to put the sidebar on the left or right (in left-to-right orientation)                   |
| sideWidth  | CSS length     | null      | Set the sidebar's width to a specific length                                                     |
| contentMin | CSS percentage | 50%       | The minimum amount of the parent that the content element will fill before the layout collapses  |
| space      | CSS gap        | var(--s1) | How much empty space to put between the sidebar and content elements.                            |
| noStretch  | boolean        | false     | Keep the intrinsic height of the sidebar & content elements instead of stretching them to match. |
