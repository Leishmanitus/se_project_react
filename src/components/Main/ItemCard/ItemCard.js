import { useContext } from "react";
import "./ItemCard.css";
import ModalContext from "../../../contexts/ModalContext";

function ItemCard({ card }) {
  const { handleItemClick } = useContext(ModalContext);

  const handleClick = () => {
    handleItemClick(card, "preview");
  };

  return (
    <div className="card" onClick={() => handleClick()}>
      <img className="card__image" src={card.imageUrl} alt={card.name} />
      <div className="card__title-frame">
        <h3 className="card__title">{card.name}</h3>
      </div>
    </div>
  );
}

export default ItemCard;
