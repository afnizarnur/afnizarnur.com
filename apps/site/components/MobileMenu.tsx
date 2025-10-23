"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { NavigationItem } from "@afnizarnur/ui"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GearSixIcon } from "@phosphor-icons/react"
import { IconButton } from "./IconButton"
import { TerminalTextEffect } from "./TerminalTextEffect"

interface MobileMenuProps {
    items: NavigationItem[]
    timezone?: {
        timeZone?: string
        displayLabel?: string
    }
    isOpen?: boolean
    onToggle?: () => void
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

function getFormattedTime(tzConfig?: { timeZone?: string; displayLabel?: string }): string {
    const now = new Date()

    const baseOptions = {
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        hour12: true,
    }

    let formatter: Intl.DateTimeFormat

    if (tzConfig?.timeZone) {
        try {
            formatter = new Intl.DateTimeFormat("en-US", {
                ...baseOptions,
                timeZone: tzConfig.timeZone,
            })
        } catch {
            console.warn(
                `Invalid timezone "${tzConfig.timeZone}", falling back to browser timezone`
            )
            formatter = new Intl.DateTimeFormat("en-US", baseOptions)
        }
    } else {
        formatter = new Intl.DateTimeFormat("en-US", baseOptions)
    }

    const parts = formatter.formatToParts(now)

    const hourPart = parts.find((p) => p.type === "hour")?.value || "00"
    const minutePart = parts.find((p) => p.type === "minute")?.value || "00"
    const periodPart = parts.find((p) => p.type === "dayPeriod")?.value || "AM"

    const displayLabel = tzConfig?.displayLabel || "ID"

    return `${displayLabel} ${hourPart}:${minutePart}_${periodPart}`
}

function TimeDisplay({
    timezone,
}: {
    timezone?: { timeZone?: string; displayLabel?: string }
}): JSX.Element {
    const [timeString, setTimeString] = useState<string>(() => {
        return getFormattedTime(timezone)
    })

    useEffect(() => {
        setTimeString(getFormattedTime(timezone))

        const interval = setInterval(() => {
            setTimeString(getFormattedTime(timezone))
        }, 60000)

        return () => clearInterval(interval)
    }, [timezone])

    return (
        <time
            className="text-eyebrow-1 text-text-secondary"
            dateTime={new Date().toISOString()}
            suppressHydrationWarning
        >
            {timeString}
        </time>
    )
}

export function MobileMenu({
    items,
    timezone,
    isOpen: externalIsOpen,
    onToggle: externalOnToggle,
}: MobileMenuProps): React.ReactElement {
    const [internalIsOpen, setInternalIsOpen] = useState(false)
    const [triggerAnimation, setTriggerAnimation] = useState(0)
    const pathname = usePathname()
    const menuPanelRef = useRef<HTMLDivElement>(null)
    const closeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
    const firstFocusableRef = useRef<HTMLElement | null>(null)
    const lastFocusableRef = useRef<HTMLElement | null>(null)

    // Use external state if provided, otherwise use internal state
    const isOpen = externalIsOpen ?? internalIsOpen
    const setIsOpen = externalOnToggle ? () => externalOnToggle() : setInternalIsOpen

    const closeMenu = useCallback((): void => {
        if (externalOnToggle) {
            externalOnToggle()
        } else {
            setInternalIsOpen(false)
        }
        closeTimeoutRef.current = setTimeout(() => {
            const hamburgerBtn = document.getElementById(
                "hamburger-menu-button"
            ) as HTMLButtonElement | null
            hamburgerBtn?.focus()
        }, 300)
    }, [externalOnToggle])

    // Sync with external hamburger button if no external control
    useEffect(() => {
        if (externalIsOpen !== undefined) return

        const hamburgerBtn = document.getElementById("hamburger-menu-button")

        if (hamburgerBtn) {
            const clickHandler = () => setInternalIsOpen((prev) => !prev)
            hamburgerBtn.addEventListener("click", clickHandler)

            return () => {
                hamburgerBtn.removeEventListener("click", clickHandler)
            }
        }
    }, [externalIsOpen])

    // Handle menu state changes
    useEffect(() => {
        const hamburgerBtn = document.getElementById("hamburger-menu-button")

        if (hamburgerBtn) {
            hamburgerBtn.setAttribute("aria-expanded", String(isOpen))
            hamburgerBtn.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            )
            hamburgerBtn.setAttribute("data-menu-open", String(isOpen))
        }

        if (isOpen) {
            // Prevent body scroll
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${scrollbarWidth}px`

            // Trigger animation when menu opens
            setTriggerAnimation((prev) => prev + 1)

            // Get all focusable elements for focus trap
            const getFocusableElements = (): HTMLElement[] => {
                if (!menuPanelRef.current) return []
                const focusableSelectors =
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                return Array.from(
                    menuPanelRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
                )
            }

            // Focus first element after menu is visible
            const focusFirstElement = () => {
                const focusableElements = getFocusableElements()
                if (focusableElements.length > 0) {
                    firstFocusableRef.current = focusableElements[0]
                    lastFocusableRef.current = focusableElements[focusableElements.length - 1]
                    firstFocusableRef.current?.focus()
                }
            }

            // Use requestAnimationFrame for better timing
            requestAnimationFrame(() => {
                requestAnimationFrame(focusFirstElement)
            })

            // Handle keyboard events
            const handleKeyDown = (e: KeyboardEvent): void => {
                // Escape key closes menu
                if (e.key === "Escape") {
                    e.preventDefault()
                    closeMenu()
                    return
                }

                // Tab key focus trap
                if (e.key === "Tab") {
                    const focusableElements = getFocusableElements()
                    if (focusableElements.length === 0) return

                    const firstElement = focusableElements[0]
                    const lastElement = focusableElements[focusableElements.length - 1]

                    // Shift + Tab on first element -> go to last
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault()
                        lastElement?.focus()
                    }
                    // Tab on last element -> go to first
                    else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault()
                        firstElement?.focus()
                    }
                }
            }

            document.addEventListener("keydown", handleKeyDown)

            return () => {
                document.body.style.overflow = ""
                document.body.style.paddingRight = ""
                document.removeEventListener("keydown", handleKeyDown)
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
                className={`fixed left-0 right-0 bottom-0 w-screen bg-background-primary flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-full"} shadow-lg`}
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
                <nav aria-label="Main menu items" className="flex-1 overflow-y-auto">
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

                            const linkClassName = `group p-24 flex items-center justify-start transition-all duration-150 bg-background-primary ${
                                isActive
                                    ? "text-text-primary"
                                    : "text-text-secondary hover:text-text-primary active:text-text-primary"
                            }`

                            return (
                                <li
                                    key={item.href}
                                    className="grid border-b border-border-tertiary"
                                    style={{ gridTemplateColumns: isEven ? "1fr 20%" : "20% 1fr" }}
                                >
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
                                                rel={
                                                    item.newTab ? "noopener noreferrer" : undefined
                                                }
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

                {/* Bottom Section with Time and Settings */}
                <div className="p-24 flex items-center justify-between bg-background-primary flex-shrink-0">
                    <TimeDisplay timezone={timezone} />
                    <IconButton icon={GearSixIcon} ariaLabel="Open settings" size={24} />
                </div>
            </div>
        </div>
    )
}
