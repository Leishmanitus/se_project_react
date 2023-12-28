import { useContext } from "react";
import "./ConfirmationModal.css";
import ModalContext from "../../contexts/ModalContext";

const ConfirmationModal = ({ selectedItem, handleClose, handleDeleteItem }) => {
  const { modalOptions } = useContext(ModalContext);
  const { name, message, confirmButton, cancelButton } =
    modalOptions.confirmationOptions;

  return (
    <div className={`modal modal_type_${name}`}>
      <div className={`modal__container modal__container_type_${name}`}>
        <p className="modal__message">{message}</p>
        <button
          className="modal__confirm-button"
          type="submit"
          onClick={(event) => handleDeleteItem(event, selectedItem)}
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
