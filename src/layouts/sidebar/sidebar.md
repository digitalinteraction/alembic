---
permalink: false
tags: sidebarLayout
tile: /assets/tiles/sidebar.svg
---

**SidebarLayout** places two elements side-by-side if space permits it or stacks them on top of each other if not.
The `side` element will be it's intrinsic size and the `content` element will grow or shrink to fit.
The elements are stacked when the ratio falls below a certain percentage.
By default if the `content` element is less that 50% of the whole width, the elements will be stacked vertically instead.

> **note** — the side element should have a CSS width or max-width, otherwise use `sideWidth`

| Attribute  | Type           | Default   | Info                                                                                             |
| ---------- | -------------- | --------- | ------------------------------------------------------------------------------------------------ |
| side       | left\|right    | left      | Whether to put the sidebar on the left or right (in left-to-right orientation)                   |
| sideWidth  | CSS length     | null      | Set the sidebar to be a specific width                                                           |
| contentMin | CSS percentage | 50%       | Change the ratio for when the elements will be stacked vertically                                |
| space      | CSS gap        | var(--s1) | How much space to put between the sidebar and content elements                                   |
| noStretch  | boolean        | false     | Keep the intrinsic height of the sidebar & content elements instead of stretching them to match. |
