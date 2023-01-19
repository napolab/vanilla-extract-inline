import { writeFile } from "fs/promises";

import stylesheet from "@vanilla-extract-inline/runtime";
import { renderToString } from "react-dom/server";

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
