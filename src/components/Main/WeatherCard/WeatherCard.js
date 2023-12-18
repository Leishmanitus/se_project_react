import "./WeatherCard.css";
import { CurrentTemperatureUnit } from "../../../contexts/CurrentTemperatureUnitContext";
import React from "react";

function WeatherCard({ weatherData, weatherType }) {
  const night = require(`../../../images/weather/night/${weatherType}.svg`);
  const day = require(`../../../images/weather/day/${weatherType}.svg`);

  const hours = new Date().getHours();
  const isNight = hours >= 18 || hours <= 6;

  return (
    <CurrentTemperatureUnit.Consumer>
      {({ currentTemperatureUnit }) => (
        <section className="weather">
          <p className="weather__temperature">
            {weatherData.temperature[currentTemperatureUnit]}
          </p>
          <img
            className="weather__card"
            src={isNight ? night : day}
            alt="The current weather."
          />
        </section>
      )}
    </CurrentTemperatureUnit.Consumer>
  );
}

export default WeatherCard;
