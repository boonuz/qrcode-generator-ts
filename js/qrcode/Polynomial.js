"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QRMath_1 = require("./QRMath");
'use strict';
var Polynomial = (function () {
    function Polynomial(num, shift) {
        if (shift === void 0) { shift = 0; }
        var offset = 0;
        while (offset < num.length && num[offset] == 0) {
            offset += 1;
        }
        this.num = [];
        var len = num.length - offset;
        for (var i = 0; i < len; i += 1) {
            this.num.push(num[offset + i]);
        }
        for (var i = 0; i < shift; i += 1) {
            this.num.push(0);
        }
    }
    Polynomial.prototype.getAt = function (index) {
        return this.num[index];
    };
    Polynomial.prototype.getLength = function () {
        return this.num.length;
    };
    Polynomial.prototype.toString = function () {
        var buffer = '';
        for (var i = 0; i < this.getLength(); i += 1) {
            if (i > 0) {
                buffer += ',';
            }
            buffer += this.getAt(i);
        }
        return buffer.toString();
    };
    Polynomial.prototype.toLogString = function () {
        var buffer = '';
        for (var i = 0; i < this.getLength(); i += 1) {
            if (i > 0) {
                buffer += ',';
            }
            buffer += QRMath_1.QRMath.glog(this.getAt(i));
        }
        return buffer.toString();
    };
    Polynomial.prototype.multiply = function (e) {
        var num = [];
        var len = this.getLength() + e.getLength() - 1;
        for (var i = 0; i < len; i += 1) {
            num.push(0);
        }
        for (var i = 0; i < this.getLength(); i += 1) {
            for (var j = 0; j < e.getLength(); j += 1) {
                num[i + j] ^= QRMath_1.QRMath.gexp(QRMath_1.QRMath.glog(this.getAt(i)) +
                    QRMath_1.QRMath.glog(e.getAt(j)));
            }
        }
        return new Polynomial(num);
    };
    Polynomial.prototype.mod = function (e) {
        if (this.getLength() - e.getLength() < 0) {
            return this;
        }
        var ratio = QRMath_1.QRMath.glog(this.getAt(0)) - QRMath_1.QRMath.glog(e.getAt(0));
        var num = [];
        for (var i = 0; i < this.getLength(); i += 1) {
            num.push(this.getAt(i));
        }
        for (var i = 0; i < e.getLength(); i += 1) {
            num[i] ^= QRMath_1.QRMath.gexp(QRMath_1.QRMath.glog(e.getAt(i)) + ratio);
        }
        return new Polynomial(num).mod(e);
    };
    return Polynomial;
}());
exports.Polynomial = Polynomial;
//# sourceMappingURL=Polynomial.js.map