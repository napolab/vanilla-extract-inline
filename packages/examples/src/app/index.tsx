import Button from "../components/button";

import * as styles from "./styles.css";

import type { FC } from "react";

const App: FC = () => {
  return (
    <main className={styles.container}>
      <Button>button</Button>
    </main>
  );
};

export default App;
