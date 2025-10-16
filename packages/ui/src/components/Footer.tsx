import type { FooterProps } from "../types"

/**
 * Footer component with navigation and social links
 * Used in BaseLayout
 */
export function Footer({ navigationItems, socialLinks }: FooterProps) {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-borderColor-secondary bg-bgColor-primary">
            <div className="page-shell">
                <div className="grid gap-32 md:grid-cols-[2fr_1fr_1fr]">
                    <div className="space-y-12">
                        <span className="chip chip--accent">Let&apos;s collaborate</span>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-fgColor-primary">
                                Afnizar Nur Ghifari
                            </h3>
                            <p className="text-fgColor-secondary">
                                Product designer and developer crafting intentional experiences for
                                digital products and design systems.
                            </p>
                        </div>
                    </div>

                    {navigationItems && navigationItems.length > 0 && (
                        <div className="space-y-12">
                            <h4 className="text-sm font-semibold uppercase tracking-wide text-fgColor-tertiary">
                                Navigate
                            </h4>
                            <ul className="grid gap-8">
                                {navigationItems.map((item) => {
                                    const href = item.href.startsWith("http")
                                        ? item.href
                                        : item.href.startsWith("/")
                                          ? item.href
                                          : `/${item.href}`
                                    return (
                                        <li key={item.href}>
                                            <a
                                                href={href}
                                                target={item.newTab ? "_blank" : undefined}
                                                rel={
                                                    item.newTab ? "noopener noreferrer" : undefined
                                                }
                                                className="footer-link"
                                            >
                                                {item.title}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}

                    {socialLinks && (
                        <div className="space-y-12">
                            <h4 className="text-sm font-semibold uppercase tracking-wide text-fgColor-tertiary">
                                Connect
                            </h4>
                            <ul className="grid gap-8">
                                {socialLinks.twitter && (
                                    <li>
                                        <a
                                            href={`https://twitter.com/${socialLinks.twitter}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="footer-link"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                )}
                                {socialLinks.github && (
                                    <li>
                                        <a
                                            href={`https://github.com/${socialLinks.github}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="footer-link"
                                        >
                                            GitHub
                                        </a>
                                    </li>
                                )}
                                {socialLinks.linkedin && (
                                    <li>
                                        <a
                                            href={socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="footer-link"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                )}
                                {socialLinks.email && (
                                    <li>
                                        <a href={`mailto:${socialLinks.email}`} className="footer-link">
                                            Email
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="mt-48 flex flex-col gap-16 border-t border-borderColor-secondary pt-24 text-sm text-fgColor-tertiary md:flex-row md:items-center md:justify-between">
                    <p>© {currentYear} Afnizar Nur Ghifari. All rights reserved.</p>
                    <p>
                        Built with care using Astro, Sanity, and a custom design system powered by
                        tokens.
                    </p>
                </div>
            </div>
        </footer>
    )
}
