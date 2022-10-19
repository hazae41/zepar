/* tslint:disable */
/* eslint-disable */
/**
*/
declare class Aes128Ctr128BEKey {
  free(): void;
/**
* @param {Uint8Array} key
* @param {Uint8Array} iv
*/
  constructor(key: Uint8Array, iv: Uint8Array);
/**
* @param {Uint8Array} buf
*/
  apply_keystream(buf: Uint8Array): void;
}

type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_aes128ctr128bekey_free: (a: number) => void;
  readonly aes128ctr128bekey_new: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly aes128ctr128bekey_apply_keystream: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
declare function initSync(module: SyncInitInput): InitOutput;

export { Aes128Ctr128BEKey, InitInput, InitOutput, SyncInitInput, initSync };
