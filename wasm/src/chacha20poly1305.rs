extern crate alloc;

use alloc::vec::Vec;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ChaCha20Poly1305Cipher {
    pub(crate) inner: chacha20poly1305::ChaCha20Poly1305,
}

#[wasm_bindgen]
impl ChaCha20Poly1305Cipher {
    #[wasm_bindgen(constructor)]
    pub fn new(key: &[u8]) -> Result<ChaCha20Poly1305Cipher, JsError> {
        use chacha20poly1305::ChaCha20Poly1305;
        use chacha20poly1305::KeyInit;

        let result = ChaCha20Poly1305::new_from_slice(key);
        let inner = result.map_err(|_| JsError::new("ChaCha20Poly1305Cipher::new"))?;

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn encrypt(&self, message: &[u8], nonce: &[u8]) -> Result<Vec<u8>, JsError> {
        use chacha20poly1305::aead::Aead;

        self.inner
            .encrypt(nonce.into(), message)
            .map_err(|_| JsError::new("ChaCha20Poly1305Cipher::encrypt"))
    }

    #[wasm_bindgen]
    pub fn decrypt(&self, message: &[u8], nonce: &[u8]) -> Result<Vec<u8>, JsError> {
        use chacha20poly1305::aead::Aead;

        self.inner
            .decrypt(nonce.into(), message)
            .map_err(|_| JsError::new("ChaCha20Poly1305Cipher::decrypt"))
    }
}
