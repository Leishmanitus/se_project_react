import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather">
      <p className="weather__temperature">{weatherData.temperature}°F</p>
      <img
        className="weather__card"
        src={require(`../../../images/weather/${
          weatherData.isNight ? "night" : "day"
        }/${weatherData.weather}.svg`)}
        alt="The current weather."
      />
    </section>
  );
}

export default WeatherCard;
