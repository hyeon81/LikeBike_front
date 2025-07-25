import { useState } from "react";
import ReactModal from "react-modal";

interface ButtonModalProps {
  title: string; // Title for the modal
  contents: string[]; // Contents for the modal
  buttonText: string; // Text for the button
  onClickButton: () => void; // Optional click handler for the button
  isOpen: boolean; // Optional prop to control modal visibility
}

const ButtonModal = ({
  title,
  contents,
  buttonText,
  onClickButton,
  isOpen,
}: ButtonModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Bike Count Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          zIndex: 40,
          width: "80%",
          maxWidth: "400px",
          height: "auto",
          padding: 0,
          boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)",
        },
        overlay: {
          zIndex: 30,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="p-6 flex flex-col text-center">
        <div className="flex flex-col gap-1 mb-8">
          <strong className="text-lg">{title}</strong>
          <div>
            {contents.map((content, index) => (
              <p className="text-sm" key={index}>
                {content}
              </p>
            ))}
          </div>
        </div>
        <button
          className="bg-black text-white py-2 px-4 rounded-lg cursor-pointer"
          onClick={onClickButton}
        >
          {buttonText}
        </button>
      </div>
    </ReactModal>
  );
};

export default ButtonModal;
