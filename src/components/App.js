import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { getDate } from "../utils/utility";
import { getWeather } from "../utils/weatherApi";
import { defaultClothingItems, prefferedLocation } from "../utils/constants";

function App() {
  const container = document.querySelector(".modal");
  // const weatherData = getWeather(
  //   prefferedLocation.latitude,
  //   prefferedLocation.longitude,
  //   prefferedLocation.apiKey
  // );

  // const [clothes, setClothes] = useState();
  // const [date, setDate] = useState("");
  // const [location, setLocation] = useState("");
  const [modalState, setModalState] = useState("");
  const { currentDate, isNight } = getDate();
  const weatherData = {
    temperature: 90,
    weather: "clear",
    isNight: isNight,
  };

  const handleOpen = () => {
    setModalState("active");
  };

  const handleClose = () => {
    setModalState("inactive");
  };

  return (
    <div className="app">
      <Header
        date={currentDate}
        location={"Lake Charles"}
        handleOpen={handleOpen}
        container={container}
      ></Header>
      <Main weatherData={weatherData}></Main>
      <Footer></Footer>
      {modalState === "active" && (
        <ModalWithForm handleClose={handleClose}></ModalWithForm>
      )}
    </div>
  );
}

export default App;
