import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";

export default defineConfig({
  input: ["src/index.ts"],
  output: [
    {
      format: "esm",
      file: "lib/index.mjs",
    },
    {
      format: "cjs",
      file: "lib/index.cjs",
    },
  ],
  plugins: [esbuild()],
});
