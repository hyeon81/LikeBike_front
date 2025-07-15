"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@/components/common/Button";
import BikeLogMain from "@/components/bikelog/BikeLogGuide";
import BikeLogGuide from "@/components/bikelog/BikeLogGuide";
import BikeLogList from "@/components/bikelog/BikeLogList";
import { COLORS } from "@/constant/color";

const Tab = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) => {
  return active ? (
    <div
      onClick={onClick}
      className={`flex-1 py-4 text-center font-bold bg-secondary-light rounded-t-3xl  cursor-pointer`}
    >
      {children}
    </div>
  ) : (
    <div
      onClick={onClick}
      className={`flex-1 py-4 text-center text-gray-medium font-bold bg-gray-lightest rounded-t-3xl cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [value, setValue] = React.useState(1);

  return (
    <div>
      <div className="flex">
        <Tab active={value == 1} onClick={() => setValue(1)}>
          인증하기
        </Tab>
        <Tab active={value == 2} onClick={() => setValue(2)}>
          인증 내역 보기
        </Tab>
      </div>
      <div className="bg-white p-4">
        {value == 1 ? <BikeLogGuide setValue={setValue} /> : <BikeLogList />}
      </div>
    </div>
  );
}
