"use client"

import { useEffect, useState } from "react"
import { X } from "@phosphor-icons/react"
import type { NavigationItem } from "@afnizarnur/ui"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MobileMenuProps {
    items: NavigationItem[]
}

function normalizeHref(href: string): string {
    if (href.startsWith("http")) {
        return href
    }
    return href.startsWith("/") ? href : `/${href}`
}

function isNavItemActive(itemHref: string, path: string): boolean {
    const normalizedHref = normalizeHref(itemHref)
    return path === normalizedHref
}

export function MobileMenu({ items }: MobileMenuProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const hamburgerBtn = document.getElementById("hamburger-menu-button")

        const handleToggle = (): void => {
            setIsOpen((prev) => !prev)
        }

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener("click", handleToggle)
            return () => hamburgerBtn.removeEventListener("click", handleToggle)
        }
    }, [])

    useEffect(() => {
        const hamburgerBtn = document.getElementById("hamburger-menu-button")

        if (hamburgerBtn) {
            // Update button attributes and icon
            hamburgerBtn.setAttribute("aria-expanded", String(isOpen))
            hamburgerBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu")
            hamburgerBtn.setAttribute("data-menu-open", String(isOpen))
        }

        if (isOpen) {
            document.body.style.overflow = "hidden"

            const handleEscape = (e: KeyboardEvent): void => {
                if (e.key === "Escape") {
                    e.preventDefault()
                    closeMenu()
                }
            }

            document.addEventListener("keydown", handleEscape)
            return () => {
                document.body.style.overflow = ""
                document.removeEventListener("keydown", handleEscape)
            }
        }
    }, [isOpen])

    const closeMenu = (): void => {
        setIsOpen(false)
        setTimeout(() => {
            const hamburgerBtn = document.getElementById(
                "hamburger-menu-button"
            ) as HTMLButtonElement | null
            hamburgerBtn?.focus()
        }, 300)
    }

    return (
        <div
            id="mobile-menu-overlay"
            className={`fixed inset-0 z-50 lg:hidden ${!isOpen ? "hidden" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            aria-hidden={!isOpen}
            style={{
                top: "var(--navbar-height, 66px)",
            }}
        >
            {/* Backdrop */}
            <div
                onClick={closeMenu}
                className={`absolute inset-0 bg-background-inverse/70 backdrop-blur-sm transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                aria-hidden="true"
            />

            {/* Menu Panel */}
            <div
                className={`fixed left-0 right-0 bottom-0 w-screen bg-background-primary overflow-y-auto transform transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-full"
                    } shadow-lg`}
                role="navigation"
                aria-label="Primary navigation"
                style={{
                    top: "var(--navbar-height, 66px)",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                }}
            >
                {/* Navigation Links */}
                <nav className="py-spacing-24" aria-label="Main menu items">
                    <ul className="flex flex-col list-none p-0 m-0">
                        {items.map((item, index) => {
                            const href = normalizeHref(item.href)
                            const isActive = isNavItemActive(item.href, pathname)
                            const isExternal = item.newTab || href.startsWith("http")
                            const isEven = index % 2 === 0

                            const linkContent = (
                                <>
                                    <span className="text-heading-1">{item.title}</span>
                                    {item.newTab && (
                                        <span
                                            className="text-icon-tertiary group-hover:text-icon-secondary transition-colors duration-150 text-xs"
                                            aria-label="Opens in new window"
                                            title="Opens in new window"
                                        >
                                            ↗
                                        </span>
                                    )}
                                </>
                            )

                            const linkClassName = `group p-24 flex items-center justify-start py-spacing-32 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-text-primary bg-background-primary ${isActive
                                ? "text-text-primary"
                                : "text-text-secondary hover:text-text-primary active:text-text-primary"
                                }`

                            return (
                                <li key={item.href} className="grid border-b border-border-tertiary" style={{ gridTemplateColumns: isEven ? "1fr 20%" : "20% 1fr" }}>
                                    {/* Striped box - alternates left/right */}
                                    <div
                                        className={`overflow-hidden bg-background-primary ${isEven ? "order-2" : "order-1"}`}
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(-40deg, rgba(0,0,0,0.06) 0 8px, transparent 0px 20px)",
                                            backgroundRepeat: "repeat-y",
                                        }}
                                    />

                                    {/* Menu content */}
                                    <div className={` ${isEven ? "order-1" : "order-2"}`}>
                                        {isExternal ? (
                                            <a
                                                href={href}
                                                target={item.newTab ? "_blank" : undefined}
                                                rel={item.newTab ? "noopener noreferrer" : undefined}
                                                className={linkClassName}
                                                aria-current={isActive ? "page" : undefined}
                                                onClick={!item.newTab ? closeMenu : undefined}
                                            >
                                                {linkContent}
                                            </a>
                                        ) : (
                                            <Link
                                                href={href}
                                                className={linkClassName}
                                                aria-current={isActive ? "page" : undefined}
                                                onClick={closeMenu}
                                            >
                                                {linkContent}
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Bottom Spacing */}
                <div className="h-spacing-24" />
            </div>
        </div>
    )
}
