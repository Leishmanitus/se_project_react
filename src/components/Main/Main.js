import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useMemo } from "react";
import { defaultClothingItems } from "../../utils/constants";

function Main({ temperature, weather, isNight }) {
  console.log(temperature);
  const weatherType = useMemo(() => {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 85) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  });

  return (
    <main className="main">
      <WeatherCard
        temperature={temperature}
        weather={weather}
        isNight={isNight}
      ></WeatherCard>
      <section className="main__content">
        <p className="main__message">
          Today is {temperature}° F and it is {weatherType} / You may want to
          wear:
        </p>
        <div className="main__cards"></div>
      </section>
      {/* <ItemCard temperature={weatherType}></ItemCard> */}
    </main>
  );
}

export default Main;
