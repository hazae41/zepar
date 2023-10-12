extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::Memory;

#[wasm_bindgen]
pub struct Aes128Ctr128BEKey {
    pub(crate) inner: ctr::Ctr128BE<aes::Aes128>,
}

#[wasm_bindgen]
impl Aes128Ctr128BEKey {
    #[wasm_bindgen(constructor)]
    pub fn new(key: &Memory, iv: &Memory) -> Result<Aes128Ctr128BEKey, JsError> {
        use ctr::cipher::KeyIvInit;

        let key16: &[u8; 16] = key.inner.as_slice().try_into().map_err(JsError::from)?;
        let iv16: &[u8; 16] = iv.inner.as_slice().try_into().map_err(JsError::from)?;
        let inner = ctr::Ctr128BE::<aes::Aes128>::new(key16.into(), iv16.into());

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn apply_keystream(&mut self, memory: &mut Memory) -> () {
        use ctr::cipher::StreamCipher;

        self.inner.apply_keystream(&mut memory.inner);
    }
}
