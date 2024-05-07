import "focus-visible"
import initAnimations from "./modules/animation"
import initNavigation from "./modules/nav"
import initSpotifyFetcher from "./modules/spotify"
import initLocalTime from "./modules/local-time"
import initClipboard from "./modules/clipboard"
import initModal from "./modules/modal"
import initSmoothScroll from "./modules/smooth-scroll"
import initThemeSwitcher from "./modules/theme-switcher"
import initTagToggle from "./modules/tag-toggle"
import initRecommendationAccordion from "./modules/rec-accordion"
import initQuickNavAbout from "./modules/quick-nav-about"
import initNavigateToUrl from "./modules/site-version"

// Internal Modules
import "./modules/preload"

initAnimations()
initNavigation()
initSpotifyFetcher()
initLocalTime()
initClipboard("hi@afnizarnur.com")
initModal()
initSmoothScroll()
initThemeSwitcher()
initTagToggle()
initRecommendationAccordion()
initQuickNavAbout()
initNavigateToUrl()
