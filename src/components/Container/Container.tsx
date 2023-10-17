import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ShoppingList from "../ShoppingList/ShoppingList";
import styles from "./Container.module.scss";
import { Product } from "../ShoppingList/ShoppingList";

const checkedTrueFalse = (array: Product[], value: boolean) => {
  return array && array.filter((element) => element.checked === value);
};

const Container = () => {
  let storedItems = JSON.parse(localStorage.getItem("shopping-list-app"));
  const [items, setProduct] = useState(storedItems);
  const [list, showList] = useState<boolean>(false);
  const [productsInCart, showProductsInCart] = useState<boolean>(false);

  const removeFromStorage = () => {
    localStorage.clear();
    setProduct([]);
  };

  useEffect(() => {
    localStorage.setItem("shopping-list-app", JSON.stringify(items));
    if (checkedTrueFalse(items, true)?.length === 0) {
      showProductsInCart(false);
    } else if (checkedTrueFalse(items, true)?.length !== 0) {
      showProductsInCart(true);
    }
    if (checkedTrueFalse(items, false)?.length === 0 || null) {
      showList(false);
    } else if (checkedTrueFalse(items, false)?.length !== 0) {
      showList(true);
    }
  }, [items]);

  const addProducts = (product: {}) => {
    setProduct((items: Product[]) => [...items, product]);
  };

  const deleteProducts = (id: Date) => {
    setProduct((items: Product[]) =>
      items.filter((item: Product) => item.id !== id)
    );
  };

  const checkProduct = (val: Date) => {
    setProduct((items: Product[]) =>
      items.map((item: Product) =>
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
        <div className={styles.shoppingList}>
          {list && (
            <ShoppingList
              items={checkedTrueFalse(items, false)}
              onDeleteItems={deleteProducts}
              setCheckboxValue={checkProduct}
              checkboxChecked={false}
            />
          )}
          {productsInCart && (
            <ShoppingList
              items={checkedTrueFalse(items, true)}
              onDeleteItems={deleteProducts}
              setCheckboxValue={checkProduct}
              checkboxChecked={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Container;
