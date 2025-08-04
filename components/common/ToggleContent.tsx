import Image from 'next/image'
import { useState } from 'react'

interface ToggleContentProps {
  title: string
  defaultValue?: boolean
  children: React.ReactNode
}

const ToggleContent = ({
  title,
  defaultValue,
  children,
}: ToggleContentProps) => {
  const [open, setOpen] = useState(defaultValue)

  return (
    <div className="flex flex-col gap-1">
      <div
        className="cursor-pointer flex flex-row gap-2"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <Image
            alt="arrow up"
            height={24}
            src="/icons/upArrow.svg"
            width={24}
          />
        ) : (
          <Image
            alt="arrow down"
            height={24}
            src="/icons/downArrow.svg"
            width={24}
          />
        )}
        {title}
      </div>
      {open && children}
    </div>
  )
}

export default ToggleContent
