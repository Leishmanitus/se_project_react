import { useContext, useEffect, useState, useMemo } from "react";
import "./ItemCard.css";
import heartImage from "../../../images/like-heart.svg";
import filledHeartImage from "../../../images/filled-like-heart.svg";
import ModalContext from "../../../contexts/ModalContext";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ItemCard({ card }) {
  const { user, isLoggedIn, clothingItems } = useContext(CurrentUserContext);
  const { handleItemClick, handleCardLike } = useContext(ModalContext);

  const [ isLiked, setIsLiked ] = useState(false);

  useEffect(() => {
    setIsLiked(card.likes.includes(user._id));
  }, [isLoggedIn]);

  const handleClick = () => {
    handleItemClick(card, "preview");
  };

  const handleLikeButton = () => {
    handleCardLike({ _id: card._id, isLiked, setIsLiked });
  };

  const cardToggleName = useMemo(() => isLiked ? "card__toggle_on" : "", [handleLikeButton]);
  const cardToggleSource = useMemo(() => isLiked ? filledHeartImage : heartImage, [handleLikeButton]);
  const cardImage = useMemo(() => {
    return (<><img
      className={`card__toggle ${cardToggleName}`}
      src={cardToggleSource} alt={"❤"}
      onClick={(event) => {
        event.stopPropagation();
        handleLikeButton();
      }}
    /></>);
  }, [handleLikeButton]);



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
