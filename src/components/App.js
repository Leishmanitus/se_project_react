import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { getDate } from "../utils/utility";
import { getWeather } from "../utils/weatherApi";
import { defaultClothingItems, prefferedLocation } from "../utils/constants";

function App() {
  // const weatherData = getWeather(
  //   prefferedLocation.latitude,
  //   prefferedLocation.longitude,
  //   prefferedLocation.apiKey
  // );

  // const [clothes, setClothes] = useState();
  // const [date, setDate] = useState("");
  // const [location, setLocation] = useState("");

  const { currentDate, isNight } = getDate();

  const weatherData = {
    temperature: 75,
    weather: "clear",
    isNight: isNight,
  };
  // setDate(currentDate);

  // setLocation("Lake Charles");

  return (
    <div className="app">
      <Header date={currentDate} location={"Lake Charles"}></Header>
      <Main weatherData={weatherData}></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
