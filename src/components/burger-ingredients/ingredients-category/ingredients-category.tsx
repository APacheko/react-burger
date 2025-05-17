import styles from "./ingredients-category.module.css";
import BurgerItem from "../burger-item/burger-item";
import { IIngredientObj } from "../../../utils/type";
import { RefObject } from "react";

type Props = {
  ingredients: IIngredientObj[];
  title: string;
  isOpen: (item: IIngredientObj) => void;
  refs: RefObject<HTMLParagraphElement>;
  test: string;
};

function IngredientCategory({ ingredients, title, isOpen, refs, test }: Props) {
  return (
    <section>
      <p ref={refs} className="text_type_main-medium">
        {title}
      </p>
      <ul className={styles.list}>
        {ingredients.map((item) => (
          <BurgerItem key={item._id} test={test} item={item} isOpen={() => isOpen(item)} />
        ))}
      </ul>
    </section>
  );
}

export default IngredientCategory;
