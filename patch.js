import { readFileSync, rmSync, writeFileSync } from "fs";

const wasm = readFileSync("./wasm/pkg/zepar_bg.wasm")

writeFileSync(`./wasm/pkg/zepar.wasm.js`, `export const data = "data:application/wasm;base64,${wasm.toString("base64")}";`);
writeFileSync(`./wasm/pkg/zepar.wasm.d.ts`, `export const data: string;`);

const disposableJs = `
    #freed = false

    get freed() {
        return this.#freed
    }

    [Symbol.dispose]() {
        this.free()
    }

    free() {
        if (this.#freed)
            return
        this.#freed = true
`

const disposableTs = `
  get freed(): boolean

  [Symbol.dispose](): void
`

const zeroCopyPassJs = `
function passArray8ToWasm0(arg, malloc) {
    if (getUint8Memory0().buffer === arg.buffer) {
      WASM_VECTOR_LEN = arg.byteLength;
      return arg.byteOffset
    }
`

const glueJs = readFileSync(`./wasm/pkg/zepar.js`, "utf8")
  .replace("async function __wbg_init", "export async function __wbg_init")
  .replace("input = new URL('zepar_bg.wasm', import.meta.url);", "throw new Error();")
  .replaceAll("getArrayU8FromWasm0(r0, r1).slice()", "new Slice(r0, r1)")
  .replaceAll("wasm.__wbindgen_free(r0, r1 * 1)", "")
  .replaceAll("@returns {Uint8Array}", "@returns {Slice}")
  .replaceAll("  free() {", disposableJs)
  .replaceAll("function passArray8ToWasm0(arg, malloc) {", zeroCopyPassJs)

const glueTs = readFileSync(`./wasm/pkg/zepar.d.ts`, "utf8")
  .replace("export default function __wbg_init", "export function __wbg_init")
  .replaceAll("@returns {Uint8Array}", "@returns {Slice}")
  .replaceAll(": Uint8Array;", ": Slice;")
  .replaceAll("  free(): void;", disposableTs + "\n" + "  free(): void;")

const preJs = `
import { Ok } from "@hazae41/result"
`

const postJs = `
export class Slice {

  #freed = false

  /**
   * @param {number} ptr 
   * @param {number} len 
   **/
  constructor(ptr, len) {
    this.ptr = ptr
    this.len = len
    this.start = (ptr >>> 0) / 1
    this.end = this.start + len
  }

  /**
   * @returns {void}
   **/
  [Symbol.dispose]() {
    this.free()
  }

  /**
   * @returns {Uint8Array}
   **/
  get bytes() {
    if (this.#freed)
      throw new Error("Freed")
    return getUint8Memory0().subarray(this.start, this.end)
  }

  get freed() {
    return this.#freed
  }

  /**
   * @returns {void}
   **/
  free() {
    if (this.#freed)
      return
    this.#freed = true
    wasm.__wbindgen_free(this.ptr, this.len * 1);
  }

  /**
   * @returns {Uint8Array}
   **/
  copyAndDispose() {
    const bytes = this.bytes.slice()
    this.free()
    return bytes
  }

  /**
   * @returns {Result<number,never>}
   */
  trySize() {
    return new Ok(this.len)
  }

  /**
   * @param {Cursor} cursor 
   * @returns {Result<void, CursorWriteError>}
   */
  tryWrite(cursor) {
    return cursor.tryWrite(this.bytes)
  }

}`

const preTs = `
import type { Result } from "@hazae41/result"
import type { Cursor, CursorWriteError } from "@hazae41/cursor"
`

const postTs = `
export class Slice {

  readonly ptr: number

  readonly len: number

  constructor(ptr: number, len: number);

  /**
   * Free the bytes
   **/
  [Symbol.dispose](): void

  /**
   * Get the bytes in memory
   * @throws if freed
   **/
  get bytes(): Uint8Array

  /**
   * Is the memory freed?
   **/
  get freed(): boolean

  /**
   * Free the bytes (do nothing if already freed)
   **/
  free(): void

  /**
   * Copy the bytes and free them
   **/
  copyAndDispose(): Uint8Array

  trySize(): Result<number, never>

  tryWrite(cursor: Cursor): Result<void, CursorWriteError>

}`

writeFileSync(`./wasm/pkg/zepar.js`, preJs + "\n" + glueJs + "\n" + postJs)
writeFileSync(`./wasm/pkg/zepar.d.ts`, preTs + "\n" + glueTs + "\n" + postTs)

rmSync(`./wasm/pkg/.gitignore`, { force: true });