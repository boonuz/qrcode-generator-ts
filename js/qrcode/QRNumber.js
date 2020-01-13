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
var QRData_1 = require("./QRData");
var Mode_1 = require("./Mode");
'use strict';
var QRNumber = (function (_super) {
    __extends(QRNumber, _super);
    function QRNumber(data) {
        return _super.call(this, Mode_1.Mode.MODE_NUMBER, data) || this;
    }
    QRNumber.prototype.write = function (buffer) {
        var data = this.getData();
        var i = 0;
        while (i + 2 < data.length) {
            buffer.put(QRNumber.strToNum(data.substring(i, i + 3)), 10);
            i += 3;
        }
        if (i < data.length) {
            if (data.length - i == 1) {
                buffer.put(QRNumber.strToNum(data.substring(i, i + 1)), 4);
            }
            else if (data.length - i == 2) {
                buffer.put(QRNumber.strToNum(data.substring(i, i + 2)), 7);
            }
        }
    };
    QRNumber.prototype.getLength = function () {
        return this.getData().length;
    };
    QRNumber.strToNum = function (s) {
        var num = 0;
        for (var i = 0; i < s.length; i += 1) {
            num = num * 10 + QRNumber.chatToNum(s.charAt(i));
        }
        return num;
    };
    QRNumber.chatToNum = function (c) {
        if ('0' <= c && c <= '9') {
            return c.charCodeAt(0) - '0'.charCodeAt(0);
        }
        throw 'illegal char :' + c;
    };
    return QRNumber;
}(QRData_1.QRData));
exports.QRNumber = QRNumber;
//# sourceMappingURL=QRNumber.js.map