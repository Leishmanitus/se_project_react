import "./ItemModal.css";

const ItemModal = ({ selectedCard, handleClose }) => {
  return (
    <div className="preview">
      <div className="preview__container">
        <img className="preview__image" src={selectedCard.link} />
        <div className="preview__info">
          <p className="preview__title">{selectedCard.name}</p>
          <p className="preview__weather">Weather: {selectedCard.weather}</p>
        </div>
        <button
          className="preview__close-button"
          onClick={handleClose}
        ></button>
      </div>
    </div>
  );
};

export default ItemModal;
