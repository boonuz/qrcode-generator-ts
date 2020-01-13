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
var InputStream_1 = require("./InputStream");
'use strict';
var Base64DecodeInputStream = (function (_super) {
    __extends(Base64DecodeInputStream, _super);
    function Base64DecodeInputStream(istream) {
        var _this = _super.call(this) || this;
        _this.istream = istream;
        _this.buffer = 0;
        _this.buflen = 0;
        return _this;
    }
    Base64DecodeInputStream.prototype.readByte = function () {
        while (this.buflen < 8) {
            var c = this.istream.readByte();
            if (c == -1) {
                if (this.buflen == 0) {
                    return -1;
                }
                throw 'unexpected end of file./' + this.buflen;
            }
            else if (c == '='.charCodeAt(0)) {
                this.buflen = 0;
                return -1;
            }
            else if (Base64DecodeInputStream.isWhitespace(c)) {
                continue;
            }
            this.buffer = (this.buffer << 6) |
                Base64DecodeInputStream.decode(c);
            this.buflen += 6;
        }
        var n = (this.buffer >>> (this.buflen - 8)) & 0xff;
        this.buflen -= 8;
        return n;
    };
    Base64DecodeInputStream.isWhitespace = function (c) {
        return c == '\v'.charCodeAt(0) ||
            c == '\t'.charCodeAt(0) ||
            c == '\r'.charCodeAt(0) ||
            c == '\n'.charCodeAt(0);
    };
    Base64DecodeInputStream.decode = function (c) {
        if ('A'.charCodeAt(0) <= c && c <= 'Z'.charCodeAt(0)) {
            return c - 'A'.charCodeAt(0);
        }
        else if ('a'.charCodeAt(0) <= c && c <= 'z'.charCodeAt(0)) {
            return c - 'a'.charCodeAt(0) + 26;
        }
        else if ('0'.charCodeAt(0) <= c && c <= '9'.charCodeAt(0)) {
            return c - '0'.charCodeAt(0) + 52;
        }
        else if (c == '+'.charCodeAt(0)) {
            return 62;
        }
        else if (c == '/'.charCodeAt(0)) {
            return 63;
        }
        else {
            throw 'c:' + c;
        }
    };
    return Base64DecodeInputStream;
}(InputStream_1.InputStream));
exports.Base64DecodeInputStream = Base64DecodeInputStream;
//# sourceMappingURL=Base64DecodeInputStream.js.map