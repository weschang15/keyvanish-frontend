/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"
import tw from "twin.macro"
import Topbar from "./Topbar"

const Container = tw.div`
  w-full max-w-screen-sm	mx-auto
`

const Footer = tw.footer`
  bg-gray-50 border-t border-gray-200 py-12 md:py-14 px-4 sm:px-6 lg:px-16 m-auto text-sm text-center
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Topbar siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer>
        <p>
          © {new Date().getFullYear()} Built by{" "}
          <a href="https://www.wesleychang.dev">Wes Chang</a>
        </p>
      </Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
