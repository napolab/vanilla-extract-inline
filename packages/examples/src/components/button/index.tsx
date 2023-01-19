import { memo } from "react";

import * as styles from "./styles.css";

import type { ComponentPropsWithoutRef, FC } from "react";

const Button: FC<ComponentPropsWithoutRef<"button">> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.container}>
      {children}
    </button>
  );
};

export default memo(Button);
