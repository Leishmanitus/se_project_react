import React from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnit } from "../../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  return (
    <CurrentTemperatureUnit.Consumer>
      {({ currentTemperatureUnit, handleToggleSwitchChange }) => (
        <div className="toggle">
          <input
            className="toggle__checkbox"
            id={`toggle-temp-unit`}
            type="checkbox"
            onChange={handleToggleSwitchChange}
            value={currentTemperatureUnit}
          />
          <label className="toggle__label" htmlFor={`toggle-temp-unit`}>
            <p className="toggle__text toggle__text_on">F</p>
            <p className="toggle__text">C</p>
            <span className="toggle__circle toggle__circle_on" />
          </label>
        </div>
      )}
    </CurrentTemperatureUnit.Consumer>
  );
};

export default ToggleSwitch;
