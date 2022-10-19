export * from "../wasm/pkg/zepar.js";

import * as Base64 from "https://deno.land/std@0.158.0/encoding/base64.ts";
import { InitOutput, initSync } from "../wasm/pkg/zepar.js";
import { wasm } from "../wasm/pkg/zepar.wasm.js";

let output: InitOutput | undefined = undefined

export async function initSyncBundledOnce() {
  return output ??= initSync(Base64.decode(wasm))
}