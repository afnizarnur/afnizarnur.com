import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { createGlobalStyle, withTheme } from "styled-components"
import { useSiteMetadata } from "../utils/hooks"
import "sanitize.css"
import "./fonts/inter.css"

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]', {
    speed: 300,
  })
}

const GlobalStyles = createGlobalStyle`
  * {
    font-family: "Inter", system-ui, -apple-system, sans-serif;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.gray[0]};
    color: ${({ theme }) => theme.colors.black};
  }


  a {
    color: inherit;
    text-decoration: none;
    text-decoration-skip: ink;
    text-decoration-skip-ink: auto;
  }

  a:focus, button:focus, .carousel .control-dots li.dot:focus{
    outline: 1px dotted;
    outline-offset: 4px;
  }
  
  .logoImage:hover {
    transform: scale(1.1);
  }

  .scrollImage {
    transition: all .2s ease-in-out; 
  }

  .scroll:hover .scrollImage {
    transform: translateY(-10px);
  }

  .btnSelectedWork:hover .scrollWork {
    filter: invert(100%);
  }

  .btnSelectedWork:hover a {
    color: white;
  }

  .carousel .slider-wrapper {
    border-radius: 20px!important;
  }

  .carousel.carousel-slider .control-arrow:hover {
    background: none!important;
  }

  .carousel .slide {
    background-color: ${({ theme }) => theme.colors.white}!important;
  }

  .carousel .control-dots {
    padding: 0;
    position: relative!important;
  }

  .carousel .control-dots li.dot {
    background-color: ${({ theme }) => theme.colors.black};
    box-shadow: none;
    border-radius: ${({ theme }) => theme.radii[0]};
  }

  @keyframes fadeInBottom {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
  
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown{
    0% {
      transform: translateY(5px);
    }

    50% {
      transform: translateY(-2px);
    }
  
    100% {
      transform: translateY(5px);
    }
  }

  @media only screen and (max-width: 64em) {
    .headroom--unpinned {
      padding-right: 1.5rem!important;
      padding-left: 1.5rem!important;
    }
   .headroom--pinned {
     padding-right: 1.5rem!important;
     padding-left: 1.5rem!important;
   }
  }
`
const Layout = ({ children, theme }) => {
  const { title, description, siteUrl } = useSiteMetadata()

  return (
    <>
      <GlobalStyles />

      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content={theme.colors.black} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={siteUrl + "/meta-image-default.jpg"}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:site" content="@afnizarnur" />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={siteUrl + "/meta-image-default.jpg"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="apple-mobile-web-app-title" content="Afnizar Nur Ghifari" />
        <meta name="application-name" content="Afnizar Nur Ghifari" />
        <meta name="msapplication-TileColor" content={theme.colors.black} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color={theme.colors.black}
        />
      </Helmet>

      <a id="top"></a>
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTheme(Layout)
