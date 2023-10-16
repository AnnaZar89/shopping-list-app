import { FC, ReactNode } from "react";
import styles from "./Wrapper.module.scss";

interface IWrapper {
  children: ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
  return <div className={styles.element}>{children}</div>;
};

export default Wrapper;
