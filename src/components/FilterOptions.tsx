import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { GameType } from '../interfaces/Game.interface'
import { Input } from './Input'
import { DatePicker } from './DatePicker'
import { Select } from './Select'
import { GameTypeOptions } from './Modal'
import { ErrorMessage } from './ErrorMessage'
import { DateTime } from 'luxon'

type Options = 'name' | 'city' | 'home' | 'away' | 'date' | 'gameType'

interface Inputs {
  name?: string
  date?: Date
  city?: string
  home?: string
  away?: string
  gameType?: string
}

const Button = (
  onClick: (item: Options) => void,
  className: string,
  name: Options
) => {
  return (
    <button
      onClick={() => onClick(name)}
      className={`w-24 rounded-md px-2 py-1 border-2 border-blueCustom ${className}`}
    >
      {name}
    </button>
  )
}

interface Props {
  onFilter: (type: Options, data: string | Date | DateTime) => void
  close?: () => void
}

const FilterOptions = ({ onFilter, close }: Props) => {
  const [selected, setSelected] = useState<Options>('name')

  const schema = yup.object({
    name: yup.string().optional().min(3),
    date: yup.date().optional(),
    city: yup.string().optional().min(3),
    home: yup.string().optional().min(3),
    away: yup.string().optional().min(3),
    gameType: yup.mixed<GameType>().oneOf(Object.values(GameType)).optional(),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    reset,
    getFieldState,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gameType: GameType.REGULAR_SEASON,
      date: new Date(),
    },
  })

  const parseDateToFilters = (data: Inputs) => {
    const temp = data[selected] as Date
    const inputDate = new Date(temp)
    const parsedDate = DateTime.fromJSDate(inputDate)
    const iso8601DateOnlyString = parsedDate

    return iso8601DateOnlyString
  }

  const transformTextsToLowerCase = (data: Inputs) => {
    const temp = data[selected] as string
    const inputText = temp.toLowerCase()

    return inputText
  }

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    if (selected === 'date' && data[selected]) {
      const dateIso = parseDateToFilters(data)
      onFilter(selected, dateIso)
      if (close) {
        close()
        reset()
      }
    } else {
      const texts = transformTextsToLowerCase(data)
      onFilter(selected, texts)
      if (close) {
        close()
        reset()
      }
    }
  }

  const onSelect = (option: Options) => {
    setSelected(option)
    reset()
  }

  const changeBgColor = (option: Options) => {
    if (option === selected) {
      return 'bg-blueCustom text-white'
    } else {
      return 'bg-whiteCustom text-blueCustom'
    }
  }

  const createButtons = (properties: Options[]) => {
    return properties.map(property => {
      return Button(
        () => {
          onSelect(property)
          clearErrors()
          reset()
        },
        changeBgColor(property),
        property
      )
    })
  }

  const properties = [
    'name',
    'city',
    'home',
    'away',
    'date',
    'gameType',
  ] as Options[]

  return (
    <>
      <div className="grid grid-cols-2 items-center justify-center gap-2 w-full">
        {createButtons(properties).map((button, index) => (
          <div key={index}>{button}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full mt-2 flex justify-center items-center">
          {selected && selected !== 'date' && selected !== 'gameType' && (
            <div className="flex flex-col items-center justify-center">
              <Input
                label={selected}
                name={selected}
                register={register}
                error={false}
                errorMessage={errors[selected]?.message}
                placeholder={selected}
              />
              <ErrorMessage
                error={true}
                errorMessage={errors[selected]?.message || ''}
              />
            </div>
          )}
          {selected === 'date' && (
            <DatePicker
              label="Date"
              control={control}
              name={'date'}
              error={!!errors.date}
              errorMessage={errors.date?.message}
            />
          )}
          {selected === 'gameType' && (
            <div className="flex flex-col items-center justify-center">
              <Select
                label={selected}
                name={selected}
                register={register}
                error={false}
                errorMessage={errors[selected]?.message}
                options={GameTypeOptions}
              />
              {errors[selected]?.message && (
                <ErrorMessage
                  error={true}
                  errorMessage="You must select a game type"
                />
              )}
            </div>
          )}
        </div>
        <button
          className="w-full mt-4 text-center bg-blueDarkCustom py-2 rounded-lg font-bold text-white
          disabled:bg-opacity-50
          "
          type="submit"
          disabled={getFieldState(selected)?.invalid}
        >
          SEARCH
        </button>
      </form>
    </>
  )
}

export default FilterOptions
