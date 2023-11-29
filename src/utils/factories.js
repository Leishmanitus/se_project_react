export function createWeatherCard(isNight, weatherPhase) {
  const timeOfDay = isNight ? "night" : "day";

  return (
    <img
      className="weather__card"
      src={require(`../images/weather/${timeOfDay}/${weatherPhase}.svg`)}
      alt="The current weather."
    />
  );
}

export function createItemCards(clothes, temperature) {
  const elements = [];

  const filterClothes = (clothes, temperature) => {
    return clothes.filter((item) => {
      return item.weather === temperature;
    });
  };

  const filterTemperature = (temperature) => {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 85) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  };

  const createElement = (item) => {
    return (
      <div className="items__card card">
        <img className="card__image" src={item.link} alt={item.name} />
        <div className="card__title-frame">
          <p className="card__title">{item.name}</p>
        </div>
      </div>
    );
  };

  const addElement = (item) => {
    elements.push(createElement(item));
  };

  filterClothes(clothes, filterTemperature(temperature)).forEach(
    (clothingItem) => {
      addElement(clothingItem);
    }
  );

  return elements;
}
