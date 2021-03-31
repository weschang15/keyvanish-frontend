import { Link } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"
import tw from "twin.macro"

const Header = tw.header`
  flex items-center justify-between px-4 py-4 border-b border-gray-200 mb-6
`

const Title = tw.div`
  text-base sm:text-lg md:text-xl text-blue-600 font-extrabold
`

const Logo = tw.svg`mr-2`

const LogoLink = tw(Link)`flex items-center`

const Topbar = ({ siteTitle }) => (
  <Header>
    <Title role="img" aria-label="Keyvanish logo">
      <LogoLink to="/">
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          height={24}
          width={24}
        >
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </Logo>
        {siteTitle}
      </LogoLink>
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
