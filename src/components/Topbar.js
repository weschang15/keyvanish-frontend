import { Link } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"
import tw from "twin.macro"

const Header = tw.header`
  flex items-center justify-between px-4 py-4
`

const Title = tw.h1`
  text-base sm:text-lg md:text-xl text-blue-600 font-extrabold
`

const Topbar = ({ siteTitle }) => (
  <Header>
    <Title>
      <Link to="/">{siteTitle}</Link>
    </Title>
  </Header>
)

Topbar.propTypes = {
  siteTitle: PropTypes.string,
}

Topbar.defaultProps = {
  siteTitle: ``,
}

export default Topbar
