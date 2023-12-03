export const getWeatherForecast = (latitude, longitude, APIkey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const filterWeatherData = (data) => {
  if (!data) {
    return null;
  }

  const weather = {};
  weather.temperature = data.current.temperature;
  return weather;
};
