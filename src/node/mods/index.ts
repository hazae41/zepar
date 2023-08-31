export * from "../../../wasm/pkg/zepar.js";

import { __wbg_init, InitOutput } from "../../../wasm/pkg/zepar.js";
import { data } from "../../../wasm/pkg/zepar.wasm.js";

let output: InitOutput | undefined = undefined

export async function initBundledOnce() {
  return output ??= await __wbg_init(data)
}