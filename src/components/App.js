import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { filterWeatherData, getWeatherForecast } from "../utils/weatherApi";
import { defaultClothingItems, prefferedLocation } from "../utils/constants";

function App() {
  const [modalState, setModalState] = useState("none");
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePreview = () => {
    setModalState("preview");
  };

  const handleClose = () => {
    setModalState("none");
  };

  useEffect(() => {
    if (prefferedLocation.latitude && prefferedLocation.longitude) {
      getWeatherForecast(prefferedLocation, secretKey).then((data) => {
        setWeatherData(filterWeatherData(data)).catch((err) =>
          console.log(err)
        );
      });
    }
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <div className="app">
      <Header
        location={"Lake Charles"}
        onAddItem={() => setModalState("garment")}
      ></Header>
      <Main
        weatherData={weatherData}
        items={clothingItems}
        onCardClick={() => setModalState("preview")}
      ></Main>
      <Footer></Footer>
      {modalState === "active" && (
        <ModalWithForm handleClose={handleClose}></ModalWithForm>
      )}
      {modalState === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          handleClose={handleClose}
        ></ItemModal>
      )}
    </div>
  );
}

export default App;
