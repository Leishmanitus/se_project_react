import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { Route, Switch } from "react-router-dom";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import ClothingItemContext from "../contexts/ClothingItemContext";
import { filterWeatherData, getWeatherForecast } from "../utils/weatherApi";
import { prefferedLocation, modalOptions } from "../utils/constants";
import { secretKey } from "../secret";
import api from "../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    if (prefferedLocation.latitude && prefferedLocation.longitude) {
      getWeatherForecast(prefferedLocation, secretKey)
        .then((data) => {
          setWeatherData(filterWeatherData(data));
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    api
      .getItemsList()
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);

  const handleModalChange = (modalName) => {
    setActiveModal(modalName);
  };

  const handleClose = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = (isChecked) => {
    isChecked ? setCurrentTemperatureUnit("F") : setCurrentTemperatureUnit("C");
  };

  const onCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleSubmitItem = (item) => {
    api
      .addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleClose();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (item) => {
    api
      .removeItem(item.id)
      .then(() => {
        setClothingItems((items) => items.filter((i) => i.id !== item.id));
      })
      .catch(console.error);
  };

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          handleToggleSwitchChange,
          weatherData,
        }}
      >
        <Header onAddItem={handleModalChange} />
        <ClothingItemContext.Provider
          value={{ clothingItems, handleSubmitItem, handleDeleteItem }}
        >
          <Switch>
            <Route exact path="/">
              {weatherData.temperature &&
                (weatherData.temperature.F || weatherData.temperature.C) && (
                  <Main onCardClick={onCardClick} />
                )}
            </Route>
            <Route path="/profile">
              {clothingItems.length !== 0 && weatherData.temperature && (
                <Profile onAddItem={handleModalChange} />
              )}
            </Route>
          </Switch>
          <Footer />

          {activeModal === "garment" && (
            <ModalWithForm
              options={modalOptions.formOptions}
              handleClose={handleClose}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              name="preview"
              selectedCard={selectedCard}
              handleClose={handleClose}
            />
          )}
        </ClothingItemContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
