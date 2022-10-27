'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var zepar = require('../../wasm/pkg/zepar.cjs');
var zepar_wasm = require('../../wasm/pkg/zepar.wasm.cjs');

var output = undefined;
function initSyncBundledOnce() {
    return output !== null && output !== void 0 ? output : (output = zepar.initSync(Buffer.from(zepar_wasm.wasm, "base64")));
}
function initBundledOnce() {
    return tslib.__awaiter(this, void 0, void 0, function () {
        return tslib.__generator(this, function (_a) {
            return [2 /*return*/, output !== null && output !== void 0 ? output : (output = zepar["default"](Buffer.from(zepar_wasm.wasm, "base64")))];
        });
    });
}

exports.Aes128Ctr128BEKey = zepar.Aes128Ctr128BEKey;
exports.initSync = zepar.initSync;
exports.initBundledOnce = initBundledOnce;
exports.initSyncBundledOnce = initSyncBundledOnce;
//# sourceMappingURL=index.cjs.map
