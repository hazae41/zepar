# AES-CTR for WebAssembly

WebAssembly port of RustCrypto's [AES](https://github.com/RustCrypto/block-ciphers) + [CTR](https://github.com/RustCrypto/block-modes), 
Rust implementations of AES encryption with CTR mode.

```bash
npm i @hazae41/zepar
```

[**Next.js CodeSandbox 🪣**](https://codesandbox.io/p/sandbox/7dv3pc) • [**Deno CodeSandbox 🪣**](https://codesandbox.io/p/sandbox/480rz7) • [**Node CodeSandbox 🪣**](https://codesandbox.io/p/sandbox/zn6c5r)

### Usage

```ts
import * as Zepar from "@hazae41/zepar";
import { Aes128Ctr128BEKey } from "@hazae41/zepar";
import { randomBytes } from "crypto";

// Wait for WASM to load
Zepar.initSyncBundledOnce()

// Random key
const key = randomBytes(16)

// Empty IV
const iv = new Uint8Array(16)

// Build a cipher from key and IV
const cipher = new Aes128Ctr128BEKey(key, iv)

// Byte arrays to encrypt
const hello = new TextEncoder().encode("Hello World")
const hello2 = new TextEncoder().encode("Hello World")

// Encrypt with counter = 0
cipher.apply_keystream(hello)

// Encrypt with counter = 1
cipher.apply_keystream(hello2)

// hello !== hello2
console.log(hello, hello2)
```

### Building

- Install [Deno](https://github.com/denoland/deno)

https://deno.land

- Install [binaryen](https://github.com/WebAssembly/binaryen) (for wasm-opt) and
  add it your PATH

https://github.com/WebAssembly/binaryen/releases

- Install [wasm-pack](https://github.com/rustwasm/wasm-pack)

```bash
cargo install wasm-pack
```

- Install dependencies

```bash
npm install
```

- Build wasm and module

```bash
npm run build
```
