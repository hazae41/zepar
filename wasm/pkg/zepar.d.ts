/* tslint:disable */
/* eslint-disable */
/**
*/
export class Aes128Ctr128BEKey {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Memory} key
* @param {Memory} iv
*/
  constructor(key: Memory, iv: Memory);
/**
* @param {Memory} memory
*/
  apply_keystream(memory: Memory): void;
}
/**
*/
export class ChaCha20Poly1305Cipher {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Memory} key
*/
  constructor(key: Memory);
/**
* @param {Memory} message
* @param {Memory} nonce
* @returns {Memory}
*/
  encrypt(message: Memory, nonce: Memory): Memory;
/**
* @param {Memory} message
* @param {Memory} nonce
* @returns {Memory}
*/
  decrypt(message: Memory, nonce: Memory): Memory;
}
/**
*/
export class Memory {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Uint8Array} inner
*/
  constructor(inner: Uint8Array);
/**
* @returns {number}
*/
  ptr(): number;
/**
* @returns {number}
*/
  len(): number;

  /**
   * Free on next tick
   **/
  freeNextTick(): Memory

  /**
   * Get the bytes in memory
   **/
  get bytes(): Uint8Array

  /**
   * Copy the bytes and free them
   **/
  copyAndDispose(): Uint8Array
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_chacha20poly1305cipher_free: (a: number) => void;
  readonly chacha20poly1305cipher_new: (a: number, b: number) => void;
  readonly chacha20poly1305cipher_encrypt: (a: number, b: number, c: number, d: number) => void;
  readonly chacha20poly1305cipher_decrypt: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_aes128ctr128bekey_free: (a: number) => void;
  readonly aes128ctr128bekey_new: (a: number, b: number, c: number) => void;
  readonly aes128ctr128bekey_apply_keystream: (a: number, b: number) => void;
  readonly __wbg_memory_free: (a: number) => void;
  readonly memory_new: (a: number, b: number) => number;
  readonly memory_ptr: (a: number) => number;
  readonly memory_len: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
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
