import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import BurgerItem from "./burger-item/burger-item";
import Modal from "../modals/modal";
import IngredientDetails from "../modals/ingredient-details";
import useModal from "../../hooks/useModal";

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = useState("bun");
  const [ingredientData, setIngredientData] = useState({});
  const { isModalOpen, openModal, closeModal } = useModal();

  const bun = ingredients.filter((item) => item.type === "bun");
  const sauce = ingredients.filter((item) => item.type === "sauce");
  const main = ingredients.filter((item) => item.type === "main");

  function getData(data) {
    setIngredientData(data);
    openModal();
  }

  return (
    <>
      <div className={`${styles.container}  mr-10`}>
        <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
        <div className={styles.tab_container}>
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={`${styles.ingredients} mt-10`}>
          <section>
            <p className="text_type_main-medium">Булки</p>
            <ul className={styles.list}>
              {bun.map((item) => (
                <BurgerItem
                  key={item._id}
                  item={item}
                  isOpen={() => getData(item)}
                />
              ))}
            </ul>
          </section>
          <section>
            <p className="text_type_main-medium pt-10"> Соусы</p>
            <ul className={styles.list}>
              {sauce.map((item) => (
                <BurgerItem
                  key={item._id}
                  item={item}
                  isOpen={() => getData(item)}
                />
              ))}
            </ul>
          </section>
          <section>
            <p className="text_type_main-medium pt-10">Начинки</p>
            <ul className={styles.list}>
              {main.map((item) => (
                <BurgerItem
                  key={item._id}
                  item={item}
                  isOpen={() => getData(item)}
                />
              ))}
            </ul>
          </section>
        </div>

        {isModalOpen && (
          <Modal title="Детали ингредиента" onClose={closeModal}>
            <IngredientDetails data={ingredientData} />
          </Modal>
        )}
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array,
};

export default BurgerIngredients;
