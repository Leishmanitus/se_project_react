import "./LoginModal.css";
import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm";
import { useForm } from "../../../hooks/useForm";
import ModalContext from "../../../contexts/ModalContext";

const LoginModal = () => {
    const initialValues = {
        email: "",
        password: "",
    };

    const { handleLogin } = useContext(ModalContext);
    const { values, handleChange, setValues } = useForm(initialValues);

    const { email, password } = values;
    useEffect(() => {
      setValues(initialValues);
    }, [setValues]);

    const handleUserLogin = () => {
        handleLogin(values);
    };

    return (
        <ModalWithForm handleLogin={handleUserLogin}>
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
        </ModalWithForm>
    )
}

export default LoginModal;
