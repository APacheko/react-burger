import styles from "./feed-page.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { wsConnect, wsDisconnect } from "../../services/feed/actions";
import OrderList from "../../components/order-list/order-list";
import {
  getTotal,
  getTotalToday,
  getOrders,
} from "../../services/feed/feed-slice";
const WS_URL = "wss://norma.nomoreparties.space/orders/all";

function FeedPage() {
  const dispatch = useAppDispatch();
  const totalToday = useAppSelector(getTotalToday);
  const total = useAppSelector(getTotal);
  const orders = useAppSelector(getOrders);

  useEffect(() => {
    dispatch(wsConnect({ url: WS_URL }));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);
  return (
    <main className={`${styles.main} pt-10`}>
      <h1 className="text text_type_main-large ml-5">Лента заказов</h1>
      <div className={styles.container}>
        <OrderList orders={orders} />
        <div className={styles.orders_container}>
          <div className={styles.status_container}>
            <div>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <ul className={styles.orders_list}>
                {orders && orders
                  .filter((filter) => filter.status === "done")
                  .slice(0, 10)
                  .map((order) => (
                    <li
                      key={order._id}
                      className={`${styles.orders_done} text text_type_digits-default`}
                    >
                      {order.number}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mb-20 pl-9">
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <ul className={styles.orders_list}>
                {orders && orders
                  .filter((filter) => filter.status === "done")
                  .slice(0, 10)
                  .map((order) => (
                    <li
                      key={order._id}
                      className={`${styles.orders} text text_type_digits-default`}
                    >
                      {order.number}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mb-15">
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <p className={`${styles.order} text text_type_digits-large`}>
              {total}
            </p>
          </div>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <p className={`${styles.order} text text_type_digits-large`}>
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FeedPage;
