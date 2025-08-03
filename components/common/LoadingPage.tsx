import { CircularProgress } from '@mui/material'

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CircularProgress />
    </div>
  )
}

export default LoadingPage
