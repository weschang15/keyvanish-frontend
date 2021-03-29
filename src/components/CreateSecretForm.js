import React, { useState } from "react"
import tw, { styled } from "twin.macro"
import { getMsFromDays, getMsFromMins } from "../utils"
import ErrorMessage from "./ErrorMessage"

const Form = tw.form`
  my-8 space-y-6
`

const Fieldset = tw.fieldset`
  space-y-6
`

const Label = tw.label`
  block text-sm sm:text-base font-medium text-gray-700 mb-3
`

const MessageField = styled.textarea`
  ${tw`w-full h-40 px-2 py-2 text-sm sm:text-base text-gray-700 placeholder-gray-500 border rounded-md focus:(outline-none ring-2 ring-blue-600 border-transparent)`}
  ${({ hasError }) => hasError && tw`border-red-600 focus:(ring-red-600)`}
`

const FieldGroup = tw.div`
  relative text-gray-700
`

const PasswordField = styled.input`
  ${tw`w-full px-2 py-2 text-sm sm:text-base text-gray-700 placeholder-gray-500 border rounded-md focus:(outline-none ring-2 ring-blue-600 border-transparent)`}
  ${({ hasError }) => hasError && tw`border-red-600 focus:(ring-red-600)`}
`

const ExpirationDropdownWrap = tw(FieldGroup)`inline-block`

const ExpirationDropdown = tw.select`
  appearance-none h-10 py-0 pl-2 pr-8 border bg-transparent text-sm sm:text-base rounded-md focus:(outline-none ring-2 ring-blue-600 border-transparent)`

const ExpirationDropdownIcon = tw.div`
  absolute bottom-0 right-0 flex items-center h-10 px-2 pointer-events-none
`

const SubmitButton = tw.button`
  relative w-full flex items-center justify-center py-2 px-4 text-sm sm:text-base font-medium shadow-md rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:(outline-none ring-2 ring-blue-500 ring-offset-2 ring-offset-blue-200)
`

const Spinner = tw.svg`animate-spin mr-3 h-5 w-5 text-white`

const FormFieldError = tw.span`text-sm text-red-700`

const MINS_15 = getMsFromMins(15)
const MINS_30 = getMsFromMins(30)
const DAYS_1 = getMsFromDays(1)
const DAYS_7 = getMsFromDays(7)

const INITIAL_FIELDS = {
  content: "",
  password: "",
  expiration: DAYS_1,
}

const CreateSecretForm = () => {
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [response, setResponse] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/secrets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    })

    const data = await res.json()

    if (data?.errors) {
      setErrors(data.errors)
      setResponse(data)
      setLoading(false)
      return false
    }

    setFields(INITIAL_FIELDS)
    setLoading(false)
    return false
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFields(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  return (
    <>
      {response.message && (
        <ErrorMessage
          heading={response.message}
          content={
            !response?.errors?.length
              ? "Please review the validation errors below."
              : "Something terrible happened!"
          }
        />
      )}
      <Form onSubmit={handleSubmit} method="POST">
        <Fieldset disabled={isLoading}>
          <FieldGroup>
            <Label htmlFor="content">Message</Label>
            <MessageField
              id="content"
              name="content"
              placeholder="Type your super secret content..."
              value={fields.content}
              onChange={handleInputChange}
              hasError={!!errors.content}
            />
            {errors.content && (
              <FormFieldError>{errors.content.message}</FormFieldError>
            )}
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordField
              id="password"
              name="password"
              type="password"
              placeholder="Super secret password..."
              value={fields.password}
              onChange={handleInputChange}
              hasError={!!errors.password}
            />
            {errors.password && (
              <FormFieldError>{errors.password.message}</FormFieldError>
            )}
          </FieldGroup>
          <ExpirationDropdownWrap>
            <Label htmlFor="expiration">Expiration</Label>
            <ExpirationDropdown
              id="expiration"
              name="expiration"
              onChange={handleInputChange}
              value={fields.expiration}
            >
              <optgroup label="Deletes in">
                <option value={MINS_15}>15 minutes</option>
                <option value={MINS_30}>30 minutes</option>
              </optgroup>
              <optgroup label="Deletes in ">
                <option value={DAYS_1}>1 day</option>
                <option value={DAYS_7}>7 days</option>
              </optgroup>
            </ExpirationDropdown>
            <ExpirationDropdownIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                focusable="false"
                height={20}
                width={20}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </ExpirationDropdownIcon>
          </ExpirationDropdownWrap>
          <SubmitButton type="submit">
            {isLoading && (
              <Spinner
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </Spinner>
            )}
            Create secret link{" "}
          </SubmitButton>
        </Fieldset>
      </Form>
    </>
  )
}

CreateSecretForm.propTypes = {}

CreateSecretForm.defaultProps = {}

export default CreateSecretForm
