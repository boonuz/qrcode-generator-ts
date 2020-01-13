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
var QRAlphaNum = (function (_super) {
    __extends(QRAlphaNum, _super);
    function QRAlphaNum(data) {
        return _super.call(this, Mode_1.Mode.MODE_ALPHA_NUM, data) || this;
    }
    QRAlphaNum.prototype.write = function (buffer) {
        var s = this.getData();
        var i = 0;
        while (i + 1 < s.length) {
            buffer.put(QRAlphaNum.getCode(s.charAt(i)) * 45 +
                QRAlphaNum.getCode(s.charAt(i + 1)), 11);
            i += 2;
        }
        if (i < s.length) {
            buffer.put(QRAlphaNum.getCode(s.charAt(i)), 6);
        }
    };
    QRAlphaNum.prototype.getLength = function () {
        return this.getData().length;
    };
    QRAlphaNum.getCode = function (c) {
        if ('0' <= c && c <= '9') {
            return c.charCodeAt(0) - '0'.charCodeAt(0);
        }
        else if ('A' <= c && c <= 'Z') {
            return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        }
        else {
            switch (c) {
                case ' ': return 36;
                case '$': return 37;
                case '%': return 38;
                case '*': return 39;
                case '+': return 40;
                case '-': return 41;
                case '.': return 42;
                case '/': return 43;
                case ':': return 44;
                default:
                    throw 'illegal char :' + c;
            }
        }
    };
    return QRAlphaNum;
}(QRData_1.QRData));
exports.QRAlphaNum = QRAlphaNum;
//# sourceMappingURL=QRAlphaNum.js.map