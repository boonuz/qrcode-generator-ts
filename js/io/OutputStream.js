'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var OutputStream = (function () {
    function OutputStream() {
    }
    OutputStream.prototype.writeBytes = function (bytes) {
        for (var i = 0; i < bytes.length; i += 1) {
            this.writeByte(bytes[i]);
        }
    };
    OutputStream.prototype.flush = function () {
    };
    OutputStream.prototype.close = function () {
        this.flush();
    };
    return OutputStream;
}());
exports.OutputStream = OutputStream;
//# sourceMappingURL=OutputStream.js.map