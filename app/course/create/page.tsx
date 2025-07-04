"use client";

import KakaoMapSearchList from "@/components/course/KakaoMapSearchList";
import { useState } from "react";
import ReactModal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@/components/common/Button";
import ShowCourse from "@/components/course/ShowCourse";

interface Position {
  lat: number;
  lng: number;
  address: string;
}

interface Props {
  name: string;
  position: Position;
  setPosition: (position: Position) => void;
}

const PositionInput = ({ name, position, setPosition }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <label>{name}</label>
      <input
        type="text"
        className="border"
        value={position.address}
        onClick={() => setOpen(true)}
        readOnly
      />
      {open && (
        <ReactModal
          isOpen={open}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={{
            content: {
              maxWidth: "480px",
              height: "100vh",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
            },
          }}
          contentLabel="Example Modal"
        >
          <div className="flex flex-row justify-between">
            <div onClick={() => setOpen(false)}>
              <CloseIcon />
            </div>
            <Button onClick={() => setOpen(false)}>선택</Button>
          </div>
          <KakaoMapSearchList setPosition={setPosition} />
        </ReactModal>
      )}
    </div>
  );
};

const CreateCourse = () => {
  const [startPosition, setStartPosition] = useState({
    lat: 0,
    lng: 0,
    address: "",
  });
  const [midPosition, setMidPosition] = useState({
    lat: 0,
    lng: 0,
    address: "",
  });
  const [endPosition, setEndPosition] = useState({
    lat: 0,
    lng: 0,
    address: "",
  });
  const [showResult, setShowResult] = useState(false);

  return (
    <>
      {!showResult ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <PositionInput
            name="출발지"
            position={startPosition}
            setPosition={setStartPosition}
          />
          <PositionInput
            name="경유지"
            position={midPosition}
            setPosition={setMidPosition}
          />
          <PositionInput
            name="도착지"
            position={endPosition}
            setPosition={setEndPosition}
          />

          <Button
            onClick={() => {
              setShowResult(true);
            }}
          >
            다음으로
          </Button>
        </div>
      ) : (
        <ShowCourse
          startPosition={startPosition}
          midPosition={midPosition}
          endPosition={endPosition}
        />
      )}
    </>
  );
};

export default CreateCourse;
