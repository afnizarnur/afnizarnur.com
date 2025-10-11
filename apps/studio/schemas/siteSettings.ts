import { defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(10).max(60),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      options: {
        rows: 3,
      },
      validation: (Rule: any) => Rule.required().min(50).max(160),
    },
    {
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule: any) =>
        Rule.uri({
          scheme: ['https'],
        }),
    },
    {
      name: 'social',
      title: 'Social',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'string',
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'string',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
      ],
    },
  ],
})
