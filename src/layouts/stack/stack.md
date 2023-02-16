---
permalink: false
tags: stackLayout
tile: /assets/tiles/stack.svg
---

**StackLayout** places elements vertically and adds empty space between them.
You can nest multiple StackLayouts with different spacing.

Use `em` units to create a "flow" layout where spacing is relative to the font size of the elements.
This works well with html content, so a `<h1>` has more space above it than a `<p>` element.

| Attribute | Type       | Default   | Info                                            |
| --------- | ---------- | --------- | ----------------------------------------------- |
| space     | CSS margin | var(--s1) | How much whitespace to put between each element |
