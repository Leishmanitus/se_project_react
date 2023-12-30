import { useContext } from "react";
import "./ConfirmationModal.css";
import ModalContext from "../../contexts/ModalContext";
import { useEscape } from "../../hooks/useEscape";

const ConfirmationModal = ({ itemId, handleDeleteItem }) => {
  const { handleClose, modalOptions, isLoading } = useContext(ModalContext);
  const { title, message, confirmText, cancelText, loadingText } =
    modalOptions.confirmationOptions;

  useEscape(handleClose);

  return (
    <div className={`modal modal_type_${title}`}>
      <div className={`modal__container modal__container_type_${title}`}>
        <p className="modal__message">{message}</p>
        <button
          className="modal__confirm-button"
          type="button"
          onClick={() => handleDeleteItem(itemId)}
        >
          {isLoading ? loadingText : confirmText}
        </button>
        <button
          className="modal__cancel-button"
          type="button"
          onClick={handleClose}
        >
          {cancelText}
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
