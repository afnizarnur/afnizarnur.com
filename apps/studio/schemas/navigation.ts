import { defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'href',
              title: 'Href',
              type: 'string',
            },
            {
              name: 'newTab',
              title: 'New Tab',
              type: 'boolean',
            },
          ],
        },
      ],
    },
  ],
})
