import { useContext, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm";
import { useForm } from "../../../hooks/useForm";
import ModalContext from "../../../contexts/ModalContext";

const RegisterModal = () => {
    const initialValues = {
        email: "",
        password: "",
        name: "",
        avatar: "",
    };

    const { handleRegistration } = useContext(ModalContext);
    const { values, handleChange, setValues } = useForm(initialValues);

    const { email, password, name, avatar } = values;
    useEffect(() => {
      setValues(initialValues);
    }, [setValues]);

    return (
        <ModalWithForm handleSubmit={handleRegistration}>
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
        </ModalWithForm>
    )
}

export default RegisterModal;
