import React from 'react'

interface Props {
  errorMessage: string
  error: boolean
}

export const ErrorMessage = ({ errorMessage, error }: Props) => {
  return (
    <>
      {error && (
        <span className="text-red-500 text-xs mt-2">{errorMessage}</span>
      )}
    </>
  )
}
