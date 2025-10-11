import type { NavbarProps } from '../types';

/**
 * Navbar component for site navigation
 * Used in BaseLayout
 */
export function Navbar({ items, currentPath }: NavbarProps) {
  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="text-xl font-bold text-neutral-900">
            Afnizar Nur Ghifari
          </a>

          <ul className="flex space-x-8">
            {items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.newTab ? '_blank' : undefined}
                    rel={item.newTab ? 'noopener noreferrer' : undefined}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary-600'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
