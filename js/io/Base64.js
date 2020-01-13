"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ByteArrayInputStream_1 = require("./ByteArrayInputStream");
var ByteArrayOutputStream_1 = require("./ByteArrayOutputStream");
var Base64DecodeInputStream_1 = require("./Base64DecodeInputStream");
var Base64EncodeOutputStream_1 = require("./Base64EncodeOutputStream");
'use strict';
var Base64 = (function () {
    function Base64() {
        throw 'error';
    }
    Base64.encode = function (data) {
        var bout = new ByteArrayOutputStream_1.ByteArrayOutputStream();
        try {
            var ostream = new Base64EncodeOutputStream_1.Base64EncodeOutputStream(bout);
            try {
                ostream.writeBytes(data);
            }
            finally {
                ostream.close();
            }
        }
        finally {
            bout.close();
        }
        return bout.toByteArray();
    };
    Base64.decode = function (data) {
        var bout = new ByteArrayOutputStream_1.ByteArrayOutputStream();
        try {
            var istream = new Base64DecodeInputStream_1.Base64DecodeInputStream(new ByteArrayInputStream_1.ByteArrayInputStream(data));
            try {
                var b;
                while ((b = istream.readByte()) != -1) {
                    bout.writeByte(b);
                }
            }
            finally {
                istream.close();
            }
        }
        finally {
            bout.close();
        }
        return bout.toByteArray();
    };
    return Base64;
}());
exports.Base64 = Base64;
//# sourceMappingURL=Base64.js.map