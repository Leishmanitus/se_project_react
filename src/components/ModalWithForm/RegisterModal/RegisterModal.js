import { useContext, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm";
import { useForm } from "../../../hooks/useForm";
import ModalContext from "../../../contexts/ModalContext";
import { modalOptions } from "../../../utils/constants";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const RegisterModal = () => {
  const initialValues = {
      name: "",
      avatar: "",
      email: "",
      password: "",
  };

  const { handleRegistration, isLoading } = useContext(ModalContext);
  const { signupFormName, signupTitle, loginButton, signupButton, signupLoadingText } = modalOptions.loginOptions;
  const { values, handleChange, setValues } = useForm(initialValues);

  const { name, avatar, email, password } = values;
  useEffect(() => {
    setValues(initialValues);
  }, [setValues]);

  const handleUserRegistration = () => {
      handleRegistration(values);
  };

  return (
    <ModalWithForm handleSubmit={handleUserRegistration} formName={signupFormName}>
      <h3 className="modal__title">{signupTitle}</h3>
      <label className="form__label" htmlFor={"garment-name"}>
        Email
        <input
            className="form__input"
            id="user-email"
            name="email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            type="email"
            value={email}
            onChange={handleChange}
            required
        />
      </label>

      <label className="form__label" htmlFor={"garment-name"}>
        Password
        <input
            className="form__input"
            id="user-password"
            name="password"
            placeholder="Password"
            minLength="2"
            maxLength="40"
            type="password"
            value={password}
            onChange={handleChange}
            required
        />
      </label>

      <label className="form__label" htmlFor={"garment-name"}>
        Name
        <input
            className="form__input"
            id="user-name"
            name="name"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            type="text"
            value={name}
            onChange={handleChange}
            required
        />
      </label>

      <label className="form__label" htmlFor={"garment-name"}>
        Avatar URL
        <input
            className="form__input"
            id="user-avatar"
            name="avatar"
            placeholder="Avatar URL"
            minLength="2"
            maxLength="200"
            type="url"
            value={avatar}
            onChange={handleChange}
            required
        />
      </label>

      <div className="form__button-group">
        <button className="form__submit" type="submit">
          {isLoading ? signupLoadingText : signupButton}
        </button>
        <NavLink className="form__link" to={"/signup"}>
          <p className="form__text">or {loginButton}</p>
        </NavLink>
      </div>
    </ModalWithForm>
  )
}

export default RegisterModal;
