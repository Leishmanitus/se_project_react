import { useContext, useCallback } from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main() {
  const { clothingItems } = useContext(CurrentUserContext);
  const { currentTemperatureUnit, weatherData } = useContext(CurrentTemperatureUnitContext);
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

  const handleRenderItems = useCallback(() => {
    return clothingItems
      .filter((card) => card.weather === weatherCondition)
      .map((filteredCard) => {
        return <ItemCard key={filteredCard._id} card={filteredCard} />
      });
  }, [clothingItems]);

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
          {
            handleRenderItems()
          }
        </div>
      </section>
    </main>
  );
}

export default Main;
