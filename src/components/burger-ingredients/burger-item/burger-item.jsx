import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-item.module.css";
import { useDrag } from "react-dnd";
import {
  ingredientsConstructor,
  bunConstructor,
} from "../../../services/constructor/constructor-slice";
import { useSelector } from "react-redux";

function BurgerItem({ item, isOpen }) {
  const { _id, name, type, price, image } = item;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id, name, type, price, image },
  });
  const bun = useSelector(bunConstructor);
  const ingredints = useSelector(ingredientsConstructor);
  const count = ingredints.filter((element) => item._id === element._id);

  return (
    <li ref={dragRef} className={styles.list_item} onClick={isOpen}>
      {count.length !== 0 && (
        <Counter count={count.length} size="default" extraClass="m-1" />
      )}
      {bun && bun._id === item._id && (
        <Counter count={2} size="default" extraClass="m-1" />
      )}
      <img
        alt={item.name}
        className={`${styles.image} mb-2 mt-2 `}
        src={item.image}
      />
      <div className={styles.price_container}>
        <p className="text text_type_digits-default mr-2 mb-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.title} text text_type_main-default pb-2`}>
        {item.name}
      </h3>
    </li>
  );
}

BurgerItem.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.func,
};

export default BurgerItem;
