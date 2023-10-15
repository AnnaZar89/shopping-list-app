import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ShoppingList from "../ShoppingList/ShoppingList";
import styles from "./Container.module.scss";
import { ReactComponent as ShoppingCart } from "../../assets/icons/shopping-cart.svg";
import { ReactComponent as ProductList } from "../../assets/icons/list.svg";

const Container = () => {
  const storedItems = JSON.parse(localStorage.getItem("shopping-list-app"));
  const [items, setProduct] = useState(storedItems);
  const [list, showList] = useState(false);
  const [productsInCart, showProductsInCart] = useState(false);

  const checkedTrue = items.filter((element) => element.checked === true);
  const checkedFalse = items.filter((element) => element.checked === false);

  const removeFromStorage = () => {
    localStorage.clear();
    setProduct([]);
  };

  useEffect(() => {
    localStorage.setItem("shopping-list-app", JSON.stringify(items));
    if (checkedTrue.length === 0) {
      showProductsInCart(false);
    } else if (checkedTrue.length !== 0) {
      showProductsInCart(true);
    }
    if (checkedFalse.length === 0) {
      showList(false);
    } else if (checkedFalse.length !== 0) {
      showList(true);
    }
  }, [items, checkedTrue, checkedFalse]);

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

  return (
    <div className={styles.element}>
      <SearchBar
        onAddItems={addProducts}
        removeFromStorage={removeFromStorage}
        showList={() => showList(list !== true ? !list : list)}
      />
      <div className={styles.shoppingListWrapper}>
        <div className={styles.icons}>
          <ProductList onClick={() => showList(!list)} />
          <ShoppingCart onClick={() => showProductsInCart(!productsInCart)} />
        </div>
        <div className={styles.shoppingList}>
          <ShoppingList
            items={checkedFalse}
            onDeleteItems={deleteProducts}
            setCheckboxValue={checkProduct}
            checkboxChecked={false}
            list={list}
          />
          <ShoppingList
            items={checkedTrue}
            onDeleteItems={deleteProducts}
            setCheckboxValue={checkProduct}
            checkboxChecked={true}
            productInCart={productsInCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
