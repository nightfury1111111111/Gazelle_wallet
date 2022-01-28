type propType = {
  text: string
  onClick?: () => void
}

function PrimaryButton({ text, onClick }: propType) {
  return (
    <button
      className="w-fit rounded-sm bg-orange-400 p-1 px-2 text-xl font-light"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default PrimaryButton
