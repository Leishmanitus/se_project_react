import "./SideBar.css";
import avatarDefault from "../../../images/avatar.svg";

const SideBar = () => {
  const userName = "Tyler Leishman";
  const avatar = "";
  return (
    <div className="sidebar__profile-group">
      <div className="sidebar__avatar-container">
        {avatar ? (
          <img
            className="sidebar__avatar"
            src={avatar || avatarDefault}
            alt="Avatar"
          />
        ) : (
          <span className="sidebar__avatar-letter">
            {userName.toUpperCase().charAt(0) || ""}
          </span>
        )}
      </div>
      <p className="sidebar__username">{userName}</p>
    </div>
  );
};

export default SideBar;
