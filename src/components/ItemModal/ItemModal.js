import { useContext } from "react";
import "./ItemModal.css";
import ModalContext from "../../contexts/ModalContext";
import { useEscape } from "../../hooks/useEscape";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedItem }) => {
  const { handleClose, handleItemClick, modalOptions } =
    useContext(ModalContext);
  const { user } = useContext(CurrentUserContext);
  
  const { title, deleteButton } = modalOptions.previewOptions;
  const isOwn = selectedItem.owner === user._id;
  const modalDeleteButtonClassName = (
    `modal__delete-button ${isOwn ? 'modal__delete-button_visible' : 'modal__delete-button_hidden'}`
  );

  const { _id, name, imageUrl, weather } = selectedItem;

  useEscape(handleClose);

  return (
    <div className={`modal modal_type_${title}`}>
      <div className={`modal__container modal__container_type_${title}`}>
        <button
          className={`modal__close-button modal__close-button_type_${title}`}
          onClick={handleClose}
        ></button>
        <img className="modal__image" src={imageUrl} alt={name} />
        <div className="modal__group">
          <div className="modal__info">
            <p className="modal__title_type_preview">{name}</p>
            <p className="modal__weather">Weather: {weather}</p>
          </div>
          <button
            className={modalDeleteButtonClassName}
            onClick={() =>
              handleItemClick({ _id, name, imageUrl, weather }, "confirm")
            }
          >
            {deleteButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
