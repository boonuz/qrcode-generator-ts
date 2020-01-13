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
var ByteArrayOutputStream = (function (_super) {
    __extends(ByteArrayOutputStream, _super);
    function ByteArrayOutputStream() {
        var _this = _super.call(this) || this;
        _this.bytes = [];
        return _this;
    }
    ByteArrayOutputStream.prototype.writeByte = function (b) {
        this.bytes.push(b);
    };
    ByteArrayOutputStream.prototype.toByteArray = function () {
        return this.bytes;
    };
    return ByteArrayOutputStream;
}(OutputStream_1.OutputStream));
exports.ByteArrayOutputStream = ByteArrayOutputStream;
//# sourceMappingURL=ByteArrayOutputStream.js.map