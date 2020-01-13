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
var QRCode_1 = require("./QRCode");
var QRData_1 = require("./QRData");
var Mode_1 = require("./Mode");
'use strict';
var QR8BitByte = (function (_super) {
    __extends(QR8BitByte, _super);
    function QR8BitByte(data) {
        return _super.call(this, Mode_1.Mode.MODE_8BIT_BYTE, data) || this;
    }
    QR8BitByte.prototype.write = function (buffer) {
        var data = QRCode_1.QRCode.stringToBytes(this.getData());
        for (var i = 0; i < data.length; i += 1) {
            buffer.put(data[i], 8);
        }
    };
    QR8BitByte.prototype.getLength = function () {
        return QRCode_1.QRCode.stringToBytes(this.getData()).length;
    };
    return QR8BitByte;
}(QRData_1.QRData));
exports.QR8BitByte = QR8BitByte;
//# sourceMappingURL=QR8BitByte.js.map