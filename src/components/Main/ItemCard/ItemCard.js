import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import "./ItemCard.css";
import heartImage from "../../../images/like-heart.svg";
import filledHeartImage from "../../../images/filled-like-heart.svg";
import ModalContext from "../../../contexts/ModalContext";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ItemCard({ card }) {
  const { user, isLoggedIn } = useContext(CurrentUserContext);
  const { handleItemClick, handleCardLike } = useContext(ModalContext);

  const [ isLiked, setIsLiked ] = useState();

  const cardToggleName = useMemo(() => isLiked ? "card__toggle_on" : "", [isLiked]);
  const cardToggleSource = useMemo(() => isLiked ? filledHeartImage : heartImage, [isLiked]);
  const cardImage = useMemo(() => {
    return (<><img
      className={`card__toggle ${cardToggleName}`}
      src={cardToggleSource} alt={"❤"}
      onClick={(event) => {
        event.stopPropagation();
        handleLikeButton();
      }}
    /></>);
  }, [isLiked]);

  const handleClick = () => {
    handleItemClick(card, "preview");
  };

  const handleLikeButton = () => {
    handleCardLike({ _id: card._id, isLiked, setIsLiked });
  };

  useEffect(() => {
    if (card.likes.includes(user._id)) {
      setIsLiked(true);
    }
  }, []);

  return (
    <div className="card" onClick={() => handleClick()}>
      <img className="card__image" src={card.imageUrl} alt={card.name} />
      <div className="card__title-frame">
        <h3 className="card__title">{card.name}</h3>
        {
          isLoggedIn && cardImage
        }
      </div>
    </div>
  );
}

export default ItemCard;
