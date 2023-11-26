import "./ItemCard.css";
import { createItemCard } from "../../../utils/factories";

function ItemCard({ temperature }) {
  return (
    <section className="items">
      <p className="items__message">
        Today is {temperature}° F / You may want to wear:
      </p>
      {createItemCard()}
      <div className="items__cards"></div>
    </section>
  );
}

export default ItemCard;
