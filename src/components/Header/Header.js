import { useContext } from "react";
import "./Header.css";
import { getDate } from "../../utils/utility";
import wtwrLogo from "../../images/wtwr-logo.svg";
import avatarDefault from "../../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ModalContext from "../../contexts/ModalContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header() {
  const { weatherData } = useContext(CurrentTemperatureUnitContext);
  const { handleModalChange } = useContext(ModalContext);
  const { isLoggedIn, token, user } = useContext(CurrentUserContext);

  const currentDate = getDate();

  return (
    <header className="header">
      <div className="header__group">
        <NavLink className="header__link" to="/">
          <img className="header__logo" src={wtwrLogo} alt="WTWR" />
        </NavLink>
        <p className="header__text">
          {currentDate}, {weatherData.location}
        </p>
      </div>
      <div className="header__group">
        <ToggleSwitch />
        <button
          className="header__text header__text_type_button"
          type="text"
          onClick={() => handleModalChange("garment")}
        >
          + Add Clothes
        </button>
        <div className="header__group header__group_type_profile">
          <p className="header__text">{user.name}</p>
          <NavLink className="header__link" to="/profile">
            <div className="header__avatar-container">
              {user.avatar ? (
                <img
                  className="header__avatar"
                  src={user.avatar || avatarDefault}
                  alt="Avatar"
                />
              ) : (
                <span className="header__avatar-letter">
                  {user.name.toUpperCase().charAt(0) || ""}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
