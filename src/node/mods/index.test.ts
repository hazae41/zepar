import { assert, test } from "@hazae41/phobos";
import { randomBytes } from "crypto";
import { Aes128Ctr128BEKey, ChaCha20Poly1305Cipher, initBundledOnce } from "./index.js";

function equals(a: Uint8Array, b: Uint8Array) {
  return Buffer.from(a).equals(Buffer.from(b))
}

test("AES-128 + CTR-128-BE", async () => {
  await initBundledOnce()

  const original = new TextEncoder().encode("Hello World")

  const key = randomBytes(16)
  const iv = randomBytes(16)

  const cipher = new Aes128Ctr128BEKey(key, iv)
  const decipher = new Aes128Ctr128BEKey(key, iv)

  /**
   * Encryption
   */

  const encrypted1 = cipher.apply_keystream(original).copyAndDispose()

  assert(!equals(encrypted1, original), `encrypted1 should not be equals to original`)

  const encrypted2 = cipher.apply_keystream(encrypted1).copyAndDispose()

  assert(!equals(encrypted2, original), `encrypted2 should not be equals to original`)
  assert(!equals(encrypted2, encrypted1), `encrypted2 should not be equals to encrypted1`)

  /**
   * Decryption
   */

  const decrypted1 = decipher.apply_keystream(encrypted2).copyAndDispose()

  assert(!equals(decrypted1, original), `decrypted1 should not be equals to original`)

  const decrypted2 = decipher.apply_keystream(decrypted1).copyAndDispose()

  assert(!equals(decrypted2, decrypted1), `decrypted2 should not be equals to decrypted1`)
  assert(equals(decrypted2, original), `decrypted2 should be equals to original`)
})

test("chacha", async () => {
  await initBundledOnce()

  const key = crypto.getRandomValues(new Uint8Array(32))
  const nonce = crypto.getRandomValues(new Uint8Array(12))
  const message = crypto.getRandomValues(new Uint8Array(256))

  const encrypted = new ChaCha20Poly1305Cipher(key).encrypt(message, nonce).copyAndDispose()
  const decrypted = new ChaCha20Poly1305Cipher(key).decrypt(encrypted, nonce).copyAndDispose()

  assert(equals(message, decrypted))
})