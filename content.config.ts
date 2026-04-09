import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const localizedPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  locale: z.enum(['en', 'zh']),
  draft: z.boolean().default(false),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  author: z.string().optional(),
  featured: z.boolean().default(false),
  readingTime: z.string().optional()
})

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: [
        { include: 'docs/en/**/*.md', prefix: '/docs' },
        { include: 'docs/zh/**/*.md', prefix: '/zh/docs' }
      ],
      schema: localizedPageSchema.extend({
        navigation: z.boolean().default(true),
        order: z.number().default(0)
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: [
        { include: 'blog/en/**/*.md', prefix: '/blog' },
        { include: 'blog/zh/**/*.md', prefix: '/zh/blog' }
      ],
      schema: localizedPageSchema.extend({
        publishedAt: z.string(),
        readingTime: z.string().default('5 min read')
      })
    }),
    changelog: defineCollection({
      type: 'page',
      source: [
        { include: 'changelog/en/**/*.md', prefix: '/changelog' },
        { include: 'changelog/zh/**/*.md', prefix: '/zh/changelog' }
      ],
      schema: localizedPageSchema.extend({
        version: z.string()
      })
    }),
    authors: defineCollection({
      type: 'data',
      source: 'authors/*.yml',
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        title: z.string(),
        bio: z.string(),
        avatar: z.string(),
        socials: z
          .object({
            github: z.string().optional(),
            x: z.string().optional(),
            website: z.string().optional()
          })
          .optional()
      })
    })
  }
})
