import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";

function Main({ isNight }) {
  const temp = 75;
  const weather = "cloudy";
  return (
    <main className="main">
      <WeatherCard
        isNight={isNight}
        temperature={temp}
        weatherElement={weather}
      ></WeatherCard>
      <ItemCard temperature={temp}></ItemCard>
    </main>
  );
}

export default Main;
