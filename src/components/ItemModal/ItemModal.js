import "./ItemModal.css";

const ItemModal = ({ selectedCard, handleClose, onCardDelete }) => {
  return (
    <div className="modal">
      <div className="modal__container modal__container_type_preview">
        <button
          className="modal__close-button modal__close-button_type_preview"
          onClick={handleClose}
        ></button>
        <img
          className="modal__image"
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="modal__group">
          <div className="modal__info">
            <p className="modal__title_type_preview">{selectedCard.name}</p>
            <p className="modal__weather">Weather: {selectedCard.weather}</p>
          </div>
          <button className="modal__delete-button" onClick={onCardDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
