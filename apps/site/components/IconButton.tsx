import type { Icon } from "@phosphor-icons/react"

interface IconButtonProps {
    icon: Icon
    ariaLabel: string
    size?: number
    className?: string
    onClick?: () => void
}

export function IconButton({
    icon: IconComponent,
    ariaLabel,
    size = 24,
    className = "",
    onClick,
}: IconButtonProps): JSX.Element {
    return (
        <button
            className={`w-[40px] h-[40px] p-[8px] flex items-center justify-center text-icon-secondary hover:text-icon-primary active:text-icon-primary transition-colors rounded-radius-8 cursor-pointer ${className}`}
            aria-label={ariaLabel}
            type="button"
            onClick={onClick}
        >
            <IconComponent size={size} color="currentColor" />
        </button>
    )
}
