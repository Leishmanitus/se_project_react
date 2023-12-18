export const getDate = () => {
  const date = new Date();

  const currentDate = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return currentDate;
};

export const toCelsius = (temperature) => {
  return Math.round(((temperature - 32) * 5) / 9);
};

export const toFahrenheit = (temperature) => {
  return Math.round((temperature * 9) / 5 + 32);
};
