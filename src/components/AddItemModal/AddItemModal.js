import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import { useForm } from "../../hooks/useForm";
import ModalContext from "../../contexts/ModalContext";

const AddItemModal = ({ handleSubmitItem }) => {
  const { handleClose, setIsLoading } = useContext(ModalContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  const { name, imageUrl, weather } = values;
  console.log(name, imageUrl, weather);

  useEffect(() => {
    setValues({
      name: "",
      imageUrl: "",
      weather: "",
    });
  }, [setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    handleSubmitItem(values);
  };

  return (
    <ModalWithForm handleClose={handleClose} handleSubmit={handleSubmit}>
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
          onChange={handleChange}
          required
        />
      </label>

      <label className="form__label" htmlFor={"garment-image"}>
        Image
        <input
          className="form__input"
          id="garment-image"
          name="imageUrl"
          placeholder="Image URL"
          minLength="2"
          maxLength="200"
          type="text"
          value={imageUrl}
          onChange={handleChange}
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
            onChange={handleChange}
            checked={weather === "hot"}
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
            onChange={handleChange}
            checked={weather === "warm"}
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
            onChange={handleChange}
            checked={weather === "cold"}
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
