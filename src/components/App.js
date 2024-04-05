import { useState, useEffect } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState({ name: "", avatar: "" });

  const handleCheckToken = () => {
    const jwt = localStorage.getItem("jwt");
    return auth.getContent(jwt)
      .then((data) => {
        if (data.jwt) {
          setIsLoggedIn(true);
          setUser({ name: data.name, avatar: data.avatar });
        }
        return data;
      })
      .catch(console.error);
  };

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

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(handleClose)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleSubmitItem = (items, token) => {
    return handleSubmit(() => {
      return api.addItem(items, token).then((newItems) => {
        setClothingItems([newItems, ...clothingItems]);
      });
    });
  };

  const handleDeleteItem = (id, token) => {
    return handleSubmit(() => {
      return api.removeItem(id, token).then(() => {
        setClothingItems((items) => items.filter((i) => i._id !== id));
      });
    });
  };

  const handleSubmitInfo = (info, token) => {
    return handleSubmit(() => {
      return api.updateUser(info, token).then(({ name, avatar }) => {
        setUser({ name, avatar });
      })
    })
  }

  const setUserState = (data, log) => {
    setUser({ name: data.name, avatar: data.avatar });
    setIsLoggedIn(log);
  };

  const handleRegistration = (values) => {
    return handleSubmit(() => {
      return auth.signup(values).then((data) => {
        setUserState(data, true);
      });
    });
  }

  const handleLogin = (values) => {
    return handleSubmit(() => {
      return auth.signin(values).then((data) => {
        setUserState(data, true);
      });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserState({ name: "", avatar: "" }, false);
  };

  const handleCardLike = ({ id, isLiked, token }) => {
    !isLiked
      ?
        api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      :
        api
          .removeCardLike(id, token) 
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const redirectPage = (route, modal) => {
    setActiveModal(modal);
    return (route);
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
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      handleCheckToken()
        .then((data) => {
          if (data)
          handleLogin(auth.signin);
        })
        .catch(console.error);
    }
  }, [])

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
            handleModalChange,
            handleSubmitItem,
            handleSubmitInfo,
            handleRegistration,
            handleLogin,
            handleDeleteItem,
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
                  <Main clothingItems={clothingItems} />
                )}
            </Route>
            <Route path="/profile">
              {isLoggedIn
                ?
                  (clothingItems.length !== 0 && weatherData.temperature) && (
                    <Profile />
                  )
                :
                  <Redirect to={"/signin"} />
              }
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
