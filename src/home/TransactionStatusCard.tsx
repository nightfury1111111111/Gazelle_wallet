export enum TransactionStatus {
  pending = 1,
  confirmed,
  failed,
}

type propType = {
  transactionType: string
  onClick?: () => void
  transactionDate: Date
  transactionStatus: TransactionStatus
}

const iconConfirmed = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const iconPending = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 animate-spin text-purple-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const iconFailed = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-red-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

function TransactionStatusCard({
  transactionType,
  onClick,
  transactionDate,
  transactionStatus,
}: propType) {
  function TransactionIcon() {
    switch (transactionStatus) {
      case TransactionStatus.confirmed:
        return iconConfirmed
      case TransactionStatus.pending:
        return iconPending
      case TransactionStatus.failed:
        return iconFailed
    }
  }

  let transactionStatusText
  let transactionStatusTextColorClass
  if (transactionStatus == TransactionStatus.confirmed) {
    transactionStatusText = 'confirmed'
    transactionStatusTextColorClass = 'text-green-700'
  } else if (transactionStatus == TransactionStatus.pending) {
    transactionStatusText = 'pending'
    transactionStatusTextColorClass = 'text-purple-700'
  } else if (transactionStatus == TransactionStatus.failed) {
    transactionStatusText = 'failed'
    transactionStatusTextColorClass = 'text-red-700'
  }

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
  return (
    <div
      className="flex flex-row rounded-md border-2 p-2 align-baseline"
      onClick={onClick}
    >
      <div className="flex flex-col justify-center">
        <TransactionIcon></TransactionIcon>
      </div>

      <div className="grid grid-cols-3">
        <div className="flex flex-col justify-center">
          <div className="ml-2 align-bottom text-xl">{transactionType}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div
            className={`ml-2 text-xl font-bold ${transactionStatusTextColorClass}`}
          >
            {transactionStatusText}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="ml-2 text-base text-gray-700">
            {transactionDate.toLocaleDateString('en-US', options)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionStatusCard

//   className={`isActive ? w-fit rounded-md ${buttonColor} p-1 px-2 text-xl font-light`}
