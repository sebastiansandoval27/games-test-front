import { AiFillPlusCircle } from 'react-icons/ai'
interface Props {
  onClick: () => void
}

export const FabButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      className="w-10 h-10 p-2 flex justify-center items-center bg-blueCustom rounded-full text-xl text-white cursor-pointer fixed bottom-20 right-5 z-50"
      onClick={onClick}
    >
      <span className="text-2xl">
        <AiFillPlusCircle />
      </span>
    </button>
  )
}
