---
layout: markdown.njk
title: Style guide
strapline: Conventions and patterns used for development
tags:
  - development
---

Alembic is written in TypeScript and CSS, follow [the Structure]({{ '/development/structure' | url }}) for where to put things.

General rules:

- Everything is ESM
- Group things by module
- Keep related things together, i.e. docs + css + js + tests all in one place
- Data-driven documentation, the less hard-coded links the better
- Favour readability over completeness or correctness, people have to read code
- Use JSDoc for public TypeScript code, this is pulled into [api]({{ '/development/api' | url }})
- Unit tested is desirable
- Opt for more-functional styles of coding, but maintain readability
- No "index.js" magic files
- Import code with extensions
