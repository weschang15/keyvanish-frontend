import tw, { styled } from "twin.macro"

export const Form = tw.form`
  my-8 space-y-6
`

export const Fieldset = tw.fieldset`
  space-y-6
`

export const Label = tw.label`
  block text-sm sm:text-base font-medium text-gray-700 mb-3
`

export const FieldGroup = tw.div`
  relative text-gray-700
`

export const SubmitButton = tw.button`
  relative w-full flex items-center justify-center py-2 px-4 text-sm sm:text-base font-medium shadow-md rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:(outline-none ring-2 ring-blue-500 ring-offset-2 ring-offset-blue-200)
`

export const MessageField = styled.textarea`
  ${tw`w-full h-40 px-2 py-2 text-sm sm:text-base text-gray-700 placeholder-gray-500 border rounded-md focus:(outline-none ring-2 ring-blue-600 border-transparent)`}
  ${({ hasError }) => hasError && tw`border-red-600 focus:(ring-red-600)`}
`

export const PasswordField = styled.input`
  ${tw`w-full px-2 py-2 text-sm sm:text-base text-gray-700 placeholder-gray-500 border rounded-md focus:(outline-none ring-2 ring-blue-600 border-transparent)`}
  ${({ hasError }) => hasError && tw`border-red-600 focus:(ring-red-600)`}
`
