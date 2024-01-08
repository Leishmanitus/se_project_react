import { useContext } from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext";

function WeatherCard() {
  const { currentTemperatureUnit, weatherData } = useContext(
    CurrentTemperatureUnitContext
  );

  const hours = new Date().getHours();
  const isNight = hours >= 18 || hours <= 6;

  const weatherCardUrl = require(`../../../images/weather/${
    isNight ? "night" : "day"
  }/${weatherData.type}.svg`);

  const temperature = weatherData.temperature[currentTemperatureUnit];

  return (
    <section className="weather">
      <p className="weather__temperature">{temperature}</p>
      <img
        className="weather__card"
        src={weatherCardUrl}
        alt="The current weather."
      />
    </section>
  );
}

export default WeatherCard;
