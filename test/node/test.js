import { Aes128Ctr128BEKey, Zepar } from "@hazae41/zepar";
import { randomBytes } from "crypto";

Zepar.initSyncBundledOnce()

const key = randomBytes(16)
const iv = new Uint8Array(16)

const cipher = new Aes128Ctr128BEKey(key, iv)

const hello = new TextEncoder().encode("Hello World")
const hello2 = new TextEncoder().encode("Hello World")

cipher.apply_keystream(hello)
cipher.apply_keystream(hello2)

console.log(hello)
console.log(hello2)