import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import { useCallback, useContext } from "react";
import ModalContext from "../../../contexts/ModalContext";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const ClothesSection = () => {
  const { handleModalChange } = useContext(ModalContext);
  const { user, clothingItems, isLoggedIn } = useContext(CurrentUserContext);

  const handleRenderItems = useCallback(() => {
    return clothingItems
      .filter((card) => user._id === card?.owner)
      .map((filteredCard, index) => {
        return <ItemCard key={index} card={filteredCard} />
      })
  }, [clothingItems, isLoggedIn]);

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
        {
          isLoggedIn && handleRenderItems()
        }
      </div>
    </>
  );
};

export default ClothesSection;
