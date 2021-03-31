import { useParams } from "@reach/router"
import React, { useState } from "react"
import tw from "twin.macro"
import ErrorMessage from "./ErrorMessage"
import {
  FieldGroup,
  Fieldset,
  Form,
  Label,
  PasswordField,
  SubmitButton,
} from "./Form"
import { PageTitle } from "./PageTitle"
import SEO from "./seo"
import Spinner from "./Spinner"

const INITIAL_FIELDS = {
  password: "",
}

const MessageWrap = tw.div`
  overflow-hidden rounded-md bg-blue-500 mb-8
`

const Message = tw.pre`
  p-6 text-sm leading-snug text-white bg-black bg-opacity-75 break-normal whitespace-normal
`

const Banner = tw.div`
  bg-gray-100 rounded-r-md py-6 md:py-4 px-6 md:px-4 flex items-center border-l-4 border-blue-500 mb-6
`

const AlertIcon = tw.svg`h-6 w-6 mr-3`

const Secret = () => {
  const [response, setResponse] = useState({})
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [isLoading, setLoading] = useState(false)

  const params = useParams()

  const handleInputChange = e => {
    const { name, value } = e.target
    setFields(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`/api/secrets/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    })

    const data = await res.json()

    setResponse(data)
    setFields(INITIAL_FIELDS)
    setLoading(false)
    return false
  }

  if (response?.content) {
    return (
      <>
        <SEO title="You Received a Secret" />
        <PageTitle>You Received a Secret</PageTitle>
        <Banner>
          <AlertIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </AlertIcon>
          <p>
            We will only show this message once. Be sure to copy it to a secure
            location!
          </p>
        </Banner>
        <MessageWrap>
          <Message>{response.content}</Message>
        </MessageWrap>
      </>
    )
  }

  return (
    <>
      <SEO title="Unlock Your Secret" />
      <PageTitle>Unlock Your Secret</PageTitle>
      {response?.errors && (
        <ErrorMessage
          heading={response.traceId ? `Error: ${response.traceId}` : "Shoot!"}
          content={response.message}
        />
      )}
      <Form onSubmit={handleSubmit} method="POST">
        <Fieldset>
          <FieldGroup>
            <Label>Password</Label>
            <PasswordField
              id="password"
              name="password"
              type="password"
              placeholder="Enter password..."
              value={fields.password}
              onChange={handleInputChange}
            />
          </FieldGroup>
          <SubmitButton>{isLoading && <Spinner />} Unlock secret</SubmitButton>
        </Fieldset>
      </Form>
    </>
  )
}

export default Secret
