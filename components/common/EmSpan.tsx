import { ReactNode } from 'react'

const EmSpan = ({ children }: { children: ReactNode }) => {
  return <span className="emphasis">{children}</span>
}

export default EmSpan
