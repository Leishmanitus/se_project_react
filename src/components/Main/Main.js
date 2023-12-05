import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useMemo } from "react";

function Main({ weatherData, items, onCardClick }) {
  const hours = new Date().getHours();
  const isNight = hours >= 18 && hours <= 6;

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

  const weatherType = weatherData.type;

  return (
    <main className="main">
      <WeatherCard
        temperature={temperature}
        isNight={isNight}
        weatherType={weatherType}
      ></WeatherCard>
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
                onCardClick={onCardClick}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
