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
var ByteArrayInputStream = (function (_super) {
    __extends(ByteArrayInputStream, _super);
    function ByteArrayInputStream(bytes) {
        var _this = _super.call(this) || this;
        _this.bytes = bytes;
        _this.pos = 0;
        return _this;
    }
    ByteArrayInputStream.prototype.readByte = function () {
        if (this.pos < this.bytes.length) {
            var b = this.bytes[this.pos];
            this.pos += 1;
            return b;
        }
        return -1;
    };
    return ByteArrayInputStream;
}(InputStream_1.InputStream));
exports.ByteArrayInputStream = ByteArrayInputStream;
//# sourceMappingURL=ByteArrayInputStream.js.map