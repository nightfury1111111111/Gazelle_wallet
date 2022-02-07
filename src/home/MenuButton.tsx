type propType = {
  text: string
  onClick?: () => void
  isActive: boolean
}

function MenuButton({ text, onClick, isActive }: propType) {
  const buttonColor = isActive ? 'bg-blue-400' : 'bg-gray-400'

  return (
    <button
      className={`isActive ? w-fit rounded-md ${buttonColor} p-1 px-2 text-xl font-light`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default MenuButton
