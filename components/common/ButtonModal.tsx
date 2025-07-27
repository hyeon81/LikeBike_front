import { useState } from "react";
import ReactModal from "react-modal";
import CommonModal from "./CommonModal";

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
    <CommonModal modalIsOpen={isOpen}>
      <div className="flex flex-col text-center">
        <div className="flex flex-col gap-1 mb-6">
          <strong className="text-xl">{title}</strong>
          <div className="flex flex-col gap-1 mt-1">
            {contents.map((content, index) => (
              <li className="text-xs font-normal" key={index}>
                {content}
              </li>
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
    </CommonModal>
  );
};

export default ButtonModal;
