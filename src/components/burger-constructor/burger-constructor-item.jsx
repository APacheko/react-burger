import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDispatch } from "react-redux";
import { deleteIngredientConstructor } from "../../services/constructor/constructor-slice.js";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { useRef } from "react";

function BurgerConstructorItem({ item, moveListItem, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: "switchIngredient",
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "switchIngredient",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const dragDropRef = dragRef(dropRef(ref));

  return (
    <div className={styles.item_container}>
      <DragIcon className="mr-2 mb-2" type="primary" />
      <li
        style={{ opacity: isDrag ? 0 : 1 }}
        ref={dragDropRef}
        className={`${styles.list_item} `}
        key={item.uuid}
        draggable={true}
      >
        <ConstructorElement
          type={item.type}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => dispatch(deleteIngredientConstructor(item.uuid))}
        />
      </li>
    </div>
  );
}

BurgerConstructorItem.propTypes = {
  item: PropTypes.object,
  moveListItem: PropTypes.func,
  index: PropTypes.number,
};

export default BurgerConstructorItem;
