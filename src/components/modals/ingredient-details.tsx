import styles from "./ingredinet-details.module.css";
import { useMemo } from "react";
import { useAppSelector } from "../../services/store.ts";
import { getIngredients } from "../../services/ingredients/ingredients-slice.ts";
import { useParams } from "react-router-dom";

function IngredientDetails() {
  const { id } = useParams();
  console.log(id)
  const ingredients = useAppSelector(getIngredients);
  const ingredient = useMemo(() => {
    return ingredients.find((item) => item._id === id);
  }, [ingredients, id]);

  if (!ingredient) return null;
  return (
    <div className={`${styles.container} pb-15`}>
      <img alt={ingredient.name} src={ingredient.image_large} />
      <h3 className="text text_type_main-medium pt-5 pb-10">
        {ingredient.name}
      </h3>
      <ul className={`${styles.list} text_color_inactive pb-15`}>
        <li className={`${styles.list_item} pr-15`}>
          <p className="text text_type_main-default ">Калории,ккал</p>
          <span className="text text_type_digits-default">
            {ingredient.calories}
          </span>
        </li>
        <li className={`${styles.list_item} pr-15`}>
          <p className="text text_type_main-default ">Белки, г</p>
          <span className="text text_type_digits-default ">
            {ingredient.proteins}
          </span>
        </li>
        <li className={`${styles.list_item} pr-15`}>
          <p className="text text_type_main-default ">Жиры, г</p>
          <span className="text text_type_digits-default">
            {ingredient.fat}
          </span>
        </li>
        <li className={styles.list_item}>
          <p className="text text_type_main-default ">Углеводы, г</p>
          <span className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
