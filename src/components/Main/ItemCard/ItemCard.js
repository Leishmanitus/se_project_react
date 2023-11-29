import "./ItemCard.css";
import { createItemCards } from "../../../utils/factories";
import { defaultClothingItems } from "../../../utils/constants";

function ItemCard({ temperature }) {
  return (
    <section className="items">
      <p className="items__message">
        Today is {temperature}° F / You may want to wear:
      </p>
      <div className="items__cards">
        {createItemCards(defaultClothingItems, temperature)}
      </div>
    </section>
  );
}

export default ItemCard;
