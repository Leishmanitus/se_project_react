import "./ModalWithForm.css";

function ModalWithForm({ children, title, name, handleClose }) {
  return (
    <div className="modal">
      <div className={`modal__container modal__container_type_${name}`}>
        <h3 className="modal__title">New {title}</h3>
        <form className="modal__form form" name={name}>
          {children}
          <button className="form__submit" type="submit">
            Add {name}
          </button>
        </form>
        <button
          className="modal__close-button"
          onClick={(event) => handleClose(event)}
        ></button>
      </div>
    </div>
  );
}

export default ModalWithForm;
