import type { NavbarProps } from "../types"

/**
 * Navbar component for site navigation
 * Used in BaseLayout
 */
export function Navbar({ items, currentPath }: NavbarProps) {
    return (
        <nav className="sticky top-0 z-40 border-b border-borderColor-secondary bg-bgColor-primary backdrop-blur">
            <div className="page-shell page-shell--compact flex items-center justify-between gap-16">
                <a
                    href="/"
                    className="flex items-center gap-8 text-fgColor-primary transition-colors hover:text-fgColor-accent-primary"
                    aria-label="Afnizar Nur Ghifari home"
                >
                    <span className="chip chip--accent">AN</span>
                    <span className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm font-semibold tracking-wide uppercase">
                            Afnizar Nur
                        </span>
                        <span className="text-xs font-medium text-fgColor-secondary">
                            Product Designer & Developer
                        </span>
                    </span>
                </a>

                <ul className="flex items-center gap-12">
                    {items.map((item) => {
                        const href = item.href.startsWith("http")
                            ? item.href
                            : item.href.startsWith("/")
                              ? item.href
                              : `/${item.href}`
                        const isActive = currentPath === href
                        return (
                            <li key={item.href}>
                                <a
                                    href={href}
                                    target={item.newTab ? "_blank" : undefined}
                                    rel={item.newTab ? "noopener noreferrer" : undefined}
                                    className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}
