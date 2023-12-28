import { useContext } from "react";
import "./ItemModal.css";
import ModalContext from "../../contexts/ModalContext";

const ItemModal = ({ selectedItem, handleClose }) => {
  const { handleModalChange, modalOptions } = useContext(ModalContext);
  const { name, deleteButton } = modalOptions.previewOptions;

  return (
    <div className={`modal modal_type_${name}`}>
      <div className={`modal__container modal__container_type_${name}`}>
        <button
          className={`modal__close-button modal__close-button_type_${name}`}
          onClick={handleClose}
        ></button>
        <img
          className="modal__image"
          src={selectedItem.imageUrl}
          alt={selectedItem.name}
        />
        <div className="modal__group">
          <div className="modal__info">
            <p className="modal__title_type_preview">{selectedItem.name}</p>
            <p className="modal__weather">Weather: {selectedItem.weather}</p>
          </div>
          <button
            className="modal__delete-button"
            onClick={() => handleModalChange("confirm")}
          >
            {deleteButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
