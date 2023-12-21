import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { filterWeatherData, getWeatherForecast } from "../utils/weatherApi";
import {
  defaultClothingItems,
  prefferedLocation,
  modalOptions,
} from "../utils/constants";
import { secretKey } from "../secret";
import api from "../utils/api";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingItems, setClothingItems] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");
  console.log(currentTemperatureUnit);

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
    api
      .getItemsList()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error(err));
  }, []);

  const handleModalChange = (modalName) => {
    setActiveModal(modalName);
  };

  const handleClose = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const onSubmit = (item) => {
    api
      .addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  const onCardDelete = (card) => {
    api
      .removeItem(card.id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header weatherData={weatherData} onAddItem={handleModalChange} />
          <Switch>
            <Route
              exact
              path="/"
              element={
                (weatherData.temperature.F || weatherData.temperature.C) && (
                  <Main
                    weatherData={weatherData}
                    items={clothingItems}
                    onCardClick={onCardClick}
                    onCardDelete={onCardDelete}
                  />
                )
              }
            ></Route>
            <Route
              path="/profile"
              element={
                clothingItems.length !== 0 && (
                  <Profile
                    cards={clothingItems}
                    onCardClick={onCardClick}
                    onCardDelete={onCardDelete}
                    onAddItem={handleModalChange}
                  />
                )
              }
            ></Route>
          </Switch>
          <Footer />

          {activeModal === "garment" && (
            <ModalWithForm
              options={modalOptions.formOptions}
              handleClose={handleClose}
              onSubmit={onSubmit}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              name="preview"
              selectedCard={selectedCard}
              handleClose={handleClose}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
