import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay";
import { useEffect, ReactNode } from "react";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

type Props = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ children, title, onClose }: Props) {
  useEffect(() => {
    function handleClose(evt: KeyboardEvent) {
      if (evt.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keyup", handleClose);
    return () => {
      document.removeEventListener("keyup", handleClose);
    };
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

export default Modal;
