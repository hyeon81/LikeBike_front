const BubbleChat = ({
  text,
  isPrimary,
  isRight,
}: {
  text: string
  isPrimary?: boolean
  isRight?: boolean
}) => {
  return (
    <div className="relative flex justify-center z-20 mb-7 ">
      <div
        className={`${isPrimary ? 'bg-secondary-light' : 'bg-text-primary'} rounded-4xl px-4 py-2 ${isPrimary ? 'text-black' : 'text-white'} shadow-md max-w-md absolute top-0 left-0 whitespace-nowrap`}
      >
        {text}
        <span
          className={
            isRight
              ? `absolute right-10 -bottom-4 w-0 h-0 border-r-[16px] border-r-transparent border-l-transparent border-t-[16px] ${isPrimary ? 'border-t-secondary-light' : 'border-t-text-primary'}`
              : `absolute left-10 -bottom-4 w-0 h-0 border-l-[16px] border-l-transparent  border-r-transparent border-t-[16px] ${isPrimary ? 'border-t-secondary-light' : 'border-t-text-primary'}`
          }
        ></span>
      </div>
    </div>
  )
}

export default BubbleChat
