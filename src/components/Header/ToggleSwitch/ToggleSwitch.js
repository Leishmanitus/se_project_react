import React from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );

  const handleToggleSwitchClick = () => {
    const elementArray = [
      document.querySelector("#fahrenheit"),
      document.querySelector("#celsius"),
    ];

    function toggleElement(element) {
      if (element.classList.contains("toggle__text_on")) {
        element.classList.remove("toggle__text_on");
      }
      element.classList.add("toggle__text_on");
    }

    elementArray.forEach((element) => toggleElement(element));
  };

  return (
    <div className="toggle">
      <input
        className="toggle__checkbox"
        id={`toggle-unit`}
        type="checkbox"
        onClick={handleToggleSwitchClick}
        onChange={handleToggleSwitchChange}
        value={currentTemperatureUnit}
      />
      <label className="toggle__label" htmlFor={`toggle-unit`}>
        <p className="toggle__text toggle__text_on" id="fahrenheit">
          F
        </p>
        <p className="toggle__text" id="celsius">
          C
        </p>
        <span className="toggle__circle toggle__circle_on" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
