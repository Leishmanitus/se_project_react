import { useContext } from "react";
import "./ConfirmationModal.css";
import ModalContext from "../../contexts/ModalContext";
import { useEscape } from "../../hooks/useEscape";

const ConfirmationModal = ({ itemId, handleDeleteItem }) => {
  const { handleClose, modalOptions } = useContext(ModalContext);
  const { title, message, confirmButton, cancelButton } =
    modalOptions.confirmationOptions;

  const handleDelete = (itemId) => {
    handleDeleteItem(itemId);
  };

  useEscape(handleClose);

  return (
    <div className={`modal modal_type_${title}`}>
      <div className={`modal__container modal__container_type_${title}`}>
        <p className="modal__message">{message}</p>
        <button
          className="modal__confirm-button"
          type="button"
          onClick={() => handleDelete(itemId)}
        >
          {confirmButton}
        </button>
        <button
          className="modal__cancel-button"
          type="button"
          onClick={handleClose}
        >
          {cancelButton}
        </button>
        <button
          className="modal__close-button"
          type="button"
          onClick={handleClose}
        ></button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
