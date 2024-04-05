import { useContext, useEffect } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import ModalContext from "../../contexts/ModalContext";

const EditProfileModal = () => {
    const initialValues = {
        name: "",
        avatar: "",
    };

    const { handleSubmitInfo } = useContext(ModalContext);
    const { values, handleChange, setValues } = useForm(initialValues);

    const { name, avatar } = values;
    useEffect(() => {
      setValues(initialValues);
    }, [setValues]);

    return (
        <ModalWithForm handleSubmitInfo={handleSubmitInfo}>
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
    );
};

export default EditProfileModal;
