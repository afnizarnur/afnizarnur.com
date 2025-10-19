import type { Metadata } from "next"
import Script from "next/script"
import { getNavigation, getSiteSettings } from "@/lib/sanity/queries"
import { NavigationBar } from "@/components/NavigationBar"
import { themeInitScript } from "@/lib/theme"
import "./styles/global.css"

export async function generateMetadata(): Promise<Metadata> {
    const siteSettings = await getSiteSettings()

    return {
        title: {
            default: siteSettings?.title || "Afnizar Nur Ghifari",
            template: `%s | ${siteSettings?.title || "Afnizar Nur Ghifari"}`,
        },
        description: siteSettings?.description || "",
        openGraph: {
            type: "website",
            locale: "en_US",
            url: siteSettings?.url || "https://afnizarnur.com",
            siteName: siteSettings?.title || "Afnizar Nur Ghifari",
            images: siteSettings?.ogImage
                ? [
                      {
                          url: siteSettings.ogImage,
                          width: 1200,
                          height: 630,
                          alt: siteSettings?.title || "Afnizar Nur Ghifari",
                      },
                  ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            creator: siteSettings?.social?.twitter ? `@${siteSettings.social.twitter}` : undefined,
        },
        icons: {
            icon: "/favicon.svg",
        },
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}): Promise<JSX.Element> {
    const navigation = await getNavigation()
    const siteSettings = await getSiteSettings()

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Theme initialization script - runs early to prevent FOUC */}
                <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitScript }} />

                {/* Preload critical fonts */}
                <link rel="preload" href="/fonts/Fonetika-Medium-Trial.woff2" as="font" type="font/woff2" crossOrigin="" />
                <link rel="preload" href="/fonts/Fonetika-Regular-Trial.woff2" as="font" type="font/woff2" crossOrigin="" />
            </head>
            <body className="min-h-screen flex flex-col bg-background-primary text-text-primary">
                {navigation && (
                    <NavigationBar
                        items={navigation.items}
                        logo={siteSettings?.logo}
                        timezone={siteSettings?.timezone}
                    />
                )}

                <main className="flex-grow">{children}</main>
            </body>
        </html>
    )
}
