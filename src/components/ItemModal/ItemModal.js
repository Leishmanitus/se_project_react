import { useContext } from "react";
import "./ItemModal.css";
import ModalContext from "../../contexts/ModalContext";

const ItemModal = ({ selectedItem, handleClose }) => {
  const { handleItemClick, modalOptions } = useContext(ModalContext);
  const { title, deleteButton } = modalOptions.previewOptions;

  const { _id, name, imageUrl, weather } = selectedItem;

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
            className="modal__delete-button"
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
