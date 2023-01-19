# vanilla-extract-inline

This library expands css described in @vanilla-extract/css to inline.

After building with rollup using the plugin, string css is extracted to stylesheet of `import stylesheet from "@naporin0624/vanilla-extract-inline-runtime"`.


## example

```shell
git@github.com:napolab/vanilla-extract-inline.git
yarn install
yarn build

cd packages/examples
yarn dev

cat out/email.html
```
