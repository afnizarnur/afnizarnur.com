import { defineType } from "sanity"

export default defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required().max(100),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            options: {
                rows: 3,
            },
            validation: (Rule: any) => Rule.required().min(50).max(200),
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            of: [{ type: "block" }, { type: "image" }],
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "tag" }],
                },
            ],
        },
        {
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string",
                },
            ],
        },
        {
            name: "seo",
            title: "SEO",
            type: "object",
            fields: [
                {
                    name: "title",
                    title: "Title",
                    type: "string",
                },
                {
                    name: "description",
                    title: "Description",
                    type: "text",
                },
                {
                    name: "keywords",
                    title: "Keywords",
                    type: "string",
                },
            ],
        },
    ],
})
