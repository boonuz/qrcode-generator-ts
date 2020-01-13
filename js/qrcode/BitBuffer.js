'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var BitBuffer = (function () {
    function BitBuffer() {
        this.buffer = [];
        this.length = 0;
    }
    BitBuffer.prototype.getBuffer = function () {
        return this.buffer;
    };
    BitBuffer.prototype.getLengthInBits = function () {
        return this.length;
    };
    BitBuffer.prototype.toString = function () {
        var buffer = '';
        for (var i = 0; i < this.getLengthInBits(); i += 1) {
            buffer += this.getBit(i) ? '1' : '0';
        }
        return buffer;
    };
    BitBuffer.prototype.getBit = function (index) {
        return ((this.buffer[~~(index / 8)] >>> (7 - index % 8)) & 1) == 1;
    };
    BitBuffer.prototype.put = function (num, length) {
        for (var i = 0; i < length; i += 1) {
            this.putBit(((num >>> (length - i - 1)) & 1) == 1);
        }
    };
    BitBuffer.prototype.putBit = function (bit) {
        if (this.length == this.buffer.length * 8) {
            this.buffer.push(0);
        }
        if (bit) {
            this.buffer[~~(this.length / 8)] |= (0x80 >>> (this.length % 8));
        }
        this.length += 1;
    };
    return BitBuffer;
}());
exports.BitBuffer = BitBuffer;
//# sourceMappingURL=BitBuffer.js.map