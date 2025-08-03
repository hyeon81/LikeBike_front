import Image from 'next/image'

const ScoreLabel = ({ text }: { text: string }) => {
  return (
    <div className="absolute flex flex-col justify-center items-center top-[-4px] right-7">
      <Image alt="union" height={41} src="/icons/union.svg" width={54} />
      <div className="absolute top-2 text-white text-xs">{text}</div>
    </div>
  )
}

export default ScoreLabel
