import IngredientDetails from "../../components/modals/ingredient-details";
import styles from "./ingredient-page.module.css";

function IngredientPage() {
  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large pt-10`}>
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </>
  );
}

export default IngredientPage;
