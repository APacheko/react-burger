import styles from "./burger-simulator.module.css";

type Props = {
  text: string;
  style: string;
};

function BurgerSimulator({ text, style }: Props) {
  return (
    <div className={styles.simulator} style={{ borderRadius: `${style}` }}>
      {text}
    </div>
  );
}

export default BurgerSimulator;
