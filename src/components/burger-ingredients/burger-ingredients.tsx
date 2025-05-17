import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useMemo, RefObject } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientCategory from "./ingredients-category/ingredients-category";
import useModal from "../../hooks/useModal";
import { useAppSelector } from "../../services/store.ts";
import { getIngredients } from "../../services/ingredients/ingredients-slice.ts";
import { IIngredientObj } from "../../utils/type.tsx";

function BurgerIngredients() {
  const [current, setCurrent] = useState<string>("bun");
  const { openModal } = useModal();

  const ingredients: IIngredientObj[] = useAppSelector(getIngredients);

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

  const tabsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const bunsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const saucesRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const mainsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

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
            test="bun"
            refs={bunsRef}
            title="Булки"
            ingredients={buns}
            isOpen={openModal}
          />
          <IngredientCategory
          test="sauce"
            refs={saucesRef}
            title="Соусы"
            ingredients={sauces}
            isOpen={openModal}
          />
          <IngredientCategory
            test="main"
            refs={mainsRef}
            title="Начинки"
            ingredients={mains}
            isOpen={openModal}
          />
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
