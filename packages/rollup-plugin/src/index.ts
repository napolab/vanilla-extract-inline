import {
  cssFileFilter,
  processVanillaFile,
  compile,
  getSourceFromVirtualCssFile,
  virtualCssFileFilter,
} from "@vanilla-extract/integration";

import type { IdentifierOption, CompileOptions } from "@vanilla-extract/integration";
import type { Plugin } from "rollup";

const SINGLE_FILE_ID = "vanilla-extract-inline";
const entrypoint = `${SINGLE_FILE_ID}-entrypoint`;

interface Options {
  identifiers?: IdentifierOption;
  cwd?: string;
  esbuildOptions?: CompileOptions["esbuildOptions"];
}
export function inlinePlugin({ identifiers, cwd = process.cwd(), esbuildOptions }: Options = {}): Plugin {
  const isProduction = process.env.NODE_ENV === "production";
  const assets = new Map();

  return {
    name: "vanilla-extract-inline",
    async transform(_code, id) {
      if (!cssFileFilter.test(id)) {
        return null;
      }

      const index = id.indexOf("?");
      const filePath = index === -1 ? id : id.substring(0, index);

      const identOption = identifiers ?? (isProduction ? "short" : "debug");

      const { source } = await compile({
        filePath,
        cwd,
        esbuildOptions,
        identOption,
      });


      const output = await processVanillaFile({
        source,
        filePath,
        identOption,
      });

      return {
        code: output,
        map: { mappings: "" },
      };
    },
    async resolveId(id) {
      if (id === SINGLE_FILE_ID) return id;

      if (!virtualCssFileFilter.test(id)) {
        return null;
      }

      const { fileName, source } = await getSourceFromVirtualCssFile(id);
      assets.set(fileName, source);

      return {
        id: fileName,
      };
    },
    async load(id) {
      if (assets.has(id)) return "";
      if (id === SINGLE_FILE_ID) return `export default \`${entrypoint}\``;

      return null;
    },
    renderChunk(code) {
      return {
        code: code.replace(entrypoint, `${Array.from(assets.values()).join("\n")}`),
      };
    },
  };
}
