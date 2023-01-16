---
layout: markdown.njk
title: Single Page Applications
tags:
  - install
---

{% from 'macros.njk' import apiDoc %}

Alembic is designed to be compiled up-front to reduce client-side JavaScript but you can still use it in JavaScript-based single page apps. Your framework will probably come with a bundler to use with it so this guide will cover a few.

## Contents

- [Set up](#set-up)
- [Vite](#vite)
- [Parcel](#parcel)
- [DIY?](#diy)

---

{% include 'install.njk' %}

## Set up

Your bundler should pick up an import to Alembic assets and process the code it its own way, .e.g to minify or optimise. These are the files you can import:

- `@openlab/alembic` (same as **module.js**)
- `@openlab/alembic/module.js`
- `@openlab/alembic/reset.css`
- `@openlab/alembic/everything.js`
- `@openlab/alembic/everything.css`
- `@openlab/alembic/tools.js`

> It's worth noting that Alembic only supports **ESM**.

## Vite

## Parcel

## DIY
