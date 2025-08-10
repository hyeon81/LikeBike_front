import CommonModal from "./CommonModal";

interface ButtonModalProps {
  title: string; // Title for the modal
  contents: string[]; // Contents for the modal
  buttonText: string; // Text for the button
  onClickButton: () => void; // Optional click handler for the button
  isOpen: boolean; // Optional prop to control modal visibility
  isList?: boolean; // Optional prop to display contents as a list
  isRed?: boolean; // Optional prop to style the button
  hasBackDrop?: boolean; // Optional prop to control backdrop visibility
}

const ButtonModal = ({
  title,
  contents,
  buttonText,
  onClickButton,
  isOpen,
  isList,
  isRed,
  hasBackDrop,
}: ButtonModalProps) => {
  return (
    <CommonModal modalIsOpen={isOpen} hasBackdrop={hasBackDrop}>
      <div className="flex flex-col text-center">
        <div className="flex flex-col gap-1 mb-6">
          <strong className="text-xl">{title}</strong>
          <div className="flex flex-col mt-1">
            {contents?.map((content, index) =>
              isList ? (
                <li key={index} className="font-normal list-disc pl-4">
                  {content}
                </li>
              ) : (
                <div key={index} className="font-normal">
                  {content}
                </div>
              )
            )}
          </div>
        </div>
        <button
          className={`text-white py-2 px-4 rounded-lg cursor-pointer ${isRed ? "bg-contrast-dark" : "bg-primary"}`}
          onClick={onClickButton}
        >
          {buttonText}
        </button>
      </div>
    </CommonModal>
  );
};

export default ButtonModal;
