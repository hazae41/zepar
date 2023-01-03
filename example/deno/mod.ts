import { Aes128Ctr128BEKey, Zepar } from "../../src/deno/mod.ts";

await Zepar.initBundledOnce()

const key = new Uint8Array(16)
const iv = new Uint8Array(16)

crypto.getRandomValues(key)
crypto.getRandomValues(iv)

const cipher = new Aes128Ctr128BEKey(key, iv)

const hello = new TextEncoder().encode("Hello World")
const hello2 = new TextEncoder().encode("Hello World")

cipher.apply_keystream(hello)
cipher.apply_keystream(hello2)

console.log(hello)
console.log(hello2)