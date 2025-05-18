import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useAppDispatch } from "../../services/store.ts"; 
import { deleteIngredientConstructor } from "../../services/constructor/constructor-slice.ts";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "dnd-core";
import { useRef } from "react";
import { IIngredientObj } from "../../utils/type.tsx";

interface IBurgerConstructorItem {
  item: IIngredientObj;
  index: number;
  moveListItem: Function;
}

function BurgerConstructorItem({
  item,
  moveListItem,
  index,
}: IBurgerConstructorItem) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: "switchIngredient",
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<{ index: number }>({
    accept: "switchIngredient",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverActualY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <div  className={styles.item_container}>
      <DragIcon className="mr-2 mb-2" type="primary" />
      <li data-test="constructor-item"
        style={{ opacity: isDrag ? 0 : 1 }}
        ref={ref}
        className={`${styles.list_item} `}
        key={item.uuid}
        draggable={true}
      >
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => dispatch(deleteIngredientConstructor(item.uuid))}
        />
      </li>
    </div>
  );
}

export default BurgerConstructorItem;
