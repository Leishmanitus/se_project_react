import { useContext, useState } from "react";
import "./ItemCard.css";
import heartImage from "../../../images/like-heart.svg"
import ModalContext from "../../../contexts/ModalContext";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ItemCard({ card }) {
  const { user } = useContext(CurrentUserContext);
  const { handleItemClick, handleCardLike } = useContext(ModalContext);

  const [ isLiked, setIsLiked ] = useState();

  const handleClick = () => {
    handleItemClick(card, "preview");
  };

  const handleLikeButton = () => {
    handleCardLike({ id: card._id, isLiked, token: user.token });
    setIsLiked(!isLiked);
  };

  return (
    <div className="card" onClick={() => handleClick()}>
      <img className="card__image" src={card.imageUrl} alt={card.name} />
      <div className="card__title-frame">
        <h3 className="card__title">{card.name}</h3>
        <img className={`card__toggle ${
          isLiked ? "card__toggle_on" : ""}`}
          src={heartImage} alt={"❤"}
          onClick={(event) => {
            event.stopPropagation();
            handleLikeButton();
          }}
        />
      </div>
    </div>
  );
}

export default ItemCard;
