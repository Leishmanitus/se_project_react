import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ activeModal, handleClose, handleSubmitItem }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");

  useEffect(() => {
    const inputArr = document.querySelectorAll(".form__input");
    inputArr.forEach((input) => (input.value = ""));
  }, [activeModal === "garment"]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };
  const handleWeatherChange = (event) => {
    setWeather(event.target.value);
  };

  const handleSubmit = (event, item) => {
    const { name, imageUrl, weather } = item;
    console.log(name, imageUrl, weather);
    event.preventDefault();
    handleSubmitItem({ name, imageUrl, weather });
    handleClose();
  };

  return (
    <ModalWithForm
      handleClose={handleClose}
      handleSubmit={(event) => handleSubmit(event, { name, imageUrl, weather })}
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
          type="text"
          value={name}
          onChange={handleNameChange}
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
          type="text"
          value={imageUrl}
          onChange={handleImageUrlChange}
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
            htmlFor="garment-weather"
            onChange={handleWeatherChange}
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
            onChange={handleWeatherChange}
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
            onChange={handleWeatherChange}
          />

          <label className="form__radio-text" htmlFor="cold">
            Cold
          </label>
        </li>
      </ul>
    </ModalWithForm>
  );
};

export default AddItemModal;
