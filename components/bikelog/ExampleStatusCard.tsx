interface Props {
  chipText: string
  status: 'success' | 'error'
  children?: React.ReactNode
}

const ExampleStatusCard = ({ chipText, status, children }: Props) => {
  return (
    <div className="w-[120px] h-[160px] bg-black relative">
      <div className="bg-white size-fit p-1 z-10 rounded-3xl absolute top-2 left-2 text-xs font-normal">
        {chipText}
      </div>
      <div className="h-full">{children}</div>
      {status == 'success' ? (
        <div className="absolute w-full bottom-0 bg-primary text-white text-center">
          O
        </div>
      ) : (
        <div className="absolute w-full bottom-0 bg-error text-white text-center">
          X
        </div>
      )}
    </div>
  )
}

export default ExampleStatusCard
