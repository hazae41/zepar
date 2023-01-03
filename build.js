import { readFile, rm, writeFile } from "fs/promises";

const wasm = await readFile("./wasm/pkg/zepar_bg.wasm");

await writeFile(
  `./wasm/pkg/zepar.wasm.js`,
  `export const wasm = "${wasm.toString("base64")}";`
);

await writeFile(
  `./wasm/pkg/zepar.wasm.d.ts`,
  `export const wasm: string;`
);

await rm(`./wasm/pkg/.gitignore`, { force: true })