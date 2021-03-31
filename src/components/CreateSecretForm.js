import React, { useRef, useState } from "react"
import tw from "twin.macro"
import { getMsFromDays, getMsFromMins } from "../utils"
import ErrorMessage from "./ErrorMessage"
import {
  FieldGroup,
  Fieldset,
  Form,
  Label,
  MessageField,
  PasswordField,
  SubmitButton,
} from "./Form"
import Spinner from "./Spinner"

const ExpirationDropdownWrap = tw(FieldGroup)`inline-block`

const ExpirationDropdown = tw.select`
  appearance-none h-10 py-0 pl-2 pr-8 border bg-transparent text-sm sm:text-base rounded-md focus:(outline-none ring-2 ring-blue-600 border-transparent)`

const ExpirationDropdownIcon = tw.div`
  absolute bottom-0 right-0 flex items-center h-10 px-2 pointer-events-none
`

const FormFieldError = tw.span`text-sm text-red-700`

const LinkField = tw(PasswordField)`h-14 pr-32`

const CopyButton = tw(SubmitButton)`
  absolute top-0 right-0 bottom-0 mt-1 mr-1 mb-1 px-8 w-auto
`

const CopyIcon = tw.svg`h-6 w-6 mr-2`

const ResetButton = tw(SubmitButton)`
  w-auto shadow-none text-gray-700 bg-transparent border-gray-400 hover:bg-gray-200 my-6 border border-gray-200
`

const MINS_15 = getMsFromMins(15)
const MINS_30 = getMsFromMins(30)
const DAYS_1 = getMsFromDays(1)
const DAYS_7 = getMsFromDays(7)

const INITIAL_FIELDS = {
  content: "",
  password: "",
  expiration: DAYS_1,
}

const INITIAL_RESPONSE = {}

const INITAL_ERRORS = {}

const CreateSecretForm = () => {
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [response, setResponse] = useState(INITIAL_RESPONSE)
  const [errors, setErrors] = useState(INITAL_ERRORS)
  const [isLoading, setLoading] = useState(false)
  const linkRef = useRef(null)

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

    setResponse(data)
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

  if (response?.content) {
    return (
      <>
        <FieldGroup>
          <LinkField
            ref={linkRef}
            value={`${document.URL}secrets/${response._id}`}
            readOnly
          />
          <CopyButton
            onClick={async e => {
              if (!navigator.clipboard) {
                return
              }

              try {
                await navigator.clipboard.writeText(
                  `${document.URL}secrets/${response._id}`
                )
                linkRef.current.select()
              } catch (error) {
                console.error("Could not copy to clipboard!", error)
              }
            }}
          >
            <CopyIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              height={20}
              width={20}
            >
              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
              <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </CopyIcon>
            Copy
          </CopyButton>
        </FieldGroup>
        <ResetButton
          onClick={e => {
            setResponse(INITIAL_RESPONSE)
            setFields(INITIAL_FIELDS)
            setErrors(INITAL_ERRORS)
          }}
        >
          Create new secret
        </ResetButton>
      </>
    )
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
            {isLoading && <Spinner />}
            Encrypt and create link
          </SubmitButton>
        </Fieldset>
      </Form>
    </>
  )
}

export default CreateSecretForm
