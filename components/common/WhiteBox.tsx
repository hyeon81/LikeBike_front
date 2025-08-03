import { ReactNode } from 'react'

interface WhiteBoxProps {
  children: ReactNode
}

const WhiteBox = ({ children }: WhiteBoxProps) => {
  return (
    <div className="bg-white px-2 py-4 text-center border-[1.5px] border-gray-lightest flex flex-col gap-1">
      {children}
    </div>
  )
}

export default WhiteBox
