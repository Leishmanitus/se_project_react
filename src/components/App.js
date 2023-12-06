import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { filterWeatherData, getWeatherForecast } from "../utils/weatherApi";
import { defaultClothingItems, prefferedLocation } from "../utils/constants";
import { secretKey } from "../secret";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingItems, setClothingItems] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleClose = () => {
    setActiveModal("");
  };

  React.useEffect(() => {
    if (prefferedLocation.latitude && prefferedLocation.longitude) {
      getWeatherForecast(prefferedLocation, secretKey)
        .then((data) => {
          setWeatherData(filterWeatherData(data));
        })
        .catch(console.error);
    }
  }, []);

  React.useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <div className="app">
      <Header
        weatherData={weatherData}
        onAddItem={() => setActiveModal("garment")}
      />
      <Main
        weatherData={weatherData}
        items={clothingItems}
        onCardClick={(card) => {
          console.log(card);
          setSelectedCard(card);
          setActiveModal("preview");
        }}
      />
      <Footer />
      {activeModal === "garment" && (
        <ModalWithForm
          title="New Garment"
          name="garment"
          handleClose={handleClose}
          buttonText={"Add"}
        >
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
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal
          name="preview"
          selectedCard={selectedCard}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
