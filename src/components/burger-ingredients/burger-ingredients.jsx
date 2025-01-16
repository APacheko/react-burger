import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useMemo } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientCategory from "./ingredients-category/ingredients-category";
import Modal from "../modals/modal";
import IngredientDetails from "../modals/ingredient-details";
import useModal from "../../hooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/ingredients/ingredients-slice";
import {
  addIngredientData,
  removeIngredientData,
} from "../../services/details/details-slice";

function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const { isModalOpen, openModal, closeModal } = useModal();

  const ingredients = useSelector(getIngredients);
  const dispatch = useDispatch();

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  const tabsRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const handleScroll = () => {
    if (
      tabsRef.current &&
      bunsRef.current &&
      saucesRef.current &&
      mainsRef.current
    ) {
      const bunsDist = Math.abs(
        tabsRef.current.getBoundingClientRect().bottom -
          bunsRef.current.getBoundingClientRect().top
      );
      const saucesDist = Math.abs(
        tabsRef?.current.getBoundingClientRect().bottom -
          saucesRef?.current.getBoundingClientRect().top
      );
      const mainsDist = Math.abs(
        tabsRef?.current.getBoundingClientRect().bottom -
          mainsRef?.current.getBoundingClientRect().top
      );
      const minDist = Math.min(bunsDist, saucesDist, mainsDist);
      const currentHeader =
        minDist === bunsDist
          ? "bun"
          : minDist === saucesDist
          ? "sauce"
          : "main";
      setCurrent((prevState) =>
        currentHeader === prevState ? prevState : currentHeader
      );
    }
  };

  function removeData() {
    dispatch(removeIngredientData());
    closeModal();
  }

  function getData(data) {
    dispatch(addIngredientData(data));
    openModal();
  }

  return (
    <>
      <div className={`${styles.container}  mr-10`}>
        <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
        <div ref={tabsRef} className={styles.tab_container}>
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
        <div
          onScroll={() => handleScroll()}
          className={`${styles.ingredients} mt-10`}
        >
          <IngredientCategory
            refs={bunsRef}
            title="Булки"
            ingredients={buns}
            isOpen={getData}
          />
          <IngredientCategory
            refs={saucesRef}
            title="Соусы"
            ingredients={sauces}
            isOpen={getData}
          />
          <IngredientCategory
            refs={mainsRef}
            title="Начинки"
            ingredients={mains}
            isOpen={getData}
          />
        </div>

        {isModalOpen && (
          <Modal title="Детали ингредиента" onClose={removeData}>
            <IngredientDetails />
          </Modal>
        )}
      </div>
    </>
  );
}

export default BurgerIngredients;
