import { Buffer } from "https://deno.land/std@0.170.0/node/buffer.ts";
import { assert, test } from "npm:@hazae41/phobos";
import { Aes128Ctr128BEKey, initBundledOnce } from "./mod.ts";

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

  const original = new TextEncoder().encode("Hello World")

  const key = new Uint8Array(16)
  const iv = new Uint8Array(16)

  crypto.getRandomValues(key)
  crypto.getRandomValues(iv)

  const cipher = new Aes128Ctr128BEKey(key, iv)
  const decipher = new Aes128Ctr128BEKey(key, iv)

  /**
   * Encryption
   */

  const encrypted1 = cipher.apply_keystream(original).copy()

  assert(!equals(encrypted1, original), `encrypted1 should not be equals to original`)

  const encrypted2 = cipher.apply_keystream(encrypted1).copy()

  assert(!equals(encrypted2, original), `encrypted2 should not be equals to original`)
  assert(!equals(encrypted2, encrypted1), `encrypted2 should not be equals to encrypted1`)

  /**
   * Decryption
   */

  const decrypted1 = decipher.apply_keystream(encrypted2).copy()

  assert(!equals(decrypted1, original), `decrypted1 should not be equals to original`)

  const decrypted2 = decipher.apply_keystream(decrypted1).copy()

  assert(!equals(decrypted2, decrypted1), `decrypted2 should not be equals to decrypted1`)
  assert(equals(decrypted2, original), `decrypted2 should be equals to original`)
})