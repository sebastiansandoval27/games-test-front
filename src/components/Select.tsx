import { ErrorMessage } from './ErrorMessage'

interface Props {
  label: string
  register: any
  options: {
    value: string
    label: string
  }[]
  name: string
  error?: boolean
  errorMessage?: string
}

export const Select = ({
  label,
  register,
  options,
  name,
  error = false,
  errorMessage = '',
}: Props) => {
  return (
    <div className="my-2 flex flex-col">
      <label className="block text-xs font-bold text-gray-700">{label}</label>

      <select
        id="HeadlineAct"
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
        {...register(name)}
      >
        <option value="">Please select</option>
        {options &&
          options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      <ErrorMessage error={error} errorMessage={errorMessage} />
    </div>
  )
}
