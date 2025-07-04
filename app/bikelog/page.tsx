"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@/components/common/Button";

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
        <div>
          - [6시 ~ 22시] 사이에 [1시간 이상] 자전거 타기
          <br />
          - [자전거 타기 시작/종료 시] 인증하기 버튼 누르기
          <br />- 버튼을 누른 후 [안전모, 자전거] 촬영하기
        </div>

        <div>인증하기 예시</div>
        {[1, 2, 3, 4].map((v) => (
          <div className="w-24 h-8 bg-black relative">
            <div className="absolute w-full bottom-0">O</div>
          </div>
        ))}
        <Button>자전거 타기 인증하기</Button>
      </TabPanel>
      <TabPanel value="2">내역보기</TabPanel>
    </TabContext>
    // <div>
    //   <div>여러분의 안전한 라이딩을 인증해주세요!</div>
    //   <label htmlFor="file">
    //     <Button>파일 업로드</Button>
    //   </label>
    //   <input
    //     type="file"
    //     id="file"
    //     accept="image/*"
    //     capture="environment"
    //     onChange={(e) => console.log("e", e)}
    //   />
    // </div>
  );
}
