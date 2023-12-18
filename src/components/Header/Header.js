import React from "react";
import "./Header.css";
import { getDate } from "../../utils/utility";
import wtwrLogo from "../../images/wtwr-logo.svg";
import avatarDefault from "../../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { CurrentTemperatureUnit } from "../../contexts/CurrentTemperatureUnitContext";
// import Switch from "../Switch/Switch";

function Header({ weatherData, onAddItem }) {
  const temperature = React.useContext(CurrentTemperatureUnit);

  if (!weatherData) {
    return null;
  }
  const currentDate = getDate();
  const userName = "Tyler Leishman";
  const avatar = "";

  return (
    <header className="header">
      <div className="header__group">
        <img className="header__logo" src={wtwrLogo} alt="WTWR" />
        <p className="header__text">
          {currentDate}, {weatherData.location}
        </p>
      </div>
      <div className="header__group">
        <ToggleSwitch temperature={temperature} />
        <button
          className="header__text header__text_type_button"
          type="text"
          onClick={onAddItem}
        >
          + Add Clothes
        </button>
        <div className="header__group header__group_type_profile">
          <p className="header__text">{userName}</p>
          <div className="header__avatar-container">
            {avatar ? (
              <img
                className="header__avatar"
                src={avatar || avatarDefault}
                alt="Avatar"
              />
            ) : (
              <span className="header__avatar-letter">
                {userName.toUpperCase().charAt(0) || ""}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
