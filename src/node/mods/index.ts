export * from "../../../wasm/pkg/zepar.js";

import { init, InitOutput, initSync } from "../../../wasm/pkg/zepar.js";
import { wasm } from "../../../wasm/pkg/zepar.wasm.js";

let output: InitOutput | undefined = undefined

export function initSyncBundledOnce() {
  return output ??= initSync(Buffer.from(wasm, "base64"))
}

export async function initBundledOnce() {
  return output ??= await init(Buffer.from(wasm, "base64"))
}