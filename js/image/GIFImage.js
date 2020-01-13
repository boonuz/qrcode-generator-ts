"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base64_1 = require("../io/Base64");
var ByteArrayOutputStream_1 = require("../io/ByteArrayOutputStream");
'use strict';
var GIFImage = (function () {
    function GIFImage(width, height) {
        this.width = width;
        this.height = height;
        var size = width * height;
        this.data = [];
        for (var i = 0; i < size; i += 1) {
            this.data.push(0);
        }
    }
    GIFImage.prototype.setPixel = function (x, y, pixel) {
        if (x < 0 || this.width <= x)
            throw '!' + x;
        if (y < 0 || this.height <= y)
            throw '!' + y;
        this.data[y * this.width + x] = pixel;
    };
    GIFImage.prototype.getPixel = function (x, y) {
        if (x < 0 || this.width <= x)
            throw '!' + x;
        if (y < 0 || this.height <= y)
            throw '!' + y;
        return this.data[y * this.width + x];
    };
    GIFImage.prototype.write = function (out) {
        out.writeByte('G'.charCodeAt(0));
        out.writeByte('I'.charCodeAt(0));
        out.writeByte('F'.charCodeAt(0));
        out.writeByte('8'.charCodeAt(0));
        out.writeByte('7'.charCodeAt(0));
        out.writeByte('a'.charCodeAt(0));
        this.writeWord(out, this.width);
        this.writeWord(out, this.height);
        out.writeByte(0x80);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(0x00);
        out.writeByte(0x00);
        out.writeByte(0x00);
        out.writeByte(0xff);
        out.writeByte(0xff);
        out.writeByte(0xff);
        out.writeByte(0x21);
        out.writeByte(0xf9);
        out.writeByte(0x04);
        out.writeByte(0x01);
        out.writeByte(0x00);
        out.writeByte(0x00);
        out.writeByte(0x00);
        out.writeByte(0x00);
        out.writeByte(','.charCodeAt(0));
        this.writeWord(out, 0);
        this.writeWord(out, 0);
        this.writeWord(out, this.width);
        this.writeWord(out, this.height);
        out.writeByte(0);
        var lzwMinCodeSize = 2;
        var raster = this.getLZWRaster(lzwMinCodeSize);
        out.writeByte(lzwMinCodeSize);
        var offset = 0;
        while (raster.length - offset > 255) {
            out.writeByte(255);
            this.writeBytes(out, raster, offset, 255);
            offset += 255;
        }
        out.writeByte(raster.length - offset);
        this.writeBytes(out, raster, offset, raster.length - offset);
        out.writeByte(0x00);
        out.writeByte(';'.charCodeAt(0));
    };
    GIFImage.prototype.getLZWRaster = function (lzwMinCodeSize) {
        var clearCode = 1 << lzwMinCodeSize;
        var endCode = (1 << lzwMinCodeSize) + 1;
        var bitLength = lzwMinCodeSize + 1;
        var table = new LZWTable();
        for (var i = 0; i < clearCode; i += 1) {
            table.add(String.fromCharCode(i));
        }
        table.add(String.fromCharCode(clearCode));
        table.add(String.fromCharCode(endCode));
        var byteOut = new ByteArrayOutputStream_1.ByteArrayOutputStream();
        var bitOut = new BitOutputStream(byteOut);
        try {
            bitOut.write(clearCode, bitLength);
            var dataIndex = 0;
            var s = String.fromCharCode(this.data[dataIndex]);
            dataIndex += 1;
            while (dataIndex < this.data.length) {
                var c = String.fromCharCode(this.data[dataIndex]);
                dataIndex += 1;
                if (table.contains(s + c)) {
                    s = s + c;
                }
                else {
                    bitOut.write(table.indexOf(s), bitLength);
                    if (table.getSize() < 0xfff) {
                        if (table.getSize() == (1 << bitLength)) {
                            bitLength += 1;
                        }
                        table.add(s + c);
                    }
                    s = c;
                }
            }
            bitOut.write(table.indexOf(s), bitLength);
            bitOut.write(endCode, bitLength);
        }
        finally {
            bitOut.close();
        }
        return byteOut.toByteArray();
    };
    GIFImage.prototype.writeWord = function (out, i) {
        out.writeByte(i & 0xff);
        out.writeByte((i >>> 8) & 0xff);
    };
    GIFImage.prototype.writeBytes = function (out, bytes, off, len) {
        for (var i = 0; i < len; i += 1) {
            out.writeByte(bytes[i + off]);
        }
    };
    GIFImage.prototype.toDataURL = function () {
        var bout = new ByteArrayOutputStream_1.ByteArrayOutputStream();
        this.write(bout);
        bout.close();
        var s = '';
        var bytes = Base64_1.Base64.encode(bout.toByteArray());
        for (var i = 0; i < bytes.length; i += 1) {
            s += String.fromCharCode(bytes[i]);
        }
        return 'data:image/gif;base64,' + s;
    };
    return GIFImage;
}());
exports.GIFImage = GIFImage;
var LZWTable = (function () {
    function LZWTable() {
        this.map = {};
        this.size = 0;
    }
    LZWTable.prototype.add = function (key) {
        if (this.contains(key)) {
            throw 'dup key:' + key;
        }
        this.map[key] = this.size;
        this.size += 1;
    };
    LZWTable.prototype.getSize = function () {
        return this.size;
    };
    LZWTable.prototype.indexOf = function (key) {
        return this.map[key];
    };
    LZWTable.prototype.contains = function (key) {
        return typeof this.map[key] != 'undefined';
    };
    return LZWTable;
}());
var BitOutputStream = (function () {
    function BitOutputStream(out) {
        this.out = out;
        this.bitLength = 0;
    }
    BitOutputStream.prototype.write = function (data, length) {
        if ((data >>> length) != 0) {
            throw 'length over';
        }
        while (this.bitLength + length >= 8) {
            this.out.writeByte(0xff &
                ((data << this.bitLength) | this.bitBuffer));
            length -= (8 - this.bitLength);
            data >>>= (8 - this.bitLength);
            this.bitBuffer = 0;
            this.bitLength = 0;
        }
        this.bitBuffer = (data << this.bitLength) | this.bitBuffer;
        this.bitLength = this.bitLength + length;
    };
    BitOutputStream.prototype.flush = function () {
        if (this.bitLength > 0) {
            this.out.writeByte(this.bitBuffer);
        }
        this.out.flush();
    };
    BitOutputStream.prototype.close = function () {
        this.flush();
        this.out.close();
    };
    return BitOutputStream;
}());
//# sourceMappingURL=GIFImage.js.map