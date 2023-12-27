import { useContext, useEffect, useState } from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ClothingItemContext from "../../contexts/ClothingItemContext";

function Main({ onCardClick, onCardDelete }) {
  const { currentTemperatureUnit, weatherData } = useContext(
    CurrentTemperatureUnitContext
  );
  const { clothingItems } = useContext(ClothingItemContext);
  const temperature = weatherData.temperature[currentTemperatureUnit];

  const handleWeatherCondition = (temperature) => {
    const trueTemperature = temperature.split("°")[0];
    if (trueTemperature >= 73) {
      return "hot";
    } else if (trueTemperature >= 59 && trueTemperature <= 72) {
      return "warm";
    } else if (trueTemperature <= 58) {
      return "cold";
    }
  };

  const weatherCondition = handleWeatherCondition(temperature);

  if (!weatherData) return null;

  return (
    <main className="main">
      <WeatherCard />
      <section className="main__content">
        <p className="main__message">
          Today is {temperature} and it is {weatherCondition} / You may want to
          wear:
        </p>
        <div className="main__cards">
          {clothingItems
            .filter((card) => card.weather === weatherCondition)
            .map((filteredCard) => (
              <ItemCard
                key={filteredCard._id}
                card={filteredCard}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
