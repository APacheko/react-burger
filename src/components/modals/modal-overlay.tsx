import styles from "./modal-overlay.module.css";

type Props = {
  onClose: () => void;
};

function ModalOverlay({ onClose }: Props) {
  return <div className={styles.overlay} onClick={onClose}></div>;
}

export default ModalOverlay;
