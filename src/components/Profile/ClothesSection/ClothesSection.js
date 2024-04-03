import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import { useContext } from "react";
import ModalContext from "../../../contexts/ModalContext";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const ClothesSection = () => {
  const { handleModalChange } = useContext(ModalContext);
  const { user, clothingItems } = useContext(CurrentUserContext);
  return (
    <>
      <div className="clothes__message-group">
        <p className="clothes__message">Your Items</p>
        <button
          className="clothes__button_type_add-item"
          type="button"
          onClick={() => handleModalChange("garment")}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__items">
        {Array.prototype.filter.call(clothingItems, (card) => user._id === card.owner).map((card) => (<ItemCard key={card._id} card={card} />))}
      </div>
    </>
  );
};

export default ClothesSection;
