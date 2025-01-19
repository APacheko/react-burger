import styles from "./order-datails.module.css";
import orderImage from "../../images/done.png";
import { getOrderData } from "../../services/order/order-slice";
import { useSelector } from "react-redux";

function OrderDetails() {
  const order = useSelector(getOrderData);

  return (
    <>
      {order && (
        <div className={styles.container}>
          <p
            className={`${styles.order} text text_type_digits-large pt-20 pb-10`}
          >
            {order.order.number}
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
    </>
  );
}

export default OrderDetails;
