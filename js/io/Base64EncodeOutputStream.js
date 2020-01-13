"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var OutputStream_1 = require("./OutputStream");
'use strict';
var Base64EncodeOutputStream = (function (_super) {
    __extends(Base64EncodeOutputStream, _super);
    function Base64EncodeOutputStream(ostream) {
        var _this = _super.call(this) || this;
        _this.ostream = ostream;
        _this.buffer = 0;
        _this.buflen = 0;
        _this.length = 0;
        return _this;
    }
    Base64EncodeOutputStream.prototype.writeByte = function (n) {
        this.buffer = (this.buffer << 8) | (n & 0xff);
        this.buflen += 8;
        this.length += 1;
        while (this.buflen >= 6) {
            this.writeEncoded(this.buffer >>> (this.buflen - 6));
            this.buflen -= 6;
        }
    };
    Base64EncodeOutputStream.prototype.flush = function () {
        if (this.buflen > 0) {
            this.writeEncoded(this.buffer << (6 - this.buflen));
            this.buffer = 0;
            this.buflen = 0;
        }
        if (this.length % 3 != 0) {
            var padlen = 3 - this.length % 3;
            for (var i = 0; i < padlen; i += 1) {
                this.ostream.writeByte('='.charCodeAt(0));
            }
        }
    };
    Base64EncodeOutputStream.prototype.writeEncoded = function (b) {
        this.ostream.writeByte(Base64EncodeOutputStream.encode(b & 0x3f));
    };
    Base64EncodeOutputStream.encode = function (n) {
        if (n < 0) {
        }
        else if (n < 26) {
            return 'A'.charCodeAt(0) + n;
        }
        else if (n < 52) {
            return 'a'.charCodeAt(0) + (n - 26);
        }
        else if (n < 62) {
            return '0'.charCodeAt(0) + (n - 52);
        }
        else if (n == 62) {
            return '+'.charCodeAt(0);
        }
        else if (n == 63) {
            return '/'.charCodeAt(0);
        }
        throw 'n:' + n;
    };
    return Base64EncodeOutputStream;
}(OutputStream_1.OutputStream));
exports.Base64EncodeOutputStream = Base64EncodeOutputStream;
//# sourceMappingURL=Base64EncodeOutputStream.js.map