import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

interface UploadModalProps {
  upload: {
    title: string; // Title for the upload modal
    contents: string[]; // Contents for the upload modal
    isOpen: boolean; // Is the upload modal open
    setOpen?: (open: boolean) => void; // Optional function to set the open state
  };
  confirm: {
    title: string; // Title for the confirm modal
    onOk: (file: File) => void; // OK button handler
  };
  prefix?: string; // Optional prefix for the modal
}

const UploadModal = ({
  upload: { title, contents, isOpen, setOpen },
  confirm: { title: confirmTitle, onOk },
  prefix,
}: UploadModalProps) => {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const newFile = target.files[0];
        const newUrl = URL.createObjectURL(newFile);
        const oldUrl = preview;
        setPreview(newUrl);
        URL.revokeObjectURL(oldUrl); // Clean up old URL
        setFile(newFile);
        setConfirmOpen(true);
      }
    }
  };

  // useEffect(() => {
  //   window.addEventListener("cameraResult", (e) => {
  //     const photo = e.detail;
  //     console.log("사진 데이터:", photo);
  //     alert(photo);
  //   });

  //   return () => {
  //     window.removeEventListener("cameraResult", (e) => {});
  //     if (preview) URL.revokeObjectURL(preview);
  //   };
  // }, []);
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, []);

  return (
    <>
      <ReactModal
        contentLabel="Bike Count Modal"
        isOpen={isOpen}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            zIndex: 40,
            width: "90%",
            maxWidth: "400px",
            height: "auto",
            padding: 0,
            boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.5)",
          },
          overlay: {
            zIndex: 30,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="p-6 flex flex-col text-center">
          <div className="cursor-pointer absolute top-2 right-2 z-10 px-4 py-2">
            <CloseIcon onClick={() => setOpen?.(false)} />
          </div>
          <div className="flex flex-col gap-1 mb-6">
            <strong className="text-lg">{title}</strong>
            <div>
              {contents?.map((content, index) => <p key={index}>{content}</p>)}
            </div>
          </div>
          {/* <div
            className="bg-primary text-white py-2 px-4 rounded-lg cursor-pointer"
            onClick={() => {
              (window as any)?.ReactNativeWebView?.postMessage("openCamera");
            }}
          >
            사진 촬영하기
          </div> */}
          <label
            className="bg-primary text-white py-2 px-4 rounded-lg cursor-pointer"
            htmlFor={`${prefix}-image`}
          >
            사진 촬영하기
          </label>
          <input
            accept="image/*"
            // capture="environment"
            id={`${prefix}-image`}
            onChange={(e) => handleCapture(e.target)}
            style={{
              visibility: "hidden",
              position: "absolute",
              top: 0,
            }}
            type="file"
          />
        </div>
      </ReactModal>
      <ReactModal
        contentLabel="Bike Count Modal"
        isOpen={confirmOpen}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            zIndex: 60,
            width: "90%",
            maxWidth: "400px",
            height: "auto",
            padding: 0,
          },
          overlay: {
            zIndex: 50,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="text-lg flex flex-col">
          <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col items-center">
              <strong>아래 사진으로</strong>
              <strong>{confirmTitle}</strong>
            </div>
            <img
              alt="snap"
              className="bg-gray-200 min-h-[200px]"
              height="100%"
              src={preview}
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
              width="100%"
            />
          </div>
          <div className="border-t border-gray-300 flex flex-row w-full h-full">
            <div
              className="flex-1 flex justify-center items-center p-4 border-r border-gray-300 cursor-pointer
            hover:bg-gray-100"
              onClick={() => setConfirmOpen(false)}
            >
              아니오
            </div>
            <div
              className="flex-1 flex justify-center items-center p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                if (file) {
                  setConfirmOpen(false);
                  onOk(file);
                } else alert("파일이 업로드 되지 않았습니다");
              }}
            >
              예
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default UploadModal;
