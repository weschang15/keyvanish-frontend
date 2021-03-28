import PropTypes from "prop-types"
import * as React from "react"
import tw from "twin.macro"

const ErrorMessageWrap = tw.div`overflow-hidden leading-normal rounded-lg`

const ErrorMessageHeading = tw.h2`px-4 py-3 font-bold text-white bg-red-800`

const ErrorMessageContent = tw.p`px-4 py-3 text-red-700 bg-red-100`

const ErrorMessage = ({ heading, content }) => {
  return (
    <ErrorMessageWrap role="alert">
      <ErrorMessageHeading>{heading}</ErrorMessageHeading>
      <ErrorMessageContent>{content}</ErrorMessageContent>
    </ErrorMessageWrap>
  )
}

ErrorMessage.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default ErrorMessage
