extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::Memory;

#[wasm_bindgen]
pub struct ChaCha20Poly1305Cipher {
    pub(crate) inner: chacha20poly1305::ChaCha20Poly1305,
}

#[wasm_bindgen]
impl ChaCha20Poly1305Cipher {
    #[wasm_bindgen(constructor)]
    pub fn new(key: &Memory) -> Result<ChaCha20Poly1305Cipher, JsError> {
        use chacha20poly1305::ChaCha20Poly1305;
        use chacha20poly1305::KeyInit;

        let result = ChaCha20Poly1305::new_from_slice(&key.inner);
        let inner = result.map_err(|_| JsError::new("ChaCha20Poly1305Cipher::new"))?;

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn encrypt(&self, message: &Memory, nonce: &Memory) -> Result<Memory, JsError> {
        use chacha20poly1305::aead::Aead;

        self.inner
            .encrypt(nonce.inner.as_slice().into(), message.inner.as_slice())
            .map(Memory::new)
            .map_err(|_| JsError::new("ChaCha20Poly1305Cipher::encrypt"))
    }

    #[wasm_bindgen]
    pub fn decrypt(&self, message: &Memory, nonce: &Memory) -> Result<Memory, JsError> {
        use chacha20poly1305::aead::Aead;

        self.inner
            .decrypt(nonce.inner.as_slice().into(), message.inner.as_slice())
            .map(Memory::new)
            .map_err(|_| JsError::new("ChaCha20Poly1305Cipher::decrypt"))
    }
}
