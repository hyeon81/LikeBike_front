import ReactModal from "react-modal";

interface CommonModalProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: ReactModal.Styles;
  children: React.ReactNode;
}

const CommonModal = ({
  modalIsOpen,
  afterOpenModal,
  closeModal,
  customStyles,
  children,
}: CommonModalProps) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "460px",
          width: "90%",
          padding: "20px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        ...customStyles,
      }}
    >
      {children}
    </ReactModal>
  );
};

export default CommonModal;
