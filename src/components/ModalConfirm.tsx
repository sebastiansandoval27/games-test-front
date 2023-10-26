interface Props {
  onConfirm: () => void
  onCancel: () => void
  title?: string
  message: string
}
export const ModalConfirm = ({
  onConfirm,
  onCancel,
  message,
  title,
}: Props) => {
  return (
    <div className="w-screen h-screen bg-blackCustom bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center p-4">
      <div className="content px-5 py-3 bg-white flex flex-col items-center justify-center rounded-lg w-auto gap-3">
        {title && <h3 className="text-center text-base">{title}</h3>}
        <p className="text-center text-blueCustom font-bold">{message}</p>
        <div className="flex items-center justify-center w-auto gap-3">
          <button
            className="w-28 p-3 rounded-md bg-gray-600 text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-28 p-3 rounded-md bg-red-400 text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
