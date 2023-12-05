import "./ModalWithForm.css";

function ModalWithForm({ children, title, name, handleClose }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className={`modal__container`}>
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
