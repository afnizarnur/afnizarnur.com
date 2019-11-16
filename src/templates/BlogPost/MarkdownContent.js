import styled from "styled-components"
import { Text } from "rebass"
import { themeHover, themeUnderline } from "../../utils/styles"

const MarkdownContent = styled(Text)`
  /* Vertical Rhythm */
  & > * {
    /* reset all margins */
    margin-top: 0;
    margin-bottom: 0;

    /* margin top to all child elements */
    & + * {
      margin-top: ${({ theme }) => theme.space[5]};
    }

    /* bigger margin top on headers */
    & + h1,
    & + h2 {
      margin-top: 3rem;
    }

    & + h3,
    & + h4 {
      margin-top: 2.5rem;

      @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
        margin-top: 2rem;
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
    color: ${({ theme }) => theme.colors.black};
  }

  /* Headers */
  h1 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    letter-spacing: -2.2px;
    font-weight: 800;
    @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
      letter-spacing: 0px;
      font-size: ${({ theme }) => theme.fontSizes[3]};
    }
  }

  h2 {
    font-size: 2.5rem;
    letter-spacing: -1px;
    font-weight: 800;
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
    color: ${({ theme }) => theme.colors.gray[1]};
  }

  hr {
    margin: ${({ theme }) => theme.space[6]} 0;
    border: none;
    border-top: 1px solid #d8d8d8;
  }

  ul,
  ol,
  dl {
    padding-left: ${({ theme }) => theme.space[5]};
    color: ${({ theme }) => theme.colors.gray[1]};
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
    font-size: 2.25rem;
    font-weight: bold;
    line-height: 2.5rem;
    letter-spacing: -2.14px;
    margin: 2.75rem 0;
    color: ${({ theme }) => theme.colors.black};

    > :first-child {
      margin-top: 0;
      margin-bottom: 0;
      color: ${({ theme }) => theme.colors.black};
    }
    > :last-child {
      margin-bottom: 0;
      font-weight: normal;
      letter-spacing: -0.2px;
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }

  details {
    margin-top: ${({ theme }) => theme.space[4]};
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.space[4]};
    margin-left: 0;
    border-left: ${({ theme }) => theme.borders[3]}
      ${({ theme }) => theme.colors.orange};
    border-radius: ${({ theme }) => theme.radii[1]};
    padding: ${({ theme }) => theme.space[3]};
    background-color: ${({ theme }) => theme.colors.white};

    p {
      max-width: 30em;
    }

    > :first-child {
      margin-top: 0;
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
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes[0]};
    white-space: nowrap;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }

  pre {
    width: 100%;
    overflow-x: scroll;
    margin-top: 2.75rem;
    margin-bottom: 2.75rem;
    border-radius: ${({ theme }) => theme.radii[2]};
    padding: ${({ theme }) => theme.space[3]};
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-family: ${({ theme }) => theme.fonts.monospace}!important;
    white-space: pre;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }

    @media print {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.black};
    }
  }

  img {
    display: block;
    width: 100%;
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
