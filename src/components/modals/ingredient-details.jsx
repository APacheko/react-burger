import PropTypes from "prop-types";
import styles from "./ingredinet-details.module.css";

function IngredientDetails({ data }) {
  return (
    <div className={`${styles.container} pb-15`}>
      <img src={data.image_large} />
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

IngredientDetails.propTypes = {
  data: PropTypes.object,
  image_large: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number
};

export default IngredientDetails;
