import { useContext } from "react";
import "./ModalWithForm.css";
import ModalContext from "../../contexts/ModalContext";
import { useEscape } from "../../hooks/useEscape";

function ModalWithForm({ children, handleSubmit }) {
  const { handleClose, modalOptions, isLoading } = useContext(ModalContext);
  const { title, name, buttonText, loadingText } = modalOptions.formOptions;

  useEscape(handleClose);

  return (
    <div className={`modal modal_type_${name}`}>
      <div className={`modal__container`}>
        <h3 className="modal__title">{title}</h3>
        <form
          className="modal__form form"
          name={name}
          id={name}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          {children}
          <button className="form__submit" type="submit">
            {isLoading ? loadingText : buttonText}
          </button>
        </form>
        <button className="modal__close-button" onClick={handleClose} />
      </div>
    </div>
  );
}

export default ModalWithForm;
