import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext";
import React from "react";

function WeatherCard({ weatherData, weatherType }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  // const temperature = weatherData.temperature[currentTemperatureUnit];
  const night = require(`../../../images/weather/night/${weatherType}.svg`);
  const day = require(`../../../images/weather/day/${weatherType}.svg`);

  const hours = new Date().getHours();
  const isNight = hours >= 18 || hours <= 6;

  return (
    <section className="weather">
      <p className="weather__temperature">{weatherType}</p>
      <img
        className="weather__card"
        src={isNight ? night : day}
        alt="The current weather."
      />
    </section>
  );
}

export default WeatherCard;
