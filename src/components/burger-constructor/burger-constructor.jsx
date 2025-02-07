import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerSimulator from "./burger-simulator/burger-simulator.jsx";
import BurgerConstructorItem from "./burger-constructor-item.jsx";
import Modal from "../modals/modal";
import OrderDetails from "../modals/order-details";
import styles from "./burger-constructor.module.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/auth/auth-slice.js";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  ingredientsConstructor,
  bunConstructor,
  addIngredintConstructor,
  switchIngredient,
} from "../../services/constructor/constructor-slice.js";
import {
  postOrderThunk,
  deleteOrderData,
  getIsOpenModal,
} from "../../services/order/order-slice.js";
import { useMemo } from "react";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector(ingredientsConstructor);
  const isOpenModal = useSelector(getIsOpenModal);
  const bun = useSelector(bunConstructor);
  const { user } = useSelector(getUser);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredintConstructor(item));
    },
  });

  const moveListElement = (dragIndex, hoverIndex) =>
    dispatch(switchIngredient({ dragIndex, hoverIndex }));

  const countTotalCost = (bun, ingredients) =>
    (bun ? bun.price * 2 : 0) +
    ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalCost = useMemo(
    () => countTotalCost(bun, ingredients),
    [bun, ingredients]
  );

  const submitOrder = () => {
    if (user) {
      dispatch(
        postOrderThunk([
          bun._id,
          ...ingredients.map((item) => item._id),
          bun._id,
        ])
      );
    } else {
      return navigate("/login");
    }
  };

  const removeData = () => {
    dispatch(deleteOrderData());
  };

  return (
    <>
      <div ref={dropTarget} className={`${styles.container} pt-15 pl-4`}>
        <ul className={styles.list}>
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
