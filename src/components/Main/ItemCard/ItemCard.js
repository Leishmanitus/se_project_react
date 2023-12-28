import { useContext } from "react";
import "./ItemCard.css";
import ClothingItemContext from "../../../contexts/ModalContext";

function ItemCard({ card }) {
  const { handleItemClick } = useContext(ClothingItemContext);
  return (
    <div className="card" onClick={() => handleItemClick(card)}>
      <img className="card__image" src={card.imageUrl} alt={card.name} />
      <div className="card__title-frame">
        <h3 className="card__title">{card.name}</h3>
      </div>
    </div>
  );
}

export default ItemCard;
