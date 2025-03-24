import styles from "./order-list.module.css";
import OrderCard from "../order-card/order-card";
import { IOrder } from "../../utils/type.tsx";

interface IProps {
  orders: IOrder[] | null;
}

function OrderList({ orders }: IProps) {
  return (
    <ul className={styles.list}>
      {orders &&
        orders.map((order: IOrder) => (
          <OrderCard key={order.number} order={order} />
        ))}
    </ul>
  );
}

export default OrderList;
