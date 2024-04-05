import { useContext } from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ clothingItems }) {
  const { currentTemperatureUnit, weatherData } = useContext(
    CurrentTemperatureUnitContext
  );
  const temperature = weatherData.temperature[currentTemperatureUnit];

  const handleWeatherCondition = (temperature) => {
    const tempArr = temperature.split("°");
    const trueTemperature = tempArr[0];
    const tempUnit = tempArr[1];

    if (tempUnit === "F" ? trueTemperature >= 73 : trueTemperature >= 23) {
      return "hot";
    } else if (
      tempUnit === "F"
        ? trueTemperature >= 59 && trueTemperature <= 72
        : trueTemperature >= 15 && trueTemperature <= 22
    ) {
      return "warm";
    } else if (
      tempUnit === "F" ? trueTemperature <= 58 : trueTemperature <= 14
    ) {
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
          {Array.prototype.filter
            .call(clothingItems, (card) => card.weather === weatherCondition)
            .map((filteredCard) => <ItemCard key={filteredCard._id} card={filteredCard} />)}
        </div>
      </section>
    </main>
  );
}

export default Main;
