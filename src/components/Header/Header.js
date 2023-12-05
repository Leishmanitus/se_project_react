import "./Header.css";
import { getDate } from "../../utils/utility";
import wtwrLogo from "../../images/wtwr-logo.svg";
import avatarDefault from "../../images/avatar.svg";

function Header({ weatherData, onAddItem }) {
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
        <button
          className="header__text header__text_button"
          type="text"
          onClick={onAddItem}
        >
          + Add Clothes
        </button>
        <div className="header__profile-group">
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
