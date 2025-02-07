import styles from "./ingredients-category.module.css";
import BurgerItem from "../burger-item/burger-item";
import PropTypes from "prop-types";

function IngredientCategory({ ingredients, title, isOpen, refs }) {

  return (
    <section>
      <p ref={refs} className="text_type_main-medium">
        {title}
      </p>
      <ul className={styles.list}>
        {ingredients.map((item) => (
          <BurgerItem key={item._id} item={item} isOpen={() => isOpen(item)} />
        ))}
      </ul>
    </section>
  );
}

IngredientCategory.propTypes = {
  ingredients: PropTypes.array,
  title: PropTypes.string,
  refs: PropTypes.any,
  isOpen: PropTypes.func,
};

export default IngredientCategory;
