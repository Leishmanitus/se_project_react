import "./Header.css";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div>
        <img
          className="header__logo"
          src="../../../public/images/wtwr-logo.svg"
          alt="WTWR"
        />
        <p>
          {currentDate}
          {}
        </p>
      </div>
      <div>
        <button type="text">+ Add Clothes</button>
        <p>Tyler Leishman</p>
        <img
          className="header__avatar"
          src="../../../public/images/avatar.svg"
          alt="avatar"
        />
      </div>
    </div>
  );
}
