---
title: 内容结构设计
description: 查看文档、博客与更新日志如何在英文默认路径和中文镜像路径之间对应。
locale: zh
draft: false
publishedAt: 2026-04-09
updatedAt: 2026-04-09
tags:
  - architecture
  - bilingual
category: foundation
author: system
featured: false
readingTime: 5 分钟
navigation: true
order: 2
---

## 路由策略

当前内容层已经完成了基础镜像：

- 英文文档：`/docs/*`
- 中文文档：`/zh/docs/*`
- 英文博客：`/blog/*`
- 中文博客：`/zh/blog/*`

这样做的好处是，即使还没正式接入 i18n，也能先把内容路径稳定下来。

## 为什么这样更适合模板

把中英文内容源拆开后，可以得到：

- 更稳定的 URL 结构
- 更清晰的内容边界
- 后面迁移到正式国际化路由时更容易接上

## 推荐目录

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
