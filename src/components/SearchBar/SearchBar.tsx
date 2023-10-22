import React, { useState, FC } from "react";
import styles from "./SearchBar.module.scss";

export interface INewItem {
  value: string;
  checked: boolean;
  id: {};
  quantity: number;
}

interface ISearchBar {
  onAddItems: (product: INewItem) => void;
  removeFromStorage: () => void;
}
const SearchBar: FC<ISearchBar> = ({ onAddItems, removeFromStorage }) => {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const newItem: INewItem = {
      value,
      checked: false,
      id: new Date(),
      quantity,
    };
    onAddItems(newItem);
    setQuantity(1);
    setValue("");
  };

  return (
    <form className={styles.element} onSubmit={handleSubmit}>
      <div className={styles.searchBar}>
        <select
          onChange={(e) => setQuantity(Number(e.target.value))}
          value={quantity}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((element, i) => (
            <option value={element} key={i}>
              {element}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="add product..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          autoComplete="off"
        />
      </div>
      <div className={styles.buttons}>
        <button>Add to the list</button>
        <button onClick={removeFromStorage}>Delete all</button>
      </div>
    </form>
  );
};

export default SearchBar;
