"use client"

import type { NavigationItem } from "@afnizarnur/ui"
import { List, X } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { LAYOUT } from "@/lib/constants"
import { isNavItemActive, normalizeHref } from "@/lib/utils"
import { AnimatedResetButton } from "../AnimatedResetButton"
import { useDragContextSafe } from "../HorizontalHeader/contexts/DragContext"
import { MobileMenu } from "../MobileMenu"
import { TerminalTextEffect } from "../TerminalTextEffect"
import { ThemeToggle } from "../ThemeToggle"
import { TimeDisplay } from "../TimeDisplay"

const { NAVBAR_HEIGHT, MOBILE_BREAKPOINT } = LAYOUT

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

    // Ref to track if this is the first IntersectionObserver callback
    const isFirstCallbackRef = useRef(true)
    // Ref to store current observer for cleanup
    const observerRef = useRef<IntersectionObserver | null>(null)

    // Setup and manage IntersectionObserver based on viewport
    const setupObserver = useCallback(() => {
        const navbar = document.querySelector("nav") as HTMLElement
        if (!navbar) {
            setIsPastHeader(false)
            return
        }

        // Determine which sentinel to observe based on current viewport
        const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT
        const mobileSentinel = document.getElementById("mobile-header-widgets-sentinel")
        const desktopSentinel = document.getElementById("horizontal-header-sentinel")
        const sentinel = isMobileViewport ? mobileSentinel : desktopSentinel

        if (!sentinel) {
            // No header sentinel on this page, keep default background
            setIsPastHeader(false)
            return
        }

        // Calculate initial state based on sentinel position
        const sentinelRect = sentinel.getBoundingClientRect()
        const initialIsPastHeader = sentinelRect.top < NAVBAR_HEIGHT
        setIsPastHeader(initialIsPastHeader)

        // Reset the first callback flag
        isFirstCallbackRef.current = true

        // Clean up existing observer if any
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        // Create IntersectionObserver to track when we scroll past the header
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                // Skip first callback since we already set initial state above
                if (isFirstCallbackRef.current) {
                    isFirstCallbackRef.current = false
                    return
                }

                const entry = entries[0]
                if (!entry) return

                // Determine if we've scrolled past the header by checking sentinel position
                // isIntersecting = false can mean either:
                //   1. Sentinel is ABOVE viewport (scrolled past) → isPastHeader = true
                //   2. Sentinel is BELOW viewport (not reached) → isPastHeader = false
                // We check boundingClientRect.top to distinguish between these cases
                const newIsPastHeader = entry.isIntersecting
                    ? entry.boundingClientRect.top <= NAVBAR_HEIGHT
                    : entry.boundingClientRect.top < NAVBAR_HEIGHT

                setIsPastHeader(newIsPastHeader)
            },
            {
                threshold: 0,
                rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
            }
        )

        observer.observe(sentinel)
        observerRef.current = observer
    }, [])

    // Setup IntersectionObserver and handle viewport resize
    useEffect(() => {
        // Initial setup
        setupObserver()

        // Track viewport state to detect mobile/desktop transitions
        let currentIsMobile = window.innerWidth < MOBILE_BREAKPOINT

        // Handle resize events - re-setup observer if viewport crosses breakpoint
        const handleResize = (): void => {
            const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT

            // Only re-setup if we've crossed the mobile/desktop breakpoint
            if (newIsMobile !== currentIsMobile) {
                currentIsMobile = newIsMobile
                setupObserver()
            }
        }

        window.addEventListener("resize", handleResize)

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize)
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [setupObserver])

    // Observe hamburger menu button state for icon toggling
    useEffect(() => {
        const hamburgerBtn = document.getElementById("hamburger-menu-button")
        if (!hamburgerBtn) return

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes" && mutation.attributeName === "data-menu-open") {
                    const isOpen = hamburgerBtn.getAttribute("data-menu-open") === "true"
                    setIsMenuOpen(isOpen)
                    break
                }
            }
        })

        observer.observe(hamburgerBtn, { attributes: true })

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <>
            <MobileMenu items={items} timezone={timezone} />

            <nav
                className={`sticky top-0 z-40 h-[66px] border-b-[1px] border-border-tertiary transition-colors duration-300 ${
                    isPastHeader ? "bg-background-primary" : "bg-background-secondary"
                }`}
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
                        {resetAll && (
                            <div className="hidden lg:block">
                                <AnimatedResetButton onClick={resetAll} show={hasChanges} />
                            </div>
                        )}

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
