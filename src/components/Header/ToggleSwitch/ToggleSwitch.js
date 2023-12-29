import { useEffect, useState, useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");

  return (
    <div className="toggle">
      <label className="toggle__label">
        <input
          className="toggle__checkbox"
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
            handleToggleSwitchChange(isChecked);
          }}
          checked={isChecked}
        />
        <p className={`toggle__text ${!isChecked ? "toggle__text_on" : ""}`}>
          F
        </p>
        <p className={`toggle__text ${isChecked ? "toggle__text_on" : ""}`}>
          C
        </p>
        <span
          className={`toggle__circle ${isChecked ? "toggle__circle_on" : ""}`}
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
