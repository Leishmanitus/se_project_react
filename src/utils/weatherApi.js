import { request } from "./api";

export const getWeatherForecast = (locationData, secretKey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=imperial&appid=${secretKey}`;

  return request(url, {
    method: "GET",
  });
};

export const filterWeatherData = (data) => {
  if (!data) {
    return null;
  }

  const weather = {};
  weather.temperature = { F: 0, C: 0 };
  weather.temperature["F"] = `${Math.round(data.main.temp)}°F`;
  weather.temperature["C"] = `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
  weather.type = data.weather["0"].main.toLowerCase();
  weather.location = data.name;

  return weather;
};
