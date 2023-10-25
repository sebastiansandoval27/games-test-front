import { ErrorMessage } from './ErrorMessage'

interface Props {
  label: string
  placeholder: string
  register: any
  name: string
  error?: boolean
  errorMessage?: string
}

export const Input = ({
  name,
  label,
  placeholder,
  register,
  error = false,
  errorMessage = '',
}: Props) => {
  return (
    <div className="my-2">
      <label className="block text-xs font-bold text-gray-700">{label}</label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        {...register(name)}
      />
      <ErrorMessage error={error} errorMessage={errorMessage} />
    </div>
  )
}
