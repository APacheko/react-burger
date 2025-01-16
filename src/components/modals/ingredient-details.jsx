
import styles from "./ingredinet-details.module.css";
import { useSelector } from "react-redux";
import { getIngredient } from "../../services/details/details-slice";

function IngredientDetails() {
 
  const data = useSelector(getIngredient)
  return (
    <div className={`${styles.container} pb-15`}>
      <img alt={data.name} src={data.image_large} />
      <h3 className="text text_type_main-medium pt-5 pb-10">{data.name}</h3>
      <ul className={`${styles.list} text_color_inactive pb-15`}>
        <li className={`${styles.list_item} pr-15`}>
          <p className="text text_type_main-default ">Калории,ккал</p>
          <span className="text text_type_digits-default">{data.calories}</span>
        </li>
        <li className={`${styles.list_item} pr-15`}>
          <p className="text text_type_main-default ">Белки, г</p>
          <span className="text text_type_digits-default ">
            {data.proteins}
          </span>
        </li>
        <li className={`${styles.list_item} pr-15`}>
          <p className="text text_type_main-default ">Жиры, г</p>
          <span className="text text_type_digits-default">{data.fat}</span>
        </li>
        <li className={styles.list_item}>
          <p className="text text_type_main-default ">Углеводы, г</p>
          <span className="text text_type_digits-default">
            {data.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}



export default IngredientDetails;
