import styles from "./order-datails.module.css";
import orderImage from "../../images/done.png";
import Preloader from "../preloader/preloader";
import { getOrderData } from "../../services/order/order-slice.ts";
import { useAppDispatch, useAppSelector } from "../../services/store.ts"; 
import { clearConstructor } from "../../services/constructor/constructor-slice.ts";
import { useEffect } from "react";

function OrderDetails() {
  const { order, error, loading } = useAppSelector(getOrderData);
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    if (order) {
      dispatch(clearConstructor());
    }
  }, [order]);

  return (
    <>
      {order && (
        <div className={styles.container}>
          <p
            className={`${styles.order} text text_type_digits-large pt-20 pb-10`}
          >
            {order.number}
          </p>
          <p className="text text_type_main-default pb-15">
            идентификатор заказа
          </p>
          <img alt="Статус заказ" src={orderImage} />
          <p className="text text_type_main-default pt-15 pb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive pb-30">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
      {loading && <Preloader />}
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
}

export default OrderDetails;
