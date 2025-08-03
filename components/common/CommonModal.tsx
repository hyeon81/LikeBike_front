import ReactModal from 'react-modal'

interface CommonModalProps {
  modalIsOpen: boolean
  customStyles?: ReactModal.Styles
  children: React.ReactNode
}

const CommonModal = ({
  modalIsOpen,
  customStyles,
  children,
}: CommonModalProps) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 40,
          width: '80%',
          maxWidth: '400px',
          height: 'auto',
          padding: '1rem',
          paddingTop: '1.5rem',
          boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.5)',
          wordBreak: 'keep-all',
        },
        overlay: {
          zIndex: 30,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      {children}
    </ReactModal>
  )
}

export default CommonModal
