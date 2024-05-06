import { useContext } from "react";
import "./ConfirmationModal.css";
import ModalContext from "../../contexts/ModalContext";
import { useEscape } from "../../hooks/useEscape";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ConfirmationModal = () => {
  const { user } = useContext(CurrentUserContext);
  const { handleClose, modalOptions, isLoading, handleDeleteItem, selectedItem } = useContext(ModalContext);
  const { confirmFormName, confirmMessage, confirmText, confirmCancelText, confirmLoadingText } = modalOptions.confirmationOptions;

  useEscape(handleClose);

  return (
    <div className={`modal modal_type_${confirmFormName}`}>
      <div className={`modal__container modal__container_type_${confirmFormName}`}>
        <p className="modal__message">{confirmMessage}</p>
        <button
          className="modal__confirm-button"
          type="button"
          onClick={() => handleDeleteItem(selectedItem._id, user.token)}
        >
          {isLoading ? confirmLoadingText : confirmText}
        </button>
        <button
          className="modal__cancel-button"
          type="button"
          onClick={handleClose}
        >
          {confirmCancelText}
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
