import "./WeatherCard.css";
import { createWeatherCard } from "../../../utils/factories";

function WeatherCard({ temperature, isNight, weatherElement }) {
  return (
    <section className="weather">
      <p className="weather__temperature">{temperature}°F</p>
      {createWeatherCard(isNight, weatherElement)}
    </section>
  );
}

export default WeatherCard;
