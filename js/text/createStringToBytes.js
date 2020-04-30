"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ByteArrayInputStream_1 = require("../io/ByteArrayInputStream");
var Base64DecodeInputStream_1 = require("../io/Base64DecodeInputStream");
'use strict';
function createStringToBytes(unicodeData, numChars) {
    function toBytes(s) {
        var bytes = [];
        for (var i = 0; i < s.length; i += 1) {
            bytes.push(s.charCodeAt(i));
        }
        return bytes;
    }
    var unicodeMap = function () {
        var bin = new Base64DecodeInputStream_1.Base64DecodeInputStream(new ByteArrayInputStream_1.ByteArrayInputStream(toBytes(unicodeData)));
        var read = function () {
            var b = bin.readByte();
            if (b == -1)
                throw 'eof';
            return b;
        };
        var count = 0;
        var unicodeMap = {};
        while (true) {
            var b0 = bin.readByte();
            if (b0 == -1)
                break;
            var b1 = read();
            var b2 = read();
            var b3 = read();
            var k = String.fromCharCode((b0 << 8) | b1);
            var v = (b2 << 8) | b3;
            unicodeMap[k] = v;
            count += 1;
        }
        if (count != numChars) {
            throw count + '!=' + numChars;
        }
        return unicodeMap;
    }();
    var unknownChar = '?'.charCodeAt(0);
    return function (s) {
        var bytes = [];
        for (var i = 0; i < s.length; i += 1) {
            var c = s.charCodeAt(i);
            if (c < 128) {
                bytes.push(c);
            }
            else {
                var b = unicodeMap[s.charAt(i)];
                if (typeof b == 'number') {
                    if ((b & 0xff) == b) {
                        bytes.push(b);
                    }
                    else {
                        bytes.push(b >>> 8);
                        bytes.push(b & 0xff);
                    }
                }
                else {
                    bytes.push(unknownChar);
                }
            }
        }
        return bytes;
    };
}
exports.createStringToBytes = createStringToBytes;
;
//# sourceMappingURL=createStringToBytes.js.map