"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { NavigationItem } from "@afnizarnur/ui"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TerminalTextEffect } from "./TerminalTextEffect"

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

export function MobileMenu({ items }: MobileMenuProps): React.ReactElement {
    const [isOpen, setIsOpen] = useState(false)
    const [triggerAnimation, setTriggerAnimation] = useState(0)
    const pathname = usePathname()
    const menuPanelRef = useRef<HTMLDivElement>(null)
    const closeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

    const closeMenu = useCallback((): void => {
        setIsOpen(false)
        closeTimeoutRef.current = setTimeout(() => {
            const hamburgerBtn = document.getElementById(
                "hamburger-menu-button"
            ) as HTMLButtonElement | null
            hamburgerBtn?.focus()
        }, 300)
    }, [])

    const handleToggle = useCallback((): void => {
        setIsOpen((prev) => !prev)
    }, [])

    // Handle menu toggle - only run once on mount
    useEffect(() => {
        const hamburgerBtn = document.getElementById("hamburger-menu-button")

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener("click", handleToggle)
        }

        return () => {
            if (hamburgerBtn) {
                hamburgerBtn.removeEventListener("click", handleToggle)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Handle menu state changes
    useEffect(() => {
        const hamburgerBtn = document.getElementById("hamburger-menu-button")

        if (hamburgerBtn) {
            hamburgerBtn.setAttribute("aria-expanded", String(isOpen))
            hamburgerBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu")
            hamburgerBtn.setAttribute("data-menu-open", String(isOpen))
        }

        if (isOpen) {
            // Prevent body scroll
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${scrollbarWidth}px`

            // Trigger animation when menu opens
            setTriggerAnimation(prev => prev + 1)

            // Focus trap - focus first focusable element
            const firstFocusable = menuPanelRef.current?.querySelector<HTMLElement>(
                'a[href], button:not([disabled])'
            )
            firstFocusable?.focus()

            const handleEscape = (e: KeyboardEvent): void => {
                if (e.key === "Escape") {
                    e.preventDefault()
                    closeMenu()
                }
            }

            document.addEventListener("keydown", handleEscape)
            return () => {
                document.body.style.overflow = ""
                document.body.style.paddingRight = ""
                document.removeEventListener("keydown", handleEscape)
            }
        }
    }, [isOpen, closeMenu])

    // Close menu on route change - use ref to track previous pathname
    const prevPathnameRef = useRef(pathname)

    useEffect(() => {
        if (prevPathnameRef.current !== pathname && isOpen) {
            closeMenu()
        }
        prevPathnameRef.current = pathname
    }, [pathname, isOpen, closeMenu])

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current)
            }
        }
    }, [])

    return (
        <div
            id="mobile-menu-overlay"
            className={`fixed inset-0 z-50 lg:hidden ${!isOpen ? "pointer-events-none" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            aria-hidden={!isOpen}
            style={{
                top: "var(--navbar-height, 66px)",
                visibility: isOpen ? "visible" : "hidden",
            }}
        >
            {/* Backdrop */}
            <div
                onClick={closeMenu}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        closeMenu()
                    }
                }}
                className={`absolute inset-0 bg-background-inverse/70 backdrop-blur-sm transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`}
                aria-hidden="true"
                role="button"
                tabIndex={-1}
            />

            {/* Menu Panel */}
            <div
                ref={menuPanelRef}
                className={`fixed left-0 right-0 bottom-0 w-screen bg-background-primary overflow-y-auto transform transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-full"} shadow-lg`}
                role="navigation"
                aria-label="Primary navigation"
                style={{
                    top: "var(--navbar-height, 66px)",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                }}
            >
                {/* Hidden title for screen readers */}
                <h2 id="mobile-menu-title" className="sr-only">
                    Navigation menu
                </h2>
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
                                    <TerminalTextEffect
                                        className="text-heading-1"
                                        effect="cursor"
                                        triggerAnimation={triggerAnimation}
                                    >
                                        {item.title}
                                    </TerminalTextEffect>
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

                            const linkClassName = `group p-24 flex items-center justify-start py-spacing-32 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-primary bg-background-primary ${isActive
                                ? "text-text-primary"
                                : "text-text-secondary hover:text-text-primary active:text-text-primary"
                                }`

                            return (
                                <li key={item.href} className="grid border-b border-border-tertiary" style={{ gridTemplateColumns: isEven ? "1fr 20%" : "20% 1fr" }}>
                                    {/* Striped box - alternates left/right */}
                                    <div
                                        className={`border-border-tertiary overflow-hidden bg-background-primary ${isEven ? "order-2 border-l" : "order-1 border-r"}`}
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(-40deg, rgba(0,0,0,0.06) 0 8px, transparent 0px 20px)",
                                            backgroundRepeat: "repeat-y",
                                        }}
                                        aria-hidden="true"
                                    />

                                    {/* Menu content */}
                                    <div className={isEven ? "order-1" : "order-2"}>
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
