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
  const [modalState, setModalState] = React.useState("none");
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingItems, setClothingItems] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleClose = () => {
    setModalState("none");
  };

  React.useEffect(() => {
    if (prefferedLocation.latitude && prefferedLocation.longitude) {
      getWeatherForecast(prefferedLocation, secretKey)
        .then((data) => {
          setWeatherData(filterWeatherData(data));
        })
        .catch((err) => console.error(err));
    }
  }, []);

  React.useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <div className="app">
      <Header
        weatherData={weatherData}
        onAddItem={() => setModalState("garment")}
      />
      <Main
        weatherData={weatherData}
        items={clothingItems}
        onCardClick={(card) => {
          setSelectedCard(card);
          setModalState("preview");
        }}
      />
      <Footer />
      {modalState === "garment" && (
        <ModalWithForm
          title="New Garment"
          name="garment"
          handleClose={handleClose}
        >
          <label className="form__label" for={"garment-name"}>
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

          <label className="form__label" for={"garment-image"}>
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
                id="hot"
                value="hot"
              />

              <label className="form__radio-text" for="hot">
                Hot
              </label>
            </li>

            <li className="form__list-item">
              <input
                className="form__radio"
                type="radio"
                id="warm"
                value="warm"
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
                value="cold"
              />

              <label className="form__radio-text" for="cold">
                Cold
              </label>
            </li>
          </ul>
        </ModalWithForm>
      )}
      {modalState === "preview" && (
        <ItemModal selectedCard={selectedCard} handleClose={handleClose} />
      )}
    </div>
  );
}

export default App;
