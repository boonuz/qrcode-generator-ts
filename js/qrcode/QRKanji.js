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
var QRCode_1 = require("./QRCode");
'use strict';
var QRKanji = (function (_super) {
    __extends(QRKanji, _super);
    function QRKanji(data) {
        return _super.call(this, Mode_1.Mode.MODE_KANJI, data) || this;
    }
    QRKanji.prototype.write = function (buffer) {
        var data = QRCode_1.QRCode.stringToBytes(this.getData());
        var i = 0;
        while (i + 1 < data.length) {
            var c = ((0xff & data[i]) << 8) | (0xff & data[i + 1]);
            if (0x8140 <= c && c <= 0x9FFC) {
                c -= 0x8140;
            }
            else if (0xE040 <= c && c <= 0xEBBF) {
                c -= 0xC140;
            }
            else {
                throw 'illegal char at ' + (i + 1) + '/' + c;
            }
            c = ((c >>> 8) & 0xff) * 0xC0 + (c & 0xff);
            buffer.put(c, 13);
            i += 2;
        }
        if (i < data.length) {
            throw 'illegal char at ' + (i + 1);
        }
    };
    QRKanji.prototype.getLength = function () {
        return QRCode_1.QRCode.stringToBytes(this.getData()).length / 2;
    };
    return QRKanji;
}(QRData_1.QRData));
exports.QRKanji = QRKanji;
//# sourceMappingURL=QRKanji.js.map