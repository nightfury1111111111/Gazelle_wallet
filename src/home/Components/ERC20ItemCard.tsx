const thumbnail_replacement = chrome.runtime.getURL('images/uk_heart.png')

import { ERC20BalanceItem } from '@/lib/types'

type propType = {
  ERC20Item: ERC20BalanceItem
}

// const iconPending = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-6 w-6 animate-spin text-purple-700"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// )

// const iconFailed = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-6 w-6 text-red-700"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// )

function ERC20ItemCard({ ERC20Item }: propType) {
  const thumbnail =
    ERC20Item.thumbnail !== null ? ERC20Item.thumbnail : thumbnail_replacement
  return (
    <div className="flex flex-row">
      <div>
        <img
          src={thumbnail}
          alt="Picture of the author"
          width="50px"
          height="50px"
        />
      </div>
      <div className="ml-2 flex items-center justify-center ">
        <div className="text-xl font-semibold">
          {ERC20Item.balance / 10 ** ERC20Item.decimals}
        </div>
      </div>
      <div className="ml-2 flex items-center justify-center">
        <div className="text-xl font-semibold">{ERC20Item.symbol}</div>
      </div>
    </div>
  )
}

export default ERC20ItemCard
