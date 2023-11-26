export function createWeatherCard(isNight, weatherPhase) {
  const day = isNight ? "night" : "day";

  return (
    <img
      className="weather__card"
      src={`/images/weather/${day}/${weatherPhase}.svg`}
      alt="The current weather."
    />
  );
}

export function createItemCard() {
  const clothingOptions = [{ name: "t-shirt", url: "/images/clothing/" }];
  return (
    <div className="items__card card">
      <img
        className="card__image"
        src={clothingOptions.url + clothingOptions.name + ".jpg"}
        alt={clothingOptions.name}
      />
      <p className="card__title">{clothingOptions.name}</p>
    </div>
  );
}
