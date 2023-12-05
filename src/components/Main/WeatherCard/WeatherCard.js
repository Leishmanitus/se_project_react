import "./WeatherCard.css";

function WeatherCard({ temperature, isNight, weatherType }) {
  return (
    <section className="weather">
      <p className="weather__temperature">{temperature}°F</p>
      <img
        className="weather__card"
        src={require(`../../../images/weather/${
          isNight ? "night" : "day"
        }/clear.svg`)}
        alt="The current weather."
      />
    </section>
  );
}

export default WeatherCard;
