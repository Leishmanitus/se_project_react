import "./ModalWithForm.css";

function ModalWithForm({ children, title, name, handleClose, buttonText }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className={`modal__container`}>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form form" name={name}>
          <label className="form__label" htmlFor={"garment-name"}>
            Name
            <input
              className="form__input"
              id={"garment-name"}
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
              id={"garment-image"}
              name="image"
              placeholder="Image URL"
              minLength="2"
              maxLength="200"
              required
            />
          </label>

          <p className="form__message">Select the weather type:</p>

          <ul className="form__list">
            <li className="form__list-item">
              <input
                className="form__radio"
                type="radio"
                name="weather"
                id="hot"
                value="hot"
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
