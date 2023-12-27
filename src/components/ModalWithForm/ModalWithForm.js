import { useContext } from "react";
import "./ModalWithForm.css";
import ClothingItemContext from "../../contexts/ClothingItemContext";

function ModalWithForm({ options, handleClose }) {
  const { title, name, buttonText } = options;
  const { handleSubmitItem } = useContext(ClothingItemContext);

  const nameInput = document.querySelector("#garment-name");

  return (
    <div className={`modal modal_type_${name}`}>
      <div className={`modal__container`}>
        <h3 className="modal__title">{title}</h3>
        <form
          className="modal__form form"
          name={name}
          onSubmit={() => handleSubmitItem({})}
        >
          <label className="form__label" htmlFor={"garment-name"}>
            Name
            <input
              className="form__input"
              id="garment-name"
              name="name"
              placeholder="Name"
              minLength="2"
              maxLength="40"
              required
            />
          </label>

          <label className="form__label" htmlFor={"garment-image"}>
            Image
            <input
              className="form__input"
              id="garment-image"
              name="image"
              placeholder="Image URL"
              minLength="2"
              maxLength="200"
              required
            />
          </label>

          <p className="form__message">Select the weather type:</p>

          <ul className="form__list" id="garment-weather" name="weather">
            <li className="form__list-item">
              <input
                className="form__radio"
                type="radio"
                name="weather"
                id="hot"
                value="hot"
                htmlFor="garment-weather"
              />

              <label className="form__radio-text" htmlFor="hot">
                Hot
              </label>
            </li>

            <li className="form__list-item">
              <input
                className="form__radio"
                type="radio"
                name="weather"
                id="warm"
                value="warm"
                htmlFor="garment-weather"
              />

              <label className="form__radio-text" htmlFor="warm">
                Warm
              </label>
            </li>

            <li className="form__list-item">
              <input
                className="form__radio"
                type="radio"
                name="weather"
                id="cold"
                value="cold"
                htmlFor="garment-weather"
              />

              <label className="form__radio-text" htmlFor="cold">
                Cold
              </label>
            </li>
          </ul>
          <button className="form__submit" type="submit">
            {buttonText} {name}
          </button>
        </form>
        <button className="modal__close-button" onClick={handleClose}></button>
      </div>
    </div>
  );
}

export default ModalWithForm;
