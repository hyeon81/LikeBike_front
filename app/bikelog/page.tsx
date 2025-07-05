"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@/components/common/Button";
import BikeLogMain from "@/components/bikelog/BikeLogGuide";
import BikeLogGuide from "@/components/bikelog/BikeLogGuide";
import BikeLogList from "@/components/bikelog/BikeLogList";

export default function Home() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="인증하기" value="1" />
          <Tab label="내역보기" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <BikeLogGuide />
      </TabPanel>
      <TabPanel value="2">
        <BikeLogList />
      </TabPanel>
    </TabContext>
    // <div>
    //   <div>여러분의 안전한 라이딩을 인증해주세요!</div>
  );
}
