import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientObj } from "../../utils/type";
import styles from "./order-info.module.css";
import { useLocation, useParams } from "react-router-dom";
import { getIngredients } from "../../services/ingredients/ingredients-slice.ts";
import { getOrders } from "../../services/feed/feed-slice.ts";
import { getHistory } from "../../services/history/history-slice.ts";
import { useAppSelector } from "../../services/store";
import { useEffect, useState } from "react";
import { getOrderByNumber } from "../../utils/api.ts";

interface IIngredients {
  count: number;
  price: number;
  image_mobile: string;
}

function OrderInfo() {
  const ingredients = useAppSelector(getIngredients);
  const orders = useAppSelector(getOrders);
  const historyOrders = useAppSelector(getHistory);
  const { state } = useLocation();
  const { number } = useParams();
  const [isOrder, setIsOrder] = useState();
  
  const orderNumber = number ? parseFloat(number) : null;

  let order
  
  if (orders || historyOrders) {
    order =  orders?.find((item) => item.number === orderNumber) ||
    historyOrders?.find((item) => item.number === orderNumber);
  } else {
     order = isOrder
  }

  useEffect(() => {
    if (!orders && !historyOrders && orderNumber !== null) {
      getOrderByNumber(orderNumber)
        .then((res) => {
         setIsOrder(res.orders[0])

        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [orders, historyOrders]);
  const orderIngredients = order?.ingredients.reduce<IIngredientObj[]>(
    (acc, id) => {
      const ingredient = ingredients.find(
        (ingredient) => ingredient._id === id
      );
      if (ingredient) {
        acc.push(ingredient);
      }
      return acc;
    },
    []
  );

  const result =
    orderIngredients?.reduce<Record<string, IIngredients>>(
      (acc, ingredient) => {
        if (!acc[ingredient.name]) {
          acc[ingredient.name] = {
            count: 0,
            price: ingredient.price,
            image_mobile: ingredient.image_mobile,
          };
        }
        acc[ingredient.name].count += 1;

        return acc;
      },
      {}
    ) || {};

  const resultArray = Object.entries(result).map(
    ([name, data]: [string, IIngredients]) => ({
      name,
      image_mobile: data.image_mobile,
      count: data.count,
      price: data.price,
    })
  );

  const totalSum = resultArray.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <div className={state ? styles.modal : styles.container}>
      <div className={styles.content}>
        <p
          className={`${
            state ? "" : styles.number
          } text text_type_digits-default`}
        >
          #{order?.number}
        </p>
        <h1 className="text text_type_main-medium mt-10 mb-3">{order?.name}</h1>

        {order?.status === "done" ? (
          <span className={`${styles.status_done} text text_type_main-default`}>
            Выполнен
          </span>
        ) : order?.status === "created" ? (
          <span>Создан</span>
        ) : (
          <span>Готовится</span>
        )}

        <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
        <ul className={styles.list}>
          {resultArray.map((item, index) => (
            <li key={index}>
              <div className="mb-4">
                <div className={styles.ingredients}>
                  <div className={styles.name}>
                    <div className={styles.image}>
                      <img
                        className={styles.image_item}
                        src={item.image_mobile}
                        alt={item.name}
                      />
                    </div>
                    <div className={styles.title}>
                      <p className="text text_type_main-default ml-4">
                        {item.name}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.price} mr-8`}>
                    <p className="text text_type_digits-default mr-2">
                      {item.count} x {item.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={`${styles.date} mt-8 mb-15`}>
          <FormattedDate
            className="text text_type_main-default text_color_inactive"
            date={new Date()}
          />
          <div className={styles.total}>
            <p className="text text_type_digits-default mr-2">{totalSum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
