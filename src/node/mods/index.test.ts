import { assert, test } from "@hazae41/phobos";
import { randomBytes } from "crypto";
import { Aes128Ctr128BEKey, ChaCha20Poly1305Cipher, Memory, initBundledOnce } from "./index.js";

function equals(a: Uint8Array, b: Uint8Array) {
  return Buffer.from(a).equals(Buffer.from(b))
}

if (true) {
  await test("memory", async () => {
    await initBundledOnce()

    const slice = new Memory(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]))
    const slice2 = new Memory(slice.bytes)

    console.log(slice, slice.bytes)
    slice.free()

    console.log(slice2, slice2.bytes)
    slice2.free()
  })
}

if (true) {
  test("AES-128 + CTR-128-BE", async () => {
    await initBundledOnce()

    const original = new TextEncoder().encode("Hello World")

    const key = randomBytes(16)
    const iv = randomBytes(16)

    const cipher = new Aes128Ctr128BEKey(new Memory(key).freeNextTick(), new Memory(iv).freeNextTick())
    const decipher = new Aes128Ctr128BEKey(new Memory(key).freeNextTick(), new Memory(iv).freeNextTick())

    /**
     * Encryption
     */
    const memory = new Memory(original).freeNextTick()

    cipher.apply_keystream(memory)
    const encrypted1 = memory.bytes.slice()

    assert(!equals(encrypted1, original), `encrypted1 should not be equals to original`)

    cipher.apply_keystream(memory)
    const encrypted2 = memory.bytes.slice()

    assert(!equals(encrypted2, original), `encrypted2 should not be equals to original`)
    assert(!equals(encrypted2, encrypted1), `encrypted2 should not be equals to encrypted1`)

    /**
     * Decryption
     */

    decipher.apply_keystream(memory)
    const decrypted1 = memory.bytes.slice()

    assert(!equals(decrypted1, original), `decrypted1 should not be equals to original`)

    decipher.apply_keystream(memory)
    const decrypted2 = memory.bytes.slice()

    assert(!equals(decrypted2, decrypted1), `decrypted2 should not be equals to decrypted1`)
    assert(equals(decrypted2, original), `decrypted2 should be equals to original`)
  })

  test("chacha", async () => {
    await initBundledOnce()

    const key = new Memory(crypto.getRandomValues(new Uint8Array(32))).freeNextTick()
    const nonce = new Memory(crypto.getRandomValues(new Uint8Array(12))).freeNextTick()
    const message = new Memory(crypto.getRandomValues(new Uint8Array(256))).freeNextTick()

    const encrypted = new ChaCha20Poly1305Cipher(key).encrypt(message, nonce).freeNextTick()
    const decrypted = new ChaCha20Poly1305Cipher(key).decrypt(encrypted, nonce).freeNextTick()

    assert(equals(message.bytes, decrypted.bytes))
  })

}

