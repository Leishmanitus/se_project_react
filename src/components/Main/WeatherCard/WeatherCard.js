import "./WeatherCard.css";

function WeatherCard({ temperature, weather, isNight }) {
  return (
    <section className="weather">
      <p className="weather__temperature">{temperature}°F</p>
      <img
        className="weather__card"
        src={require(`../../../images/weather/${
          isNight ? "night" : "day"
        }/${weather}.svg`)}
        alt="The current weather."
      />
    </section>
  );
}

export default WeatherCard;
