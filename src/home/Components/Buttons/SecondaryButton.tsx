type propType = {
  text: string
  onClick?: () => void
}

function SecondaryButton({ text, onClick }: propType) {
  return (
    <button
      className="w-fit rounded-sm bg-red-400 p-1 px-2 text-xl font-light"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default SecondaryButton
