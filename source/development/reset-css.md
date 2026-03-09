---
layout: markdown.njk
title: Reset CSS
strapline: What the reset does and how to work with it
tags:
  - development
---

The CSS reset normalises some elements and sets up other things for best practice.
It:

- Makes everything `border-sizing: border-box` for consistency
- Removes browser's margins on most elements, except lists
- It removes list styles when `role="list"` is set. Add this attribute your markup when adding a class to style a list to remove the `list-style` and use a class to style it more.
- Makes the body fill the viewport vertically
- Makes images size more reliable
- Sets up a nice line-height for text and a shorter one for headings
- Make sure links have underlines by default (unless a class is applied)
- Forces inputs and buttons to inherit their font from the document
- Makes the textarea bigger by default, i.e. distinguishable from a text input
- Make interactive elements use the body's font, rather than a system one
