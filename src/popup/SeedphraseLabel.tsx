type propType = {
  text: string
}

function SeedPhraseLabel({ text }: propType) {
  return (
    <div className="w-full rounded-sm bg-gray-400 p-1 px-2 text-xl font-light text-black">
      {text}
    </div>
  )
}

export default SeedPhraseLabel
