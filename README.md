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

### Unreproducible building

You need to install [Rust](https://www.rust-lang.org/tools/install)

Then, install [wasm-pack](https://github.com/rustwasm/wasm-pack)

```bash
cargo install wasm-pack
```

Finally, do a clean install and build

```bash
npm ci && npm run build
```

### Reproducible building

You can build the exact same bytecode using Docker, just be sure you're on a `linux/amd64` host

```bash
docker compose up --build
```

Then check that all the files are the same using `git status`

```bash
git status --porcelain
```

If the output is empty then the bytecode is the same as the one I commited

### Automated checks

Each time I commit to the repository, the GitHub's CI does the following:
- Clone the repository
- Reproduce the build using `docker compose up --build`
- Throw an error if the `git status --porcelain` output is not empty