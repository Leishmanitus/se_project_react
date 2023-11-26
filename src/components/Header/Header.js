import "./Header.css";

function Header({ currentDate }) {
  return (
    <header className="header">
      <div className="header__group">
        <img className="header__logo" src="/images/wtwr-logo.svg" alt="WTWR" />
        <p className="header__text">
          {currentDate},{}
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
              src="/images/avatar.svg"
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
