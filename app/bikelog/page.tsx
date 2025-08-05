'use client'

import * as React from 'react'

import BikeLogGuide from '@/components/bikelog/BikeLogGuide'
import BikeLogList from '@/components/bikelog/BikeLogList'
import TabList from '@/components/common/TabList'

export default function Home() {
  const [value, setValue] = React.useState(1)

  return (
    <div>
      <div className="flex">
        <TabList active={value == 1} onClick={() => setValue(1)}>
          인증
        </TabList>
        <TabList active={value == 2} onClick={() => setValue(2)}>
          인증 내역
        </TabList>
      </div>
      <div className="bg-white p-4 default-border">
        {value == 1 ? <BikeLogGuide setValue={setValue} /> : <BikeLogList />}
      </div>
    </div>
  )
}
