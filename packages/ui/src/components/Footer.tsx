import type { FooterProps } from '../types';

/**
 * Footer component with navigation and social links
 * Used in BaseLayout
 */
export function Footer({ navigationItems, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Afnizar Nur Ghifari
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Product Designer & Developer
            </p>
          </div>

          {/* Navigation */}
          {navigationItems && navigationItems.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">Navigate</h4>
              <ul className="mt-4 space-y-2">
                {navigationItems.map((item) => {
                  // Ensure href starts with / for internal links (not http/https)
                  const href = item.href.startsWith('http')
                    ? item.href
                    : item.href.startsWith('/')
                      ? item.href
                      : `/${item.href}`;
                  return (
                    <li key={item.href}>
                      <a
                        href={href}
                        target={item.newTab ? '_blank' : undefined}
                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                        className="text-sm text-neutral-600 hover:text-neutral-900"
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {socialLinks && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">Connect</h4>
              <ul className="mt-4 space-y-2">
                {socialLinks.twitter && (
                  <li>
                    <a
                      href={`https://twitter.com/${socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-600 hover:text-neutral-900"
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
                      className="text-sm text-neutral-600 hover:text-neutral-900"
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
                      className="text-sm text-neutral-600 hover:text-neutral-900"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}
                {socialLinks.email && (
                  <li>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="text-sm text-neutral-600 hover:text-neutral-900"
                    >
                      Email
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-8">
          <p className="text-center text-sm text-neutral-500">
            © {currentYear} Afnizar Nur Ghifari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
