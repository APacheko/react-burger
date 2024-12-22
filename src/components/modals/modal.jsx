import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay";
import { useEffect } from "react";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, title, onClose }) {

  useEffect(() => {
    function handleClose(evt) {
      if (evt.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keyup", handleClose);
      return () => {
        document.removeEventListener("keyup", handleClose)
      }
  }, [onClose]);
  return createPortal(
    <>
      <article className={styles.modal}>
        <div className={`${styles.container} pt-15 pr-10 pl-10`}>
          <h2 className={`${styles.title} text text_type_main-large `}>
            {title}
          </h2>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        <div className={styles.content}>{children}</div>
      </article>
      <ModalOverlay onClose={onClose} />
    </>,

    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
