import OrderList from "../order-list/order-list";
import { useAppDispatch } from "../../services/store";
import { useEffect } from "react";
import { wsHistoryConnect, wsHistoryDisconnect } from "../../services/history/actions";
import { useAppSelector } from "../../services/store";
import { getHistory } from "../../services/history/history-slice";

const WS_URL = "wss://norma.nomoreparties.space/orders";

function OrderHistory() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getHistory)
  const token = localStorage.getItem("accessToken")?.split("Bearer ")[1];

  useEffect(() => {
    dispatch(wsHistoryConnect({ url: `${WS_URL}?token=${token}` }));
    return () => {
      dispatch(wsHistoryDisconnect());
    };
  }, [dispatch]);
  const reversedOrders = orders ? [...orders].reverse() : [];
  return <OrderList orders={reversedOrders}  />;
}

export default OrderHistory;
