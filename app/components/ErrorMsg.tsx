const ErrorMsg = ({error}: {error: any }) => {
  return (
    <span className="text-red-500 font-normal">{error}</span>
  )
}

export default ErrorMsg;
