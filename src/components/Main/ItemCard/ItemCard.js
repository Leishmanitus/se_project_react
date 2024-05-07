import { useContext, useEffect, useState } from "react";
import "./ItemCard.css";
import heartImage from "../../../images/like-heart.svg";
import filledHeartImage from "../../../images/filled-like-heart.svg";
import ModalContext from "../../../contexts/ModalContext";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ItemCard({ card }) {
  const { user, isLoggedIn } = useContext(CurrentUserContext);
  const { handleItemClick, handleCardLike } = useContext(ModalContext);

  const [ isLiked, setIsLiked ] = useState();

  const handleClick = () => {
    handleItemClick(card, "preview");
  };

  const handleLikeButton = () => {
    console.log(card.owner);
    handleCardLike({ _id: card._id, isLiked });
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (card.likes.length > 0) {
      setIsLiked(true);
    }
  }, []);

  return (
    <div className="card" onClick={() => handleClick()}>
      <img className="card__image" src={card.imageUrl} alt={card.name} />
      <div className="card__title-frame">
        <h3 className="card__title">{card.name}</h3>
        {isLoggedIn && <img className={`card__toggle ${
          isLiked ? "card__toggle_on" : ""}`}
          src={isLiked ? filledHeartImage : heartImage} alt={"❤"}
          onClick={(event) => {
            event.stopPropagation();
            handleLikeButton();
          }}
        />}
      </div>
    </div>
  );
}

export default ItemCard;
