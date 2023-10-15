import { FC } from "react";
import styles from "./ShoppingList.module.scss";
import cn from "classnames";

type Product = {
  value: string;
  checked: boolean;
  id: number;
  quantity: number;
};

interface IShoppingList {
  items: Product[];
  onDeleteItems: (Date) => void;
  setCheckboxValue: (boolean) => void;
  checkboxChecked?: boolean;
  list?: boolean;
  productInCart?: boolean;
}
const ShoppingList: FC<IShoppingList> = ({
  items,
  onDeleteItems,
  setCheckboxValue,
  checkboxChecked,
  list,
  productInCart,
}) => {
  return (
    <div
      className={cn(
        styles.element,
        list ? styles.active : styles.hide,
        productInCart ? styles.active : styles.hide
      )}
    >
      {items.map((item, id) => (
        <div className={styles.product} key={id}>
          <label className={styles.checkboxStyled}>
            <input
              type="checkbox"
              onChange={() => setCheckboxValue(item.id)}
              checked={checkboxChecked}
              id="check"
            />
            <span className={styles.checkboxNew}></span>
          </label>
          <p>
            {item.quantity} {item.value}
          </p>
          <div onClick={() => onDeleteItems(item.id)} className={styles.x}>
            ❌
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;
