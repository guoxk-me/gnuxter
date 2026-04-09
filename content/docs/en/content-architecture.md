---
title: Content architecture
description: See how docs, blog, and changelog content are mirrored across English and Chinese routes.
locale: en
draft: false
publishedAt: 2026-04-09
updatedAt: 2026-04-09
tags:
  - architecture
  - bilingual
category: foundation
author: system
featured: false
readingTime: 5 min read
navigation: true
order: 2
---

## Route strategy

At the content layer, the route structure is already mirrored:

- English docs: `/docs/*`
- Chinese docs: `/zh/docs/*`
- English blog: `/blog/*`
- Chinese blog: `/zh/blog/*`

This works before a full i18n module is introduced.

## Why this helps

By treating English and Chinese as separate prefixed content sources, you get:

- predictable URLs
- explicit authoring boundaries
- easier migration to route localization later

## File layout

```text
content/
  docs/
    en/
    zh/
  blog/
    en/
    zh/
  changelog/
    en/
    zh/
```
