export function getWeatherForecast(locationData, secretKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=imperial&appid=${secretKey}`;

  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

export function filterWeatherData(data) {
  if (!data) {
    return null;
  }

  const weather = {};
  weather.temperature.F = `${Math.round(data.main.temp)}°F`;
  weather.temperature.C = `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
  weather.type = data.weather["0"].main.toLowerCase();
  weather.location = data.name;

  return weather;
}
