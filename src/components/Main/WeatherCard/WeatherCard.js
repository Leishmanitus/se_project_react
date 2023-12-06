import "./WeatherCard.css";

function WeatherCard({ temperature, weatherType }) {
  console.log(weatherType);
  const night = require(`../../../images/weather/night/${weatherType}.svg`);
  const day = require(`../../../images/weather/day/${weatherType}.svg`);

  const hours = new Date().getHours();
  const isNight = hours >= 18 || hours <= 6;
  console.log(hours);
  console.log(isNight ? night : day);

  return (
    <section className="weather">
      <p className="weather__temperature">{temperature}°F</p>
      <img
        className="weather__card"
        src={isNight ? night : day}
        alt="The current weather."
      />
    </section>
  );
}

export default WeatherCard;
