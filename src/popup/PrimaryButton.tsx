type propType = {
  text: string
}

function PrimaryButton({ text }: propType) {
  return (
    <button className="w-fit rounded-sm bg-orange-400 p-1 text-xl font-semibold">
      {text}
    </button>
  )
}

// make root component exported to meet `isReactRefreshBoundary`
// https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/52cd3a7f2e594fce187d3f1e0c32d201da798376/lib/runtime/RefreshUtils.js#L185
export default PrimaryButton
