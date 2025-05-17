import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerSimulator from "./burger-simulator/burger-simulator.tsx";
import BurgerConstructorItem from "./burger-constructor-item.tsx";
import Modal from "../modals/modal.tsx";
import OrderDetails from "../modals/order-details.tsx";
import styles from "./burger-constructor.module.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/auth/auth-slice.ts";
import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../services/store.ts"; 
import {
  ingredientsConstructor,
  bunConstructor,
  addIngredintConstructor,
  switchIngredient,
} from "../../services/constructor/constructor-slice.ts";
import {
  postOrderThunk,
  deleteOrderData,
  getIsOpenModal,
} from "../../services/order/order-slice.ts";
import { useMemo } from "react";
import { IIngredientObj } from "../../utils/type.ts";

interface IIngredient {
  _id: string;
  name: string;
  type: string | undefined;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
}

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ingredients = useAppSelector(ingredientsConstructor);
  const isOpenModal = useAppSelector(getIsOpenModal);

  const bun = useAppSelector(bunConstructor);
  
  const { user } = useAppSelector(getUser);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredintConstructor(item));
    },
  });

  const moveListElement = (dragIndex: number, hoverIndex: number) =>
    dispatch(switchIngredient({ dragIndex, hoverIndex }));

  const countTotalCost = (bun: IIngredient | null, ingredients: IIngredientObj[]) =>
    (bun ? bun.price * 2 : 0) +
    ingredients.reduce((acc: number, ingredient) => acc + ingredient.price, 0);

  const totalCost = useMemo(
    () => countTotalCost(bun, ingredients),
    [bun, ingredients]
  );

  const submitOrder = () => {
    if (user) {
      if (bun) {
        dispatch(
          postOrderThunk([
            bun._id,
            ...ingredients.map((item) => item._id),
            bun._id,
          ])
        );
      } else {
        console.error("Ошибка")
      }
    } else {
      navigate("/login");
    }
};

  const removeData = () => {
    dispatch(deleteOrderData());
  };

  return (
    <>
      <div ref={dropTarget} className={`${styles.container} pt-15 pl-4`}>
        <ul className={styles.list} data-test="constructor">
          {bun ? (
            <ConstructorElement 
              type="top"
              isLocked={true}
              text={bun.name + "(верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <BurgerSimulator
              style="88px 88px 40px 40px"
              text="Перенесите булку на это место"
            />
          )}
          <div className={`${styles.list_container} `}>
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => (
                <BurgerConstructorItem
                  item={item}
                  key={item.uuid}
                  index={index}
                  moveListItem={moveListElement}
                />
              ))
            ) : (
              <BurgerSimulator
                style="40px"
                text="Перенесите игредиенты на это место"
              />
            )}
          </div>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + "(низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <BurgerSimulator
              style="40px 40px 88px 88px"
              text="Перенесите булку на это место"
            />
          )}
        </ul>
        <div className={`${styles.order_container} pt-10 mr-7`}>
          <div className={`${styles.order} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{totalCost}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            data-test="submit"
            htmlType="button"
            type="primary"
            size="large"
            onClick={submitOrder}
            disabled={!bun || ingredients.length === 0}
          >
            Оформить заказ
          </Button>
        </div>
        {isOpenModal && (
          <Modal onClose={removeData}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </>
  );
}

export default BurgerConstructor;
