export const getWeather = (latitude, longitude, APIkey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  const headers = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const response = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };
  return fetch(url, headers).then(response());
};
