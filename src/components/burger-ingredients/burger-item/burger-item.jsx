import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-item.module.css";

function BurgerItem({ item, isOpen }) {
  return (
    <li className={styles.list_item} onClick={isOpen} >
      <Counter count={1} size="default" extraClass="m-1" />
      <img className={`${styles.image} mb-2 mt-2 `} src={item.image} />
      <div className={styles.price_container}>
        <p className="text text_type_digits-default mr-2 mb-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.title} text text_type_main-default pb-2`}>{item.name}</h3>
    </li>
  );
}

BurgerItem.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.func,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string
};

export default BurgerItem;
