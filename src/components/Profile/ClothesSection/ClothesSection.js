import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import { useContext } from "react";
import ClothingItemContext from "../../../contexts/ClothingItemContext";

const ClothesSection = (onCardClick, onCardDelete, onAddItem) => {
  const { clothingItems } = useContext(ClothingItemContext);

  return (
    <>
      <div className="clothes__message-group">
        <p className="clothes__message">Your Items</p>
        <button
          className="clothes__button_type_add-item"
          type="button"
          onClick={() => onAddItem("garment")}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__items">
        {clothingItems.map((card) => (
          <ItemCard
            key={card._id}
            card={card}
            onCardClick={() => onCardClick(card)}
            onCardDelete={() => onCardDelete(card)}
          />
        ))}
      </div>
    </>
  );
};

export default ClothesSection;
