/* tslint:disable */
/* eslint-disable */
/**
*/
export class Aes128Ctr128BEKey {
  free(): void;
/**
* @param {Uint8Array} key
* @param {Uint8Array} iv
*/
  constructor(key: Uint8Array, iv: Uint8Array);
/**
* @param {Uint8Array} buf
* @returns {Slice}
*/
  apply_keystream(buf: Uint8Array): Slice;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_aes128ctr128bekey_free: (a: number) => void;
  readonly aes128ctr128bekey_new: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly aes128ctr128bekey_apply_keystream: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

export class Slice {

  readonly ptr: number

  readonly len: number

  constructor(ptr: number, len: number);

  /**
   * Get the bytes in memory
   **/
  get bytes(): Uint8Array

  /**
   * Free the bytes
   **/
  free(): void

  /**
   * Copy the bytes and free them
   **/
  copy(): Uint8Array

  /**
   * Free the bytes
   **/
  [Symbol.dispose](): void

  /**
   * Free the bytes
   **/
  dispose(): void

}