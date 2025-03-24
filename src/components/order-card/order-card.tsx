import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { IIngredientObj, IOrder } from "../../utils/type";
import { getIngredients } from "../../services/ingredients/ingredients-slice.ts";
import { useAppSelector } from "../../services/store";

interface IProps {
  order: IOrder;
}

function OrderCard({ order }: IProps) {
  const ingredients = useAppSelector(getIngredients)

  const location = useLocation();
  const isProfile = location.pathname.includes("profile");

  const orderIngredients = order.ingredients.reduce<IIngredientObj[]>(
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

  const totalCost = orderIngredients.reduce((acc, item) => acc + item.price, 0);
  const imageIngredients = orderIngredients.slice(0, 6);

  return (
    <li className={styles.item}>
      <Link
        className={`${styles.link} pr-6 pl-6`}
        to={isProfile ? `/profile/orders/${order.number}` : `/feed/${order.number}`}
        state={{ background: location }}
      >
        <div className={`${styles.order_container} mt-6`}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <FormattedDate
            className="text text_type_main-default text_color_inactive"
            date={new Date(order.createdAt)}
          />
        </div>
        <p className="text text_type_main-medium mt-6 ">{order.name}</p>
        { isProfile ?
        ( <div className='mt-2'>
          { order.status === 'done' ? 
          ( <span className={styles.status_done}>Выполнен</span> ) 
          : order.status === 'created' ? 
          ( <span className={styles.status_created}>Создан</span> )
          : ( <span className={styles.status_panding}>Готовится</span> )
          }
        </div> ) : false
        }
        <div className={`${styles.container} mb-6 mt-6`}>
          <div className={styles.image_container}>
            {imageIngredients.map((item, index) => {
              const count = order.ingredients.length - 6;
              return (
                <div className={styles.image} key={index}>
                  <img
                    className={`${styles.image_item} ${
                      orderIngredients.length < 7
                        ? ""
                        : index === 5 && styles.image_last
                    }`}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                  {count > 0 && index === 5 && (
                    <span
                      className={`${styles.count} text text_type_main-default`}
                    >
                      +{count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default pr-2">{totalCost}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default OrderCard;
