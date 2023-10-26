import { Game, GameType } from '../interfaces/Game.interface'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { Input } from './Input'
import { Select } from './Select'
import { DatePicker } from './DatePicker'
import { AiFillCloseCircle } from 'react-icons/ai'

interface Props {
  gameSelected?: Game
  onClose: () => void
  onSend: (game: Game) => void
}

const GameTypeOptions = [
  {
    label: 'Regular Season',
    value: 'REGULAR_SEASON',
  },
  {
    label: 'Playoff',
    value: 'PLAYOFF',
  },
]

interface Inputs {
  name: string
  date: Date
  city: string
  home: string
  away: string
  gameType: string
}

export const Modal = ({
  gameSelected = {} as Game,
  onClose,
  onSend,
}: Props) => {
  const schema = yup.object({
    name: yup.string().required(),
    date: yup.date().required(),
    city: yup.string().required(),
    home: yup.string().required(),
    away: yup.string().required(),
    gameType: yup.mixed<GameType>().oneOf(Object.values(GameType)).required(),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: gameSelected?.name || '',
      city: gameSelected?.city || '',
      home: gameSelected?.home || '',
      away: gameSelected?.away || '',
      date: gameSelected?.date || '',
      gameType: gameSelected?.gameType || '',
    },
  })

  const closeForm = () => {
    clearErrors()
    reset()
    onClose()
  }

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data)
    onSend(data as Game)
    closeForm()
  }

  return (
    <div className="w-screen h-screen bg-blackCustom bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center p-4">
      <div className="content p-3 bg-white flex flex-col items-center justify-center w-full max-w-[28.125rem] rounded-lg">
        <span
          className="place-self-end text-3xl cursor-pointer"
          onClick={closeForm}
        >
          <AiFillCloseCircle />
        </span>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            placeholder="Name"
            register={register}
            name="name"
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            label="City"
            placeholder="City"
            register={register}
            name="city"
            error={!!errors.city}
            errorMessage={errors.city?.message}
          />
          <Input
            label="Home"
            placeholder="Home"
            register={register}
            name="home"
            error={!!errors.home}
            errorMessage={errors.home?.message}
          />
          <Input
            label="Away"
            placeholder="Away"
            register={register}
            name="away"
            error={!!errors.away}
            errorMessage={errors.away?.message}
          />
          <Select
            label="Game Type"
            register={register}
            name="gameType"
            options={GameTypeOptions}
            error={!!errors.gameType}
            errorMessage={errors.gameType?.message}
          />
          <DatePicker
            label="Date"
            control={control}
            name={'date'}
            error={!!errors.date}
            errorMessage={errors.date?.message}
          />
          <button
            className="w-full mt-4 text-center bg-blueDarkCustom py-2 rounded-lg font-bold text-white"
            type="submit"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  )
}
