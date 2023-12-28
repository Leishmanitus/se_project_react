import { useContext } from "react";
import "./ModalWithForm.css";
import ModalContext from "../../contexts/ModalContext";

function ModalWithForm({ children, handleClose, handleSubmit }) {
  const { modalOptions } = useContext(ModalContext);
  const { title, name, buttonText } = modalOptions.formOptions;

  return (
    <div className={`modal modal_type_${name}`}>
      <div className={`modal__container`}>
        <h3 className="modal__title">{title}</h3>
        <form
          className="modal__form form"
          name={name}
          id={name}
          onSubmit={handleSubmit}
        >
          {children}
          <button className="form__submit" type="submit" htmlFor={name}>
            {buttonText}
          </button>
        </form>
        <button className="modal__close-button" onClick={handleClose}></button>
      </div>
    </div>
  );
}

export default ModalWithForm;
