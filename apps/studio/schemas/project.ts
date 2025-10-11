import { defineType } from "sanity"

export default defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required().max(80),
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
            name: "description",
            title: "Description",
            type: "text",
            options: {
                rows: 3,
            },
            validation: (Rule: any) => Rule.required().min(50).max(150),
        },
        {
            name: "role",
            title: "Role",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
            validation: (Rule: any) => Rule.required().min(1),
        },
        {
            name: "selected",
            title: "Selected",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "gallery",
            title: "Gallery",
            type: "array",
            of: [
                {
                    type: "image",
                    fields: [
                        {
                            name: "alt",
                            title: "Alt",
                            type: "string",
                        },
                    ],
                },
            ],
            validation: (Rule: any) => Rule.max(10),
        },
        {
            name: "links",
            title: "Links",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "link",
                    fields: [
                        {
                            name: "label",
                            title: "Label",
                            type: "string",
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "url",
                        },
                    ],
                },
            ],
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            of: [{ type: "block" }, { type: "image" }],
        },
        {
            name: "technologies",
            title: "Technologies",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        },
        {
            name: "year",
            title: "Year",
            type: "number",
            validation: (Rule: any) => Rule.min(2000).max(new Date().getFullYear() + 1),
        },
        {
            name: "client",
            title: "Client",
            type: "string",
            validation: (Rule: any) => Rule.max(80),
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
