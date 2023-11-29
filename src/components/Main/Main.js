import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";

function Main({ weatherData }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData}></WeatherCard>
      <ItemCard temperature={weatherData.temperature}></ItemCard>
    </main>
  );
}

export default Main;
