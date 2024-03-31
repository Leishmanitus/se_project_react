import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import { useContext } from "react";
import ModalContext from "../../../contexts/ModalContext";

const ClothesSection = ({ clothingItems }) => {
  const { handleModalChange } = useContext(ModalContext);
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
        {clothingItems.map((card) => {
          <ItemCard key={card._id} card={card} />
        })}
      </div>
    </>
  );
};

export default ClothesSection;
