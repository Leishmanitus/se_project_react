import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { CurrentTemperatureUnit } from "../../contexts/CurrentTemperatureUnitContext";
import { useMemo } from "react";

function Main({ weatherData, items, onCardClick }) {
  const currentTemperatureUnit = React.useContext(CurrentTemperatureUnit);
  const temperature = weatherData.temperature[currentTemperatureUnit];
  const weatherTemp = useMemo(() => {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 85) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  });

  const weatherType = weatherData.type || "clear";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} weatherType={weatherType} />
      <section className="main__content">
        <p className="main__message">
          Today is {temperature}° F and it is {weatherTemp} / You may want to
          wear:
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
