import { InitOutput } from '../../wasm/pkg/zepar.d.js';
export { Aes128Ctr128BEKey, InitInput, InitOutput, SyncInitInput, initSync } from '../../wasm/pkg/zepar.d.js';

declare function initSyncBundledOnce(): InitOutput;

export { initSyncBundledOnce };
