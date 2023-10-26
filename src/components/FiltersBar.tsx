import { AiFillCloseCircle } from 'react-icons/ai'
import FilterOptions from './FilterOptions'
import { DateTime } from 'luxon'

interface Props {
  onClose: () => void
  onFilter: (property: string, value: string | Date | DateTime) => void
  getAll: () => void
}

export const FiltersBar = ({ onClose, onFilter, getAll }: Props) => {
  return (
    <div className="w-screen h-screen bg-blackCustom bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center p-4">
      <div className="content px-5 py-3 bg-white flex flex-col items-center justify-center rounded-lg w-auto gap-3">
        <span
          className="place-self-end text-3xl cursor-pointer"
          onClick={onClose}
        >
          <AiFillCloseCircle />
        </span>
        <FilterOptions onFilter={onFilter} close={onClose} />
        <button
          className="w-full text-center bg-gray-500 py-2 rounded-lg font-bold text-white"
          type="button"
          onClick={getAll}
        >
          Get all
        </button>
      </div>
    </div>
  )
}
