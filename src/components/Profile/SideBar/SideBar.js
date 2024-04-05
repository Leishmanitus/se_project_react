import "./SideBar.css";
import avatarDefault from "../../../images/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const SideBar = () => {
  const { user } = useContext(CurrentUserContext);

  return (
    <div className="sidebar__profile-group">
      <div className="sidebar__avatar-container">
        {user.avatar 
          ?
            (
              <img
                className="sidebar__avatar"
                src={user.avatar || avatarDefault}
                alt="Avatar"
              />
            ) 
          : 
            (
              <span className="sidebar__avatar-letter">
                {user.name.toUpperCase().charAt(0) || "?"}
              </span>
            )
        }
      </div>
      <p className="sidebar__username">
        {user.name
          ?
            user.name
          :
            "Unknown"
        }
      </p>
    </div>
  );
};

export default SideBar;
