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
  const [token, setToken] = useState();
  const [user, setUser] = useState({ name: "", avatar: "" });

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
      const jwt = localStorage.getItem("jwt");
      auth
        .getContent(jwt)
        .then((data) => {
          setToken(jwt);
          handleLogin(jwt, data);
        })
        .catch(console.error);
    } else {
      setIsLoggedIn(false);
    }
  }, [])

  const handleCheckToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setToken(jwt);
          setUser({ name: res.name, avatar: res.avatar });
          history.pushState("/profile");
        }
      })
    }

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

  const handleRegistration = (request) => {
    setIsLoading(true);
    request()
      .then(handleClose)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleLogin = (request, user) => {
    setIsLoading(true);
    request()
      .then(() => {
        setUser(user);
        handleClose();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogout = (request, user) => {
    setIsLoading(true);
    request()
      .then(() => {
        localStorage.removeItem("jwt");
        setToken(token);
        setUser(user);
        handleClose();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
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

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn, token, user, clothingItems, handleRegistration, handleLogin, handleLogout }}>
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
              {isLoggedIn ? (clothingItems.length !== 0 && weatherData.temperature) && (
                <Profile />
              ) : <Redirect to={"/signin"} />}
            </Route>
          </Switch>
          <Footer />

          {activeModal === "garment" && (
            <AddItemModal />
          )}
          {activeModal === "preview" && (
            <ItemModal selectedItem={selectedItem} />
          )}
          {activeModal === "update" && (
            <EditProfileModal />
          )}
          {activeModal === "confirm" && (
            <ConfirmationModal
              itemId={selectedItem._id}
              handleDeleteItem={handleDeleteItem}
            />
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
