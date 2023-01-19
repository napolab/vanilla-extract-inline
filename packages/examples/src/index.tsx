import { writeFile } from "fs/promises";

import { renderToString } from "react-dom/server";
import stylesheet from "vanilla-extract-inline";

import App from "./app";

const result = renderToString(
  <html lang="ja">
    <head>
      <style>{stylesheet}</style>
    </head>

    <App />
  </html>,
);

void writeFile("./out/email.html", (result), { encoding: "utf8" });
