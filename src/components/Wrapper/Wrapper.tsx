import { FC } from "react";
import styles from "./Wrapper.module.scss";

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
  return <div className={styles.element}>{children}</div>;
};

export default Wrapper;
