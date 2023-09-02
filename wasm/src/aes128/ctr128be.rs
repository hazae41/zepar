extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

type Aes128Ctr128BE = ctr::Ctr128BE<aes::Aes128>;

#[wasm_bindgen]
pub struct Aes128Ctr128BEKey {
    pub(crate) inner: Box<Aes128Ctr128BE>,
}

#[wasm_bindgen]
impl Aes128Ctr128BEKey {
    #[wasm_bindgen(constructor)]
    pub fn new(key: &[u8], iv: &[u8]) -> Result<Aes128Ctr128BEKey, JsError> {
        use ctr::cipher::KeyIvInit;

        let key16: [u8; 16] = key.try_into().map_err(JsError::from)?;
        let iv16: [u8; 16] = iv.try_into().map_err(JsError::from)?;
        let cipher = Aes128Ctr128BE::new(&key16.into(), &iv16.into());
        let inner = Box::new(cipher);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn apply_keystream(&mut self, mut buf: Vec<u8>) -> Vec<u8> {
        use ctr::cipher::StreamCipher;

        self.inner.apply_keystream(&mut buf);

        return buf;
    }
}
