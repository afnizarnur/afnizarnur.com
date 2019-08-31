import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { createGlobalStyle, withTheme } from "styled-components"
import { Box, Flex } from "rebass"
import Navigation from "../components/Navigation"
import { useSiteMetadata } from "../utils/hooks"
import "sanitize.css"

const GlobalStyles = createGlobalStyle`
  @import url('fonts/inter.css');
  html {
    background-color: ${({ theme }) => theme.colors.white};
    line-height: ${({ theme }) => theme.lineHeights.copy};
    scroll-behavior: smooth;
    
    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }

    @media print {
      background: none;
    }
  }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    padding-left: 10px;
    padding-right: 10px;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.gray[0]} !important;
    color: ${({ theme }) => theme.colors.black} !important;
  }

  a {
    color: inherit;
    text-decoration: none;
    text-decoration-skip: ink;
    text-decoration-skip-ink: auto;
  }

  @media print {
    nav, footer {
      display: none !important;
    }

    #main-content {
      margin-bottom: 0 !important;
    }
  }
`
const Layout = ({ children, theme }) => {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <GlobalStyles />

      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content={theme.colors.black} />
        <meta name="apple-mobile-web-app-title" content="" />
        <meta name="application-name" content="" />
        <meta name="msapplication-TileColor" content="{theme.colors.black}" />
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

      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTheme(Layout)
