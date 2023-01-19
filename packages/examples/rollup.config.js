import run from "@rollup/plugin-run";
import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { inlinePlugin } from "vanilla-extract-inline-rollup-plugin";

export default defineConfig({
  input: ["src/index.tsx"],
  output: {
    format: "esm",
    dir: "dist",
  },
  plugins: [esbuild(), inlinePlugin({ identifiers: "debug" }), run()],
  watch: {
    clearScreen: true,
  },
});
