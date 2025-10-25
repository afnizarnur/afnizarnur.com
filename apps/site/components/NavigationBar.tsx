"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { NavigationItem } from "@afnizarnur/ui"
import { List, X } from "@phosphor-icons/react"
import { MobileMenu } from "./MobileMenu"
import { ThemeToggle } from "./ThemeToggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TerminalTextEffect } from "./TerminalTextEffect"
import { useDragContextSafe } from "./HorizontalHeader/contexts/DragContext"
import { AnimatedResetButton } from "./AnimatedResetButton"

interface NavigationBarProps {
    items: NavigationItem[]
    currentPath?: string
    logo?: {
        type: "text" | "image"
        text?: string
        image?: {
            url: string
            alt: string
        }
    }
    timezone?: {
        timeZone?: string
        displayLabel?: string
    }
    _hoverEffect?: "cursor" | "background" | "colorful"
}

function getFormattedTime(tzConfig?: { timeZone?: string; displayLabel?: string }): string {
    const now = new Date()

    // Base options without timezone
    const baseOptions = {
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        hour12: true,
    }

    let formatter: Intl.DateTimeFormat

    // Try to use the provided timezone, fall back to browser timezone if invalid
    if (tzConfig?.timeZone) {
        try {
            formatter = new Intl.DateTimeFormat("en-US", {
                ...baseOptions,
                timeZone: tzConfig.timeZone,
            })
        } catch {
            // Log warning for invalid timezone and fall back
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
    // Initialize with actual server-rendered time to prevent layout shift
    const [timeString, setTimeString] = useState<string>(() => {
        // Get real time on both server and client initial render
        return getFormattedTime(timezone)
    })

    useEffect(() => {
        // Update to client time immediately (might differ slightly from server)
        setTimeString(getFormattedTime(timezone))

        // Update time every minute
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

export function NavigationBar({
    items,
    logo,
    timezone,
    _hoverEffect = "cursor",
}: Omit<NavigationBarProps, "currentPath">): JSX.Element {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isPastHeader, setIsPastHeader] = useState(false)

    // Use drag context if available (only available on pages with HorizontalHeader)
    const dragContext = useDragContextSafe()
    const resetAll = dragContext?.resetAll
    const hasChanges = dragContext?.hasChanges ?? false

    // Observe horizontal header sentinel to change background when navbar touches end of header
    useEffect(() => {
        const navbar = document.querySelector("nav[role='navigation']") as HTMLElement

        // Check if we're on mobile viewport
        const isMobileViewport = window.innerWidth < 768

        // Use mobile sentinel on mobile, desktop sentinel on desktop
        const mobileSentinel = document.getElementById("mobile-header-widgets-sentinel")
        const desktopSentinel = document.getElementById("horizontal-header-sentinel")
        const sentinel = isMobileViewport ? mobileSentinel : desktopSentinel

        if (!sentinel || !navbar) {
            // No header on this page, keep default background
            setIsPastHeader(false)
            return
        }

        // Get the actual navbar height dynamically to support responsive changes
        const navbarHeight = navbar.offsetHeight

        // Check initial state: if sentinel is below the navbar, we've scrolled past it yet
        const sentinelRect = sentinel.getBoundingClientRect()
        const initialIsPastHeader = sentinelRect.top < navbarHeight

        // Debug logging
        console.log('NavigationBar Initial State Debug:', {
            navbarHeight,
            sentinelTop: sentinelRect.top,
            sentinelBottom: sentinelRect.bottom,
            initialIsPastHeader,
            isMobileViewport,
            sentinelId: sentinel.id
        })

        setIsPastHeader(initialIsPastHeader)

        // Flag to skip the first IntersectionObserver callback since we already set initial state
        let isFirstCallback = true

        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                // Skip the first callback - we already calculated the correct initial state above
                if (isFirstCallback) {
                    console.log('IntersectionObserver: Skipping first callback')
                    isFirstCallback = false
                    return
                }

                // Only update if we have a valid entry
                if (entries.length > 0) {
                    const entry = entries[0]

                    // Determine if we've scrolled past the header
                    // When isIntersecting = false, check if sentinel is above or below viewport
                    let newIsPastHeader: boolean
                    if (entry.isIntersecting) {
                        // Sentinel is visible in the adjusted viewport - we're at the transition point
                        // Use the top position to determine if we're scrolling down or up
                        newIsPastHeader = entry.boundingClientRect.top <= navbarHeight
                    } else {
                        // Sentinel is not visible - could be above or below viewport
                        // If top < navbarHeight, sentinel is above (scrolled past)
                        // If top >= navbarHeight, sentinel is below (not reached yet)
                        newIsPastHeader = entry.boundingClientRect.top < navbarHeight
                    }

                    console.log('IntersectionObserver Callback:', {
                        isIntersecting: entry.isIntersecting,
                        sentinelTop: entry.boundingClientRect.top,
                        navbarHeight,
                        intersectionRatio: entry.intersectionRatio,
                        newIsPastHeader,
                        scrollY: window.scrollY
                    })

                    setIsPastHeader(newIsPastHeader)
                }
            },
            {
                threshold: 0,
                // Negative top margin equal to navbar height to trigger when navbar touches sentinel
                rootMargin: `-${navbarHeight}px 0px 0px 0px`,
            }
        )

        observer.observe(sentinel)

        // Re-observe on resize to handle viewport changes
        const handleResize = (): void => {
            const newIsMobileViewport = window.innerWidth < 768
            if (newIsMobileViewport !== isMobileViewport) {
                // Viewport changed, component will re-render
                window.location.reload()
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            observer.disconnect()
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        const hamburgerBtn = document.getElementById("hamburger-menu-button")

        if (hamburgerBtn) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (
                        mutation.type === "attributes" &&
                        mutation.attributeName === "data-menu-open"
                    ) {
                        const isOpen = hamburgerBtn.getAttribute("data-menu-open") === "true"
                        setIsMenuOpen(isOpen)
                    }
                })
            })

            observer.observe(hamburgerBtn, { attributes: true })

            return () => observer.disconnect()
        }
    }, [])

    const navBackgroundClass = isPastHeader ? "bg-background-primary" : "bg-background-secondary"

    // Debug logging for background class
    console.log('NavigationBar Render:', {
        isPastHeader,
        navBackgroundClass,
        fullClassName: `sticky top-0 z-40 h-[66px] border-b-[1px] border-border-tertiary transition-colors duration-300 ${navBackgroundClass}`
    })

    return (
        <>
            <MobileMenu items={items} timezone={timezone} />

            <nav
                className={`sticky top-0 z-40 h-[66px] border-b-[1px] border-border-tertiary transition-colors duration-300 ${navBackgroundClass}`}
                role="navigation"
                aria-label="Main navigation"
                data-scrolled={isPastHeader}
            >
                <div className="h-full px-6 md:px-6 lg:px-6 flex md:grid items-center md:grid-cols-2 lg:grid-cols-8 gap-6 mx-auto lg:max-w-[1220px]">
                    {/* Logo */}
                    <div className="flex-1 md:col-span-1 lg:col-span-2">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-eyebrow-1 text-text-primary transition-colors duration-150 hover:text-text-secondary rounded w-fit"
                            aria-label="Afnizar Nur Ghifari - Home"
                            title="Go to homepage"
                        >
                            {logo?.type === "image" && logo?.image ? (
                                <Image
                                    src={logo.image.url}
                                    alt={logo.image.alt}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            ) : null}
                            {logo?.type === "text" && logo.text ? (
                                <TerminalTextEffect effect="cursor">{logo.text}</TerminalTextEffect>
                            ) : (
                                <TerminalTextEffect effect="cursor">
                                    Afnizar_Nur_Ghifari
                                </TerminalTextEffect>
                            )}
                        </Link>
                    </div>

                    {/* Navigation Menu (Hidden on tablet and mobile) */}
                    <div className="col-span-3 hidden lg:block lg:col-span-3">
                        <ul className="flex gap-48 list-none p-0 m-0">
                            {items.map((item) => {
                                const href = normalizeHref(item.href)
                                const isActive = isNavItemActive(item.href, pathname)
                                const isExternal = item.newTab || href.startsWith("http")

                                return (
                                    <li key={item.href}>
                                        {isExternal ? (
                                            <a
                                                href={href}
                                                target={item.newTab ? "_blank" : undefined}
                                                rel={
                                                    item.newTab ? "noopener noreferrer" : undefined
                                                }
                                                className={`text-eyebrow-1 transition-colors duration-150 rounded ${
                                                    isActive
                                                        ? "text-text-primary cursor-default"
                                                        : "text-text-secondary hover:text-text-primary active:text-text-primary"
                                                }`}
                                                aria-current={isActive ? "page" : undefined}
                                            >
                                                <TerminalTextEffect effect="cursor">
                                                    {item.title}
                                                </TerminalTextEffect>
                                            </a>
                                        ) : (
                                            <Link
                                                href={href}
                                                className={`text-eyebrow-1 transition-colors duration-150 rounded ${
                                                    isActive
                                                        ? "text-text-primary cursor-default"
                                                        : "text-text-secondary hover:text-text-primary active:text-text-primary"
                                                }`}
                                                aria-current={isActive ? "page" : undefined}
                                            >
                                                <TerminalTextEffect effect="cursor">
                                                    {item.title}
                                                </TerminalTextEffect>
                                            </Link>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Time Display (Hidden on tablet and mobile) */}
                    <div className="col-span-2 hidden lg:block lg:col-span-2">
                        <TimeDisplay timezone={timezone} />
                    </div>

                    {/* Icon Buttons + Hamburger Menu */}
                    <div className="flex justify-end gap-4 md:col-span-1 lg:col-span-1">
                        {/* Reset Button (Shown only when there are changes, hidden on mobile/tablet) */}
                        {resetAll && <div className="hidden lg:block"><AnimatedResetButton onClick={resetAll} show={hasChanges} /></div>}

                        {/* Theme Toggle (Shown on all screens) */}
                        <ThemeToggle size={24} />

                        {/* Hamburger Menu Button (Shown on tablet and mobile) */}
                        <button
                            id="hamburger-menu-button"
                            className="lg:hidden w-[40px] h-[40px] p-[8px] flex items-center justify-center text-icon-secondary hover:text-icon-primary active:text-icon-primary transition-colors rounded-radius-8"
                            aria-label="Open navigation menu"
                            aria-expanded="false"
                            aria-controls="mobile-menu-overlay"
                            type="button"
                            data-menu-open="false"
                        >
                            {isMenuOpen ? (
                                <X size={24} color="currentColor" />
                            ) : (
                                <List size={24} color="currentColor" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
