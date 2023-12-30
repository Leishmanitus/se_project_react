import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ItemModal from "./ItemModal/ItemModal";
import { Route, Switch } from "react-router-dom";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import ModalContext from "../contexts/ModalContext";
import { filterWeatherData, getWeatherForecast } from "../utils/weatherApi";
import { prefferedLocation, modalOptions } from "../utils/constants";
import { secretKey } from "../secret";
import api from "../utils/api";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import AddItemModal from "./AddItemModal/AddItemModal";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleItemClick = (item, modal) => {
    setSelectedItem(item);
    setActiveModal(modal);
  };

  const handlePostRequest = (response) => {
    setIsLoading(true);
    response
      .then(handleClose)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleSubmitItem = (items) => {
    return handlePostRequest(
      api.addItem(items).then((newItems) => {
        setClothingItems([newItems, ...clothingItems]);
      })
    );
  };

  const handleDeleteItem = (id) => {
    return handlePostRequest(
      api.removeItem(id).then(() => {
        setClothingItems((items) => items.filter((i) => i._id !== id));
      })
    );
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
        <ModalContext.Provider
          value={{
            handleClose,
            activeModal,
            handleItemClick,
            handleModalChange,
            handleSubmitItem,
            modalOptions,
            isLoading,
            setIsLoading,
          }}
        >
          <Header />
          <Switch>
            <Route exact path="/">
              {weatherData.temperature &&
                (weatherData.temperature.F || weatherData.temperature.C) && (
                  <Main clothingItems={clothingItems} />
                )}
            </Route>
            <Route path="/profile">
              {clothingItems.length !== 0 && weatherData.temperature && (
                <Profile clothingItems={clothingItems} />
              )}
            </Route>
          </Switch>
          <Footer />

          {activeModal === "garment" && (
            <AddItemModal handleSubmitItem={handleSubmitItem} />
          )}
          {activeModal === "preview" && (
            <ItemModal selectedItem={selectedItem} />
          )}
          {activeModal === "confirm" && (
            <ConfirmationModal
              itemId={selectedItem._id}
              handleDeleteItem={handleDeleteItem}
            />
          )}
        </ModalContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};

export default App;
