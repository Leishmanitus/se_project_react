import "./Header.css";

function Header({ date, location }) {
  return (
    <header className="header">
      <div className="header__group">
        <img
          className="header__logo"
          src={require("../../images/wtwr-logo.svg").default}
          alt="WTWR"
        />
        <p className="header__text">
          {date}, {location}
        </p>
      </div>
      <div className="header__group">
        <button className="header__text header__text_button" type="text">
          + Add Clothes
        </button>
        <div className="header__profile-group">
          <p className="header__text">Tyler Leishman</p>
          <div className="header__avatar-container">
            <img
              className="header__avatar"
              src={require("../../images/avatar.svg").default}
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
