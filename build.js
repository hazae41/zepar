import { readFileSync, rmSync, writeFileSync } from "fs";

const wasm = readFileSync("./wasm/pkg/zepar_bg.wasm");
writeFileSync(`./wasm/pkg/zepar.wasm.js`, `export const wasm = "${wasm.toString("base64")}";`);
writeFileSync(`./wasm/pkg/zepar.wasm.d.ts`, `export const wasm: string;`);

const script = readFileSync(`./wasm/pkg/zepar.js`, "utf8")
  .replace("export { initSync }", "export { init, initSync }")
  .replace("input = new URL('zepar_bg.wasm', import.meta.url);", "throw new Error();")

const typing = readFileSync(`./wasm/pkg/zepar.d.ts`, "utf8")
  .replace("export default function init", "export function init")

writeFileSync(`./wasm/pkg/zepar.js`, script)
writeFileSync(`./wasm/pkg/zepar.d.ts`, typing)

rmSync(`./wasm/pkg/.gitignore`, { force: true });