import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useMemo } from "react";

function Main({ weatherData, items, onCardClick }) {
  const temperature = weatherData.temperature;
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
  console.log(weatherType);

  return (
    <main className="main">
      <WeatherCard temperature={temperature} weatherType={weatherType} />
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
