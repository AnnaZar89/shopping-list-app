import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ShoppingList from "../ShoppingList/ShoppingList";
import styles from "./Container.module.scss";
import { ReactComponent as ShoppingCart } from "../../assets/icons/shopping-cart.svg";
import { ReactComponent as ProductList } from "../../assets/icons/list.svg";

const Container = () => {
  const storedItems = JSON.parse(localStorage.getItem("shopping-list-app"));
  const [items, setProduct] = useState(storedItems);

  useEffect(() => {
    localStorage.setItem("shopping-list-app", JSON.stringify(items));
  }, [items]);

  const addProducts = (product: {}) => {
    setProduct((items) => [...items, product]);
  };

  const deleteProducts = (id: {}) => {
    setProduct((items) => items.filter((item) => item.id !== id));
  };

  const checkProduct = (val) => {
    setProduct((items) =>
      items.map((item) =>
        item.id === val
          ? { ...item, checked: !item.checked }
          : { ...item, checked: item.checked }
      )
    );
  };

  const checkedTrue = items.filter((element) => element.checked === true);
  const checkedFalse = items.filter((element) => element.checked === false);

  return (
    <div className={styles.element}>
      <SearchBar onAddItems={addProducts} />
      <div className={styles.shoppingListWrapper}>
        <div className={styles.icons}>
          <ProductList />
          <ShoppingCart />
        </div>
        <div className={styles.shoppingList}>
          <ShoppingList
            items={checkedFalse}
            onDeleteItems={deleteProducts}
            setCheckboxValue={checkProduct}
            checkboxChecked={false}
          />
          <ShoppingList
            items={checkedTrue}
            onDeleteItems={deleteProducts}
            setCheckboxValue={checkProduct}
            checkboxChecked={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
