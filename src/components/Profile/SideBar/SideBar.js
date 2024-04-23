import "./SideBar.css";
import avatarDefault from "../../../images/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import ModalContext from "../../../contexts/ModalContext";

const SideBar = () => {
  const { user } = useContext(CurrentUserContext);
  const { handleSubmitInfo, handleLogout, handleModalChange } = useContext(ModalContext);
  
  return (
    <>
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
        <p className="sidebar__text">
          {user.name
            ?
              user.name
            :
              "Unknown"
          }
        </p>
      </div>
      <div className="sidebar__settings-group">
        <button className="sidebar__text sidebar__button" type="text" onClick={() => handleModalChange("update")}>
          Change profile data
        </button>
        <button className="sidebar__text sidebar__button" type="text" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </>
  );
};

export default SideBar;
