import Image from 'next/image'

import MainBase from './MainBase'

function BikeLogMain() {
  return (
    <MainBase
      chipTitle="매일"
      path="/bikelog"
      scoreText="+30점"
      title="자전거 타기 인증"
    >
      <div className="mt-5">
        <Image alt="bike" height={100} src="/icons/bike.svg" width={100} />
      </div>
    </MainBase>
  )
}

export default BikeLogMain
