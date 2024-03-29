<div>
  <img align="right" width="128" src="https://user-images.githubusercontent.com/4405263/216624555-216ea1a1-34bb-4406-a979-48a20b97d1a0.png"/>
  <p></p>
</div>

# Zepar

WebAssembly port of Aes128Ctr128Be and ChaCha20Poly1305 encryption algorithms

```bash
npm i @hazae41/zepar
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/zepar) • [**Deno Module 🦖**](https://deno.land/x/zepar) • [**Next.js CodeSandbox 🪣**](https://codesandbox.io/p/github/hazae41/zepar-example-next)

## Algorithms
- Aes128Ctr128Be from RustCrypto (aes, ctr) (audited)
- ChaCha20Poly1305 from RustCrypto (chacha20poly1305)

## Features
- Reproducible building
- Pre-bundled and streamed
- Zero-copy memory slices

## Usage

```ts
import { Zepar, Aes128Ctr128BEKey } from "@hazae41/zepar";
import { randomBytes } from "crypto";

// Wait for WASM to load
await Zepar.initBundledOnce()

// Random key
const key = randomBytes(16)

// Random IV
const iv = randomBytes(16)

// Build a cipher from key and IV
const cipher = new Aes128Ctr128BEKey(key, iv)

// Byte arrays to encrypt
const hello = new TextEncoder().encode("Hello World")

// Encrypt with counter = 0
const encrypted0 = cipher.apply_keystream(hello).copyAndDispose()

// Encrypt with counter = 1
const encrypted1 = cipher.apply_keystream(hello).copyAndDispose()

// encrypted0 !== encrypted1
console.log(encrypted0, encrypted1)

cipher.free()
```

## Building

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

Each time I release a new version tag on GitHub, the GitHub's CI does the following:
- Clone the repository
- Do not reproduce the build, as it's already checked by the task above
- Throw an error if there is a `npm diff` between the cloned repository and the same version tag on NPM

If a version is present on NPM but not on GitHub, do not use!
