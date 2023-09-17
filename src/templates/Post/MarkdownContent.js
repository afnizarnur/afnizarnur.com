import styled from "styled-components"
import { Text } from "rebass"
import { themeHover, themeUnderline } from "../../utils/styles"

const MarkdownContent = styled(Text)`
  & > * {
    margin-top: 0;
    margin-bottom: 0;

    & + * {
      margin-top: ${({ theme }) => theme.space[5]};
    }

    & + h1,
    & + h2 {
      margin-top: 3rem;
    }

    & + h3,
    & + h4 {
      margin-top: 3rem;

      @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
        margin-top: 2.5rem;
        margin-bottom: -0.5rem;
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: ${({ theme }) => theme.lineHeights.title1};
  }

  /* Headers */
  h1 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    letter-spacing: ${({ theme }) => theme.letterSpacings.title2};
    font-weight: 800;
    @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
      letter-spacing: 0px;
      font-size: ${({ theme }) => theme.fontSizes[3]};
    }
  }

  h2 {
    font-size: 2.5rem;
    letter-spacing: ${({ theme }) => theme.letterSpacings.title3};
    font-weight: 600;
    @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
      letter-spacing: 0px;
      font-size: ${({ theme }) => theme.fontSizes[3]};
    }
  }

  h3 {
    font-size: 2rem;
    font-weight: 600;

    @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }

  h4,
  h5,
  h6 {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    font-weight: 600;

    @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }

  h1 code,
  h2 code,
  h3 code,
  h4 code,
  h5 code,
  h6 code {
    background-color: transparent;
    color: inherit;
  }

  /* Type Elements */

  p {
    color: ${({ theme }) => theme.colors.gray[2]};
  }

  hr {
    overflow: visible; /* For IE */
    padding: 0;
    border: none;
    color: ${({ theme }) => theme.colors.gray[1]};
    text-align: center;
    margin: ${({ theme }) => theme.space[6]} 0;
  }

  hr:after {
    content: "...";
    letter-spacing: 0.5em;
    display: inline-block;
    position: relative;
    top: -0.7em;
    font-size: 1.5em;
    background: white;
  }

  ul,
  ol,
  dl {
    color: ${({ theme }) => theme.colors.gray[2]};
  }

  ul {
    list-style-type: square;
  }

  ul ul,
  ol ol,
  ul ol,
  ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  b,
  strong,
  em,
  small,
  code {
    line-height: 1;
  }

  sup,
  sub {
    vertical-align: baseline;
    position: relative;
    top: -0.4em;
  }

  sub {
    top: 0.4em;
  }

  a {
    ${themeHover};
    ${themeUnderline};

    &:hover code {
      opacity: 0.8;
    }

    &.anchor {
      margin-left: -24px;
    }

    @media print {
      &:after {
        content: " (" attr(href) ")";
        font-size: 0.875em;
      }
      &[href^="/"]:after {
        content: " (https://afnizarnur.com" attr(href) ")";
      }
      &[href^="#"] {
        text-decoration: none;

        &:after {
          content: "";
        }
      }
    }
  }

  blockquote {
    margin: 2.75rem -1.7rem;
    border-left: 4px solid ${({ theme }) => theme.colors.black};
    border-left-style: groove;
    padding: 0 ${({ theme }) => theme.space[5]};
    font-style: italic;

    @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
      margin: 2.75rem 0rem;
    }
  }

  details {
    margin-top: ${({ theme }) => theme.space[4]};
    margin-bottom: ${({ theme }) => theme.space[4]};
    border-radius: ${({ theme }) => theme.radii[2]};
    padding: ${({ theme }) => theme.space[4]};
    background-color: ${({ theme }) => theme.colors.gray[0]};

    p {
      outline: none !important;
    }

    > :first-child {
      margin-top: 0;
      outline: none;
      font-weight: bold;
    }

    > :last-child {
      margin-bottom: 0;
    }
  }

  code {
    font-family: ${({ theme }) => theme.fonts.monospace}!important;
  }

  p code,
  li code {
    border-radius: ${({ theme }) => theme.radii[1]};
    padding-left: ${({ theme }) => theme.space[1]};
    padding-right: ${({ theme }) => theme.space[1]};
    white-space: nowrap;
    box-shadow: none !important;
    border: none !important;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }

  p code {
    background-color: ${({ theme }) => theme.colors.gray[0]}!important;
    color: ${({ theme }) => theme.colors.gray[2]};
    text-shadow: none;
    padding: 0.2em 0.3em !important;
  }

  pre {
    width: 100%;
    overflow-x: scroll;
    margin-top: 2.75rem;
    margin-bottom: 2.75rem;
    border-radius: ${({ theme }) => theme.radii[2]};
    padding: ${({ theme }) => theme.space[3]};
    background-color: ${({ theme }) => theme.colors.gray[2]};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-family: ${({ theme }) => theme.fonts.monospace}!important;
    white-space: pre;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }

    @media print {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.gray[2]};
    }
  }

  img {
    display: block;
    width: 100%;
    border-radius: ${({ theme }) => theme.radii[2]};
  }

  .gatsby-resp-image-figure .gatsby-resp-image-wrapper {
    margin-bottom: ${({ theme }) => theme.space[4]};
    border-radius: ${({ theme }) => theme.radii[2]};
  }

  .gatsby-resp-image-figure .gatsby-resp-image-figcaption {
    text-align: center;
    font-style: italic;
  }

  .gatsby-resp-image-background-image {
    border-radius: ${({ theme }) => theme.radii[2]};
  }

  .gatsby-resp-image-wrapper {
    margin-top: 2.75rem;
    margin-bottom: 3.25rem;
    border-radius: ${({ theme }) => theme.radii[2]};
  }

  iframe {
    margin-top: ${({ theme }) => theme.space[4]};
    margin-bottom: ${({ theme }) => theme.space[4]};
    border: 1px solid ${({ theme }) => theme.colors.white};
  }
`

export default MarkdownContent
