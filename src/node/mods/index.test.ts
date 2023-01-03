import { assert, test } from "@hazae41/phobos";
import { randomBytes } from "crypto";
import { Aes128Ctr128BEKey, initBundledOnce } from "./index.js";

function equals(a: Uint8Array, b: Uint8Array) {
  const ba = Buffer.from(a.buffer)
  const bb = Buffer.from(b.buffer)

  return ba.equals(bb)
}

function clone(x: Uint8Array) {
  return new Uint8Array(x)
}

test("AES-128 + CTR-128-BE", async () => {
  await initBundledOnce()

  const buffer = new TextEncoder().encode("Hello World")

  const original = clone(buffer)

  const key = randomBytes(16)
  const iv = randomBytes(16)

  const cipher = new Aes128Ctr128BEKey(key, iv)
  const decipher = new Aes128Ctr128BEKey(key, iv)

  /**
   * Encryption
   */

  cipher.apply_keystream(buffer)

  const encrypted1 = clone(buffer)

  assert(!equals(encrypted1, original), `encrypted1 should not be equals to original`)

  cipher.apply_keystream(buffer)

  const encrypted2 = clone(buffer)

  assert(!equals(encrypted2, original), `encrypted2 should not be equals to original`)
  assert(!equals(encrypted2, encrypted1), `encrypted2 should not be equals to encrypted1`)

  /**
   * Decryption
   */

  decipher.apply_keystream(buffer)

  const decrypted1 = clone(buffer)

  assert(!equals(decrypted1, original), `decrypted1 should not be equals to original`)

  decipher.apply_keystream(buffer)

  const decrypted2 = clone(buffer)

  assert(!equals(decrypted2, decrypted1), `decrypted2 should not be equals to decrypted1`)
  assert(equals(decrypted2, original), `decrypted2 should be equals to original`)
})