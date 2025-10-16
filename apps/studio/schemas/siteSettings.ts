import { defineType } from "sanity"

export default defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        {
            name: "logo",
            title: "Logo",
            type: "object",
            description: "Logo to display in navbar (image or text)",
            fields: [
                {
                    name: "type",
                    title: "Logo Type",
                    type: "string",
                    options: {
                        list: [
                            { title: "Text", value: "text" },
                            { title: "Image", value: "image" },
                        ],
                    },
                    validation: (Rule: any) => Rule.required(),
                    initialValue: "text",
                },
                {
                    name: "image",
                    title: "Logo Image",
                    type: "image",
                    description: "Upload image (24x24px recommended, will have full border-radius)",
                    hidden: ({ parent }: any) => parent?.type !== "image",
                    fields: [
                        {
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
                {
                    name: "text",
                    title: "Logo Text",
                    type: "string",
                    description: "Text to display as logo",
                    hidden: ({ parent }: any) => parent?.type !== "text",
                    validation: (Rule: any) =>
                        Rule.custom((value: string, context: any) => {
                            if (context.parent?.type === "text" && !value) {
                                return "Logo text is required when type is text"
                            }
                            return true
                        }),
                },
            ],
        },
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required().min(10).max(60),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            options: {
                rows: 3,
            },
            validation: (Rule: any) => Rule.required().min(50).max(160),
        },
        {
            name: "ogImage",
            title: "OG Image",
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
            name: "url",
            title: "URL",
            type: "url",
            validation: (Rule: any) =>
                Rule.uri({
                    scheme: ["https"],
                }),
        },
        {
            name: "social",
            title: "Social",
            type: "object",
            fields: [
                {
                    name: "twitter",
                    title: "Twitter",
                    type: "string",
                },
                {
                    name: "github",
                    title: "GitHub",
                    type: "string",
                },
                {
                    name: "linkedin",
                    title: "LinkedIn",
                    type: "string",
                },
                {
                    name: "email",
                    title: "Email",
                    type: "string",
                },
            ],
        },
        {
            name: "timezone",
            title: "Timezone",
            type: "object",
            description: "Configure the timezone and location display",
            fields: [
                {
                    name: "timeZone",
                    title: "Time Zone (IANA)",
                    type: "string",
                    description: "IANA timezone identifier (e.g., 'Asia/Jakarta', 'America/New_York')",
                    validation: (Rule: any) => Rule.required(),
                },
                {
                    name: "displayLabel",
                    title: "Display Label",
                    type: "string",
                    description: "Text to display next to the time (e.g., 'Jakarta', 'Indonesia', 'CGK')",
                    validation: (Rule: any) => Rule.required(),
                },
            ],
        },
    ],
})
