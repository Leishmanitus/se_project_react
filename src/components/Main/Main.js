import React from "react";
import { useMemo } from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, items, onCardClick }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  // const temperature = weatherData.temperature[currentTemperatureUnit];
  // console.log(weatherData["temperature"][currentTemperatureUnit]);
  const weatherTemp = useMemo(() => {
    if (weatherData.temperature >= 86) {
      return "hot";
    } else if (weatherData.temperature >= 66 && weatherData.temperature <= 85) {
      return "warm";
    } else if (weatherData.temperature <= 65) {
      return "cold";
    }
  });

  const weatherType = weatherData.type || "clear";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} weatherType={weatherType} />
      <section className="main__content">
        <p className="main__message">
          Today is {weatherData.temperature} and it is {weatherTemp} / You may
          want to wear:
        </p>
        <div className="main__cards">
          {items
            .filter((card) => card.weather === weatherTemp)
            .map((filteredCard) => (
              <ItemCard
                key={filteredCard._id}
                card={filteredCard}
                onCardClick={() => onCardClick(filteredCard)}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
