import { useEffect, useState, useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  useEffect(
    () => setIsChecked(currentTemperatureUnit === "C"),
    [currentTemperatureUnit]
  );

  const handleToggleSwitchClick = () => {
    document.querySelector("#fahrenheit").classList.toggle("toggle__text_on");
    document.querySelector("#celsius").classList.toggle("toggle__text_on");
    document.querySelector("#circle").classList.toggle("toggle__circle_on");
  };

  return (
    <div className="toggle">
      <label className="toggle__label">
        <input
          className="toggle__checkbox"
          type="checkbox"
          onClick={() => handleToggleSwitchClick()}
          onChange={() => handleToggleSwitchChange(isChecked)}
        />
        <p className="toggle__text toggle__text_on" id="fahrenheit">
          F
        </p>
        <p className="toggle__text" id="celsius">
          C
        </p>
        <span className="toggle__circle" id="circle" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
