'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./mods/index.cjs');
var zepar = require('../wasm/pkg/zepar.cjs');



exports.Zepar = index;
exports.initBundledOnce = index.initBundledOnce;
exports.initSyncBundledOnce = index.initSyncBundledOnce;
exports.Aes128Ctr128BEKey = zepar.Aes128Ctr128BEKey;
exports.initSync = zepar.initSync;
//# sourceMappingURL=index.cjs.map
