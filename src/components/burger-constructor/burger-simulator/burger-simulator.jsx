import styles from "./burger-simulator.module.css";
import PropTypes from "prop-types";
function BurgerSimulator({ text, style }) {
  return (
    <div className={styles.simulator} style={{ borderRadius: `${style}` }}>
      {text}
    </div>
  );
}

BurgerSimulator.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
};

export default BurgerSimulator;
