function LoadingSpinner() {
  return (
    <div className="flex animate-pulse items-center justify-center space-x-2">
      <div className="h-8 w-8 rounded-full bg-black"></div>
      <div className="h-8 w-8 rounded-full bg-black"></div>
      <div className="h-8 w-8 rounded-full bg-black"></div>
    </div>
  )
}

export default LoadingSpinner
