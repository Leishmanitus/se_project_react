import { useContext } from "react";
import "./ConfirmationModal.css";
import ModalContext from "../../contexts/ModalContext";

const ConfirmationModal = ({ itemId, handleClose, handleDeleteItem }) => {
  const { modalOptions } = useContext(ModalContext);
  const { title, message, confirmButton, cancelButton } =
    modalOptions.confirmationOptions;

  const handleDelete = (event, itemId) => {
    event.preventDefault();
    handleDeleteItem(itemId);
    handleClose();
  };

  return (
    <div className={`modal modal_type_${title}`}>
      <div className={`modal__container modal__container_type_${title}`}>
        <p className="modal__message">{message}</p>
        <button
          className="modal__confirm-button"
          type="submit"
          onClick={(event) => handleDelete(event, itemId)}
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
