import { FC } from "react";
import styles from "./ShoppingList.module.scss";

export type Product = {
  value: string;
  checked: boolean;
  id: Date;
  quantity: number;
};

interface IShoppingList {
  items: Product[];
  onDeleteItems: (value: Date) => void;
  setCheckboxValue: (value: Date) => void;
  checkboxChecked?: boolean;
}
const ShoppingList: FC<IShoppingList> = ({
  items,
  onDeleteItems,
  setCheckboxValue,
  checkboxChecked,
}) => {
  return (
    <div className={styles.element}>
      {items?.map((item, id) => (
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
