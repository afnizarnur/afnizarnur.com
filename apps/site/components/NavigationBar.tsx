"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { NavigationItem } from "@afnizarnur/ui"
import { GearSix, List, X } from "@phosphor-icons/react"
import { IconButton } from "./IconButton"
import { MobileMenu } from "./MobileMenu"
import { ThemeToggle } from "./ThemeToggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TerminalTextEffect } from "./TerminalTextEffect"

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

    return (
        <>
            <MobileMenu items={items} timezone={timezone} />

            <nav
                className="sticky top-0 z-40 h-[66px] border-b-[1px] border-border-tertiary bg-background-secondary"
                role="navigation"
                aria-label="Main navigation"
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
                        {/* Theme Toggle (Shown on all screens) */}
                        <ThemeToggle size={24} />

                        {/* Settings Icon (Hidden on mobile, shown on tablet+) */}
                        <div className="hidden md:flex">
                            <IconButton icon={GearSix} ariaLabel="Open settings" size={24} />
                        </div>

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
