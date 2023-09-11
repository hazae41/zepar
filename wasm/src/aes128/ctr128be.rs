extern crate alloc;

use alloc::vec::Vec;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Aes128Ctr128BEKey {
    pub(crate) inner: ctr::Ctr128BE<aes::Aes128>,
}

#[wasm_bindgen]
impl Aes128Ctr128BEKey {
    #[wasm_bindgen(constructor)]
    pub fn new(key: &[u8], iv: &[u8]) -> Result<Aes128Ctr128BEKey, JsError> {
        use ctr::cipher::KeyIvInit;

        let key16: [u8; 16] = key.try_into().map_err(JsError::from)?;
        let iv16: [u8; 16] = iv.try_into().map_err(JsError::from)?;
        let inner = ctr::Ctr128BE::<aes::Aes128>::new(&key16.into(), &iv16.into());

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn apply_keystream(&mut self, mut buf: Vec<u8>) -> Vec<u8> {
        use ctr::cipher::StreamCipher;

        self.inner.apply_keystream(&mut buf);

        return buf;
    }
}
