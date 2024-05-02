import { useContext } from "react";
import "./ItemModal.css";
import ModalContext from "../../contexts/ModalContext";
import { useEscape } from "../../hooks/useEscape";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = () => {
  const { handleClose, handleModalChange, modalOptions, selectedItem } = useContext(ModalContext);
  const { user } = useContext(CurrentUserContext);

  const { name, imageUrl, weather, owner } = selectedItem;
  const { previewFormName, previewDeleteButton } = modalOptions.previewOptions;
  const isOwn = owner._id === user._id;
  const modalDeleteButtonClassName = (
    `modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`
  );


  useEscape(handleClose);

  return (
    <div className={`modal modal_type_${previewFormName}`}>
      <div className={`modal__container modal__container_type_${previewFormName}`}>
        <button
          className={`modal__close-button modal__close-button_type_${previewFormName}`}
          onClick={handleClose}
        ></button>
        <img className="modal__image" src={imageUrl} alt={name} />
        <div className="modal__group">
          <div className="modal__info">
            <p className="modal__title_type_preview">{name}</p>
            <p className="modal__weather">Weather: {weather}</p>
          </div>
          {isOwn && <button
            className={`modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`}
            onClick={() => handleModalChange("confirm")}
          >
            {previewDeleteButton}
          </button>}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
