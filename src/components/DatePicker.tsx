import DatePickerComp from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'

interface Props {
  label: string
  control: any
  name: string
  error?: boolean
  errorMessage?: string
}

export const DatePicker = ({
  label,
  control,
  name,
  error = false,
  errorMessage = '',
}: Props) => {
  return (
    <>
      <div className="my-2 flex flex-col">
        <label className="block text-xs font-bold text-gray-700">{label}</label>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePickerComp
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              onChange={date => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        <ErrorMessage error={error} errorMessage={errorMessage} />
      </div>
    </>
  )
}
