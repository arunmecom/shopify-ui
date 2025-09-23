import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: 'Brief description of the post',
      rows: 3,
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'readingTime',
      type: 'string',
      title: 'Reading Time',
      description: 'Estimated reading time (e.g., "5 min read")',
      initialValue: '5 min read',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      excerpt: 'excerpt',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author, excerpt} = selection
      return {...selection, subtitle: author && `by ${author}${excerpt ? ` • ${excerpt}` : ''}`}
    },
  },
})
