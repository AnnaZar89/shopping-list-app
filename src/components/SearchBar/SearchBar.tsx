import { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";

export interface INewItem {
  value: string;
  checked: boolean;
  id: {};
  quantity: number;
}
const SearchBar = ({ onAddItems }) => {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    localStorage.setItem("product", value);
  }, [value]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
    <>
      <form className={styles.element} onSubmit={handleSubmit}>
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
          placeholder="search product..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button>Add to the list</button>
        <button>Delete all</button>
      </form>
    </>
  );
};

export default SearchBar;
