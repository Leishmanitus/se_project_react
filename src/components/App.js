import { useState, useEffect, useMemo } from "react";
import "./App.css";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ItemModal from "./ItemModal/ItemModal";
import { Route, Switch, Redirect } from "react-router-dom";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ModalContext from "../contexts/ModalContext";
import { filterWeatherData, getWeatherForecast } from "../utils/weatherApi";
import { prefferedLocation, modalOptions } from "../utils/constants";
import { secretKey } from "../secret";
import api from "../utils/api";
import auth from "../utils/auth";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import AddItemModal from "./ModalWithForm/AddItemModal/AddItemModal";
import RegisterModal from "./ModalWithForm/RegisterModal/RegisterModal";
import LoginModal from "./ModalWithForm/LoginModal/LoginModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", avatar: "", _id: "", token: "" });



  const handleModalChange = (modalName) => {
    setActiveModal(modalName);
  };

  const handleClose = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = (isChecked) => {
    isChecked ? setCurrentTemperatureUnit("F") : setCurrentTemperatureUnit("C");
  };

  const handleItemClick = (item, modal) => {
    setSelectedItem(item);
    setActiveModal(modal);
  };

  const handleRequest = (request) => {
    setIsLoading(true);
    return request()
      .then(() => handleClose())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleSubmitItem = (items, token) => {
    return handleRequest(() => {
      return api.addItem(items, token).then(({data: newItem}) => {
        setClothingItems([newItem, ...clothingItems]);
        
      });
    });
  };

  const handleDeleteItem = (_id, token) => {
    return handleRequest(() => {
      return api.removeItem(_id, token).then(() => {
        setClothingItems(() => clothingItems.filter((i) => {
          return i._id !== _id
        }));
      });
    });
  };

  const handleSubmitInfo = (info, token) => {
    console.log([info, token]);
    return handleRequest(() => {
      return api.updateUser(info, token).then(({ name, avatar }) => {
        setUser({ name, avatar });
      })
    })
  }

  const setUserState = ({ name, avatar, _id, token }, log) => {
    localStorage.setItem('jwt', token)
    setUser({ name, avatar, _id, token });
    setIsLoggedIn(log);
  };

  const handleCheckToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      return auth.getContent(jwt)
        .then(({ name, avatar, _id, token }) => {
          setUserState({ name, avatar, _id, token }, jwt, true);
          
          return user;
        })
        .catch(console.error);
    }

    return jwt;
  };

  const handleRegistration = (values) => {
    return handleRequest(() => {
      return auth.signup(values)
        .then(({data: { name, avatar, _id, token }}) => {
          setUserState({ name, avatar, _id, token }, true);
        });
    });
  }

  const handleLogin = (values) => {
    return handleRequest(() => {
      return auth.signin(values)
        .then(({data: { name, avatar, _id, token }}) => {
          if (user.token) {
            setUserState({ name, avatar, _id, token }, true);
          }

          return user;
        });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserState({ name: "", avatar: "", _id: "" }, "", false);
  };

  const handleCardLike = ({ _id, isLiked, token }) => {
    !isLiked
      ?
        api.likeItem(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === updatedCard._id ? updatedCard : item))
            );
          })
          .catch(console.error)
      :
        api.dislikeItem(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === updatedCard._id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  useEffect(() => {
    if (prefferedLocation.latitude && prefferedLocation.longitude) {
      getWeatherForecast(prefferedLocation, secretKey)
        .then((data) => {
          setWeatherData(filterWeatherData(data));
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    api
      .getItemsList()
      .then(({data: items}) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, [clothingItems]);

  useEffect(() => {
    handleCheckToken()
  }, [isLoggedIn, user])

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn, user, clothingItems }}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            handleToggleSwitchChange,
            weatherData,
          }}
        >
          <ModalContext.Provider
            value={{
              handleClose,
              activeModal,
              handleItemClick,
              handleCardLike,
              handleModalChange,
              handleSubmitItem,
              handleDeleteItem,
              handleSubmitInfo,
              handleRegistration,
              handleLogin,
              handleLogout,
              selectedItem,
              modalOptions,
              isLoading,
              setIsLoading,
            }}
          >
            <Header />
            <Switch>
              <Route exact path="/">
                {weatherData.temperature &&
                  (weatherData.temperature.F || weatherData.temperature.C) && (
                    <Main />
                  )}
              </Route>
              <Route path="/profile">
                {
                  isLoggedIn
                    ?
                      (clothingItems.length !== 0 && weatherData.temperature) ? (
                        <Profile />
                      ) : (
                        <Redirect to={"/"} />
                    ) : (
                      <Redirect to={"/"} />
                    )
                }
              </Route>
              <Route path="/signup">
                <RegisterModal />
              </Route>
              <Route path="/signin">
                <LoginModal />
              </Route>
            </Switch>
            <Footer />

            {activeModal === "garment" && (
              <AddItemModal />
            )}
            {activeModal === "preview" && (
              <ItemModal />
            )}
            {activeModal === "update" && (
              <EditProfileModal />
            )}
            {activeModal === "confirm" && (
              <ConfirmationModal />
            )}
            {activeModal === "signup" && (
              <RegisterModal />
            )}
            {activeModal === "signin" && (
              <LoginModal />
            )}
          </ModalContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
