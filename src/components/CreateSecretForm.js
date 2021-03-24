import * as React from "react"
import tw from "twin.macro"

const Label = tw.label`
  block text-sm font-medium text-gray-700
`

const CreateSecretForm = () => {
  return (
    <div>
      <Label htmlFor="message">Message</Label>
    </div>
  )
}

CreateSecretForm.propTypes = {}

CreateSecretForm.defaultProps = {}

export default CreateSecretForm
