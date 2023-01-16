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
- It removes list styles when `role="list"` is set, set this when adding a class to style a list
- Add smooth scrolling when appropriate
- Makes the body fill the viewport vertically
- Makes images size more reliable
- Forces inputs and buttons to inherit their font from the document
- Removes any animations or smooth scrolling when the user requests it
