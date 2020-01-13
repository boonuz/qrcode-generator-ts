"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mode_1 = require("./Mode");
'use strict';
var QRData = (function () {
    function QRData(mode, data) {
        this.mode = mode;
        this.data = data;
    }
    QRData.prototype.getMode = function () {
        return this.mode;
    };
    QRData.prototype.getData = function () {
        return this.data;
    };
    QRData.prototype.getLengthInBits = function (typeNumber) {
        if (1 <= typeNumber && typeNumber < 10) {
            switch (this.mode) {
                case Mode_1.Mode.MODE_NUMBER: return 10;
                case Mode_1.Mode.MODE_ALPHA_NUM: return 9;
                case Mode_1.Mode.MODE_8BIT_BYTE: return 8;
                case Mode_1.Mode.MODE_KANJI: return 8;
                default:
                    throw 'mode:' + this.mode;
            }
        }
        else if (typeNumber < 27) {
            switch (this.mode) {
                case Mode_1.Mode.MODE_NUMBER: return 12;
                case Mode_1.Mode.MODE_ALPHA_NUM: return 11;
                case Mode_1.Mode.MODE_8BIT_BYTE: return 16;
                case Mode_1.Mode.MODE_KANJI: return 10;
                default:
                    throw 'mode:' + this.mode;
            }
        }
        else if (typeNumber < 41) {
            switch (this.mode) {
                case Mode_1.Mode.MODE_NUMBER: return 14;
                case Mode_1.Mode.MODE_ALPHA_NUM: return 13;
                case Mode_1.Mode.MODE_8BIT_BYTE: return 16;
                case Mode_1.Mode.MODE_KANJI: return 12;
                default:
                    throw 'mode:' + this.mode;
            }
        }
        else {
            throw 'typeNumber:' + typeNumber;
        }
    };
    return QRData;
}());
exports.QRData = QRData;
//# sourceMappingURL=QRData.js.map