import { Box, Copied } from "@hazae41/box";
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

  const cipher = new Aes128Ctr128BEKey(new Box(new Copied(key)), new Box(new Copied(iv)))
  const decipher = new Aes128Ctr128BEKey(new Box(new Copied(key)), new Box(new Copied(iv)))

  /**
   * Encryption
   */

  const encrypted1 = cipher.apply_keystream(new Box(new Copied(original))).copyAndDispose()

  assert(!equals(encrypted1.bytes, original), `encrypted1 should not be equals to original`)

  const encrypted2 = cipher.apply_keystream(new Box(encrypted1)).copyAndDispose()

  assert(!equals(encrypted2.bytes, original), `encrypted2 should not be equals to original`)
  assert(!equals(encrypted2.bytes, encrypted1.bytes), `encrypted2 should not be equals to encrypted1`)

  /**
   * Decryption
   */

  const decrypted1 = decipher.apply_keystream(new Box(encrypted2)).copyAndDispose()

  assert(!equals(decrypted1.bytes, original), `decrypted1 should not be equals to original`)

  const decrypted2 = decipher.apply_keystream(new Box(decrypted1)).copyAndDispose()

  assert(!equals(decrypted2.bytes, decrypted1.bytes), `decrypted2 should not be equals to decrypted1`)
  assert(equals(decrypted2.bytes, original), `decrypted2 should be equals to original`)
})

test("chacha", async () => {
  await initBundledOnce()

  const key = crypto.getRandomValues(new Uint8Array(32))
  const nonce = crypto.getRandomValues(new Uint8Array(12))
  const message = crypto.getRandomValues(new Uint8Array(256))

  const encrypted = new ChaCha20Poly1305Cipher(new Box(new Copied(key))).encrypt(new Box(new Copied(message)), new Box(new Copied(nonce))).copyAndDispose()
  const decrypted = new ChaCha20Poly1305Cipher(new Box(new Copied(key))).decrypt(new Box(encrypted), new Box(new Copied(nonce))).copyAndDispose()

  assert(equals(message, decrypted.bytes))
})