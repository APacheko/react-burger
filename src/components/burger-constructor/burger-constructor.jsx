import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "../../hooks/useModal.js";
import Modal from "../modals/modal";
import OrderDetails from "../modals/order-details";
import img from "@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png";
import PropTypes from "prop-types";

import styles from "./burger-constructor.module.css";

function BurgerConstructor({ ingredients }) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const filling = ingredients.filter((item) => item.type !== "bun");

  return (
    <>
      <div className={`${styles.container} pt-15 pl-4`}>
        <ul className={styles.list}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
          <div className={`${styles.list_container} `}>
            {filling.map((item) => (
              <li className={`${styles.list_item} pr-8`} key={item._id}>
                <DragIcon className="mr-2 mb-2" type="primary" />
                <ConstructorElement
                  type={item.type}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ))}
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </ul>
        <div className={`${styles.order_container} pt-10 mr-7`}>
          <div className={`${styles.order} mr-10`}>
            <p className="text text_type_digits-medium mr-2">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
        </div>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array,
};

export default BurgerConstructor;
