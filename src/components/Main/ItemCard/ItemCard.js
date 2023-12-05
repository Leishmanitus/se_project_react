import "./ItemCard.css";

function ItemCard({ card, onCardClick }) {
  return (
    <div className="card" onClick={onCardClick}>
      <img className="card__image" src={card.link} alt={card.name} />
      <div className="card__title-frame">
        <h3 className="card__title">{card.name}</h3>
      </div>
    </div>
  );
}

export default ItemCard;
