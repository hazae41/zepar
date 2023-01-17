export * from "../../../wasm/pkg/zepar.js";

import * as Base64 from "https://deno.land/std@0.158.0/encoding/base64.ts";

// @deno-types="../../../wasm/pkg/zepar.d.ts"
import { init, initSync } from "../../../wasm/pkg/zepar.js";

import { InitOutput } from "../../../wasm/pkg/zepar.d.ts";
import { wasm } from "../../../wasm/pkg/zepar.wasm.js";

let output: InitOutput | undefined = undefined

export function initSyncBundledOnce() {
  return output ??= initSync(Base64.decode(wasm))
}

export async function initBundledOnce() {
  return output ??= await init(Base64.decode(wasm))
}