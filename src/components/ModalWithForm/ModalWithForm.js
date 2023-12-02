import "./ModalWithForm.css";

function ModalWithForm({ handleSubmit, handleClose }) {
  const container = "garment";
  return (
    <div className="modal">
      <div className={`modal__container modal__container__${container}`}>
        <h3 className="modal__title">New {container}</h3>

        <form className="modal__form form">
          <label className="form__label" for={container + "-name"}>
            Name
            <input
              className="form__input"
              id={container + "-name"}
              name="name"
              placeholder="Name"
              minLength="2"
              maxLength="40"
              required
            />
          </label>

          <label className="form__label" for={container + "-image"}>
            Image
            <input
              className="form__input"
              id={container + "-image"}
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
              <input className="form__radio" type="radio" id="hot" name="hot" />

              <label className="form__radio-text" for="hot">
                Hot
              </label>
            </li>

            <li className="form__list-item">
              <input
                className="form__radio"
                type="radio"
                id="warm"
                name="warm"
              />

              <label className="form__radio-text" for="warm">
                Warm
              </label>
            </li>

            <li className="form__list-item">
              <input
                className="form__radio"
                type="radio"
                id="cold"
                name="cold"
              />

              <label className="form__radio-text" for="cold">
                Cold
              </label>
            </li>
          </ul>

          <button className="form__submit" type="submit" onClick={handleSubmit}>
            Add {container}
          </button>
        </form>

        <button
          className="modal__close-button"
          onClick={(event) => handleClose(event)}
        ></button>
      </div>
    </div>
  );
}

export default ModalWithForm;
