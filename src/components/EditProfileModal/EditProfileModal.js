import { useContext, useEffect } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import ModalContext from "../../contexts/ModalContext";
import { modalOptions } from "../../utils/constants";

const EditProfileModal = () => {
    const initialValues = {
        name: "",
        avatar: "",
    };

    const { editProfileTitle, editProfileButton, editProfileLoading } = modalOptions.editProfileOptions;
    const { handleSubmitInfo, isLoading } = useContext(ModalContext);
    const { values, handleChange, setValues } = useForm(initialValues);

    const { name, avatar } = values;
    useEffect(() => {
      setValues(initialValues);
    }, [setValues]);

    return (
        <ModalWithForm handleSubmitInfo={handleSubmitInfo}>
            <h3 className="modal__title">{editProfileTitle}</h3>
            <label className="form__label" htmlFor={"user-name"}>
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

            <label className="form__label" htmlFor={"user-avatar"}>
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
            <button className="form__submit" type="submit">
                {isLoading ? editProfileLoading : editProfileButton}
            </button>
        </ModalWithForm>
    );
};

export default EditProfileModal;
