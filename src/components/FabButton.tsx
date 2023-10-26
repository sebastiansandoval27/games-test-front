type ButtonsProps = {
  icon: React.ReactNode
  onClick: () => void
  bgColor?: string
}
interface Props {
  buttons: ButtonsProps[]
}

export const FabButton = ({ buttons }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 fixed bottom-20 right-5 z-50">
      {buttons &&
        buttons.length > 0 &&
        buttons.map(({ icon, onClick, bgColor = 'bg-blueCustom' }, index) => (
          <button
            key={`Flat-${index}`}
            type="button"
            className={`w-10 h-10 p-2 flex justify-center items-center  rounded-full text-xl text-white cursor-pointer ${bgColor}`}
            onClick={onClick}
          >
            <span className="text-2xl">{icon}</span>
          </button>
        ))}
    </div>
  )
}
