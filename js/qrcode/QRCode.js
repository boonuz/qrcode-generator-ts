"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringToBytes_SJIS_1 = require("../text/stringToBytes_SJIS");
var GIFImage_1 = require("../image/GIFImage");
var ErrorCorrectLevel_1 = require("./ErrorCorrectLevel");
var QRData_1 = require("./QRData");
var QR8BitByte_1 = require("./QR8BitByte");
var QRUtil_1 = require("./QRUtil");
var RSBlock_1 = require("./RSBlock");
var BitBuffer_1 = require("./BitBuffer");
var Polynomial_1 = require("./Polynomial");
'use strict';
var QRCode = (function () {
    function QRCode() {
        this.typeNumber = 1;
        this.errorCorrectLevel = ErrorCorrectLevel_1.ErrorCorrectLevel.L;
        this.qrDataList = [];
    }
    QRCode.prototype.getTypeNumber = function () {
        return this.typeNumber;
    };
    QRCode.prototype.setTypeNumber = function (typeNumber) {
        this.typeNumber = typeNumber;
    };
    QRCode.prototype.getErrorCorrectLevel = function () {
        return this.errorCorrectLevel;
    };
    QRCode.prototype.setErrorCorrectLevel = function (errorCorrectLevel) {
        this.errorCorrectLevel = errorCorrectLevel;
    };
    QRCode.prototype.clearData = function () {
        this.qrDataList = [];
    };
    QRCode.prototype.addData = function (qrData) {
        if (qrData instanceof QRData_1.QRData) {
            this.qrDataList.push(qrData);
        }
        else if (typeof qrData === 'string') {
            this.qrDataList.push(new QR8BitByte_1.QR8BitByte(qrData));
        }
        else {
            throw typeof qrData;
        }
    };
    QRCode.prototype.getDataCount = function () {
        return this.qrDataList.length;
    };
    QRCode.prototype.getData = function (index) {
        return this.qrDataList[index];
    };
    QRCode.prototype.isDark = function (row, col) {
        if (this.modules[row][col] != null) {
            return this.modules[row][col];
        }
        else {
            return false;
        }
    };
    QRCode.prototype.getModuleCount = function () {
        return this.moduleCount;
    };
    QRCode.prototype.make = function () {
        this.makeImpl(false, this.getBestMaskPattern());
    };
    QRCode.prototype.getBestMaskPattern = function () {
        var minLostPoint = 0;
        var pattern = 0;
        for (var i = 0; i < 8; i += 1) {
            this.makeImpl(true, i);
            var lostPoint = QRUtil_1.QRUtil.getLostPoint(this);
            if (i == 0 || minLostPoint > lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
            }
        }
        return pattern;
    };
    QRCode.prototype.makeImpl = function (test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = [];
        for (var i = 0; i < this.moduleCount; i += 1) {
            this.modules.push([]);
            for (var j = 0; j < this.moduleCount; j += 1) {
                this.modules[i].push(null);
            }
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);
        if (this.typeNumber >= 7) {
            this.setupTypeNumber(test);
        }
        var data = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.qrDataList);
        this.mapData(data, maskPattern);
    };
    QRCode.prototype.mapData = function (data, maskPattern) {
        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        var maskFunc = QRUtil_1.QRUtil.getMaskFunc(maskPattern);
        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
            if (col == 6) {
                col -= 1;
            }
            while (true) {
                for (var c = 0; c < 2; c += 1) {
                    if (this.modules[row][col - c] == null) {
                        var dark = false;
                        if (byteIndex < data.length) {
                            dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                        }
                        var mask = maskFunc(row, col - c);
                        if (mask) {
                            dark = !dark;
                        }
                        this.modules[row][col - c] = dark;
                        bitIndex -= 1;
                        if (bitIndex == -1) {
                            byteIndex += 1;
                            bitIndex = 7;
                        }
                    }
                }
                row += inc;
                if (row < 0 || this.moduleCount <= row) {
                    row -= inc;
                    inc = -inc;
                    break;
                }
            }
        }
    };
    QRCode.prototype.setupPositionAdjustPattern = function () {
        var pos = QRUtil_1.QRUtil.getPatternPosition(this.typeNumber);
        for (var i = 0; i < pos.length; i += 1) {
            for (var j = 0; j < pos.length; j += 1) {
                var row = pos[i];
                var col = pos[j];
                if (this.modules[row][col] != null) {
                    continue;
                }
                for (var r = -2; r <= 2; r += 1) {
                    for (var c = -2; c <= 2; c += 1) {
                        if (r == -2 || r == 2 || c == -2 || c == 2
                            || (r == 0 && c == 0)) {
                            this.modules[row + r][col + c] = true;
                        }
                        else {
                            this.modules[row + r][col + c] = false;
                        }
                    }
                }
            }
        }
    };
    QRCode.prototype.setupPositionProbePattern = function (row, col) {
        for (var r = -1; r <= 7; r += 1) {
            for (var c = -1; c <= 7; c += 1) {
                if (row + r <= -1 || this.moduleCount <= row + r
                    || col + c <= -1 || this.moduleCount <= col + c) {
                    continue;
                }
                if ((0 <= r && r <= 6 && (c == 0 || c == 6))
                    || (0 <= c && c <= 6 && (r == 0 || r == 6))
                    || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                    this.modules[row + r][col + c] = true;
                }
                else {
                    this.modules[row + r][col + c] = false;
                }
            }
        }
    };
    QRCode.prototype.setupTimingPattern = function () {
        for (var r = 8; r < this.moduleCount - 8; r += 1) {
            if (this.modules[r][6] != null) {
                continue;
            }
            this.modules[r][6] = r % 2 == 0;
        }
        for (var c = 8; c < this.moduleCount - 8; c += 1) {
            if (this.modules[6][c] != null) {
                continue;
            }
            this.modules[6][c] = c % 2 == 0;
        }
    };
    QRCode.prototype.setupTypeNumber = function (test) {
        var bits = QRUtil_1.QRUtil.getBCHTypeNumber(this.typeNumber);
        for (var i = 0; i < 18; i += 1) {
            this.modules[~~(i / 3)][i % 3 + this.moduleCount - 8 - 3] =
                !test && ((bits >> i) & 1) == 1;
        }
        for (var i = 0; i < 18; i += 1) {
            this.modules[i % 3 + this.moduleCount - 8 - 3][~~(i / 3)] =
                !test && ((bits >> i) & 1) == 1;
        }
    };
    QRCode.prototype.setupTypeInfo = function (test, maskPattern) {
        var data = (this.errorCorrectLevel << 3) | maskPattern;
        var bits = QRUtil_1.QRUtil.getBCHTypeInfo(data);
        for (var i = 0; i < 15; i += 1) {
            var mod = !test && ((bits >> i) & 1) == 1;
            if (i < 6) {
                this.modules[i][8] = mod;
            }
            else if (i < 8) {
                this.modules[i + 1][8] = mod;
            }
            else {
                this.modules[this.moduleCount - 15 + i][8] = mod;
            }
        }
        for (var i = 0; i < 15; i += 1) {
            var mod = !test && ((bits >> i) & 1) == 1;
            if (i < 8) {
                this.modules[8][this.moduleCount - i - 1] = mod;
            }
            else if (i < 9) {
                this.modules[8][15 - i - 1 + 1] = mod;
            }
            else {
                this.modules[8][15 - i - 1] = mod;
            }
        }
        this.modules[this.moduleCount - 8][8] = !test;
    };
    QRCode.createData = function (typeNumber, errorCorrectLevel, dataArray) {
        var rsBlocks = RSBlock_1.RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
        var buffer = new BitBuffer_1.BitBuffer();
        for (var i = 0; i < dataArray.length; i += 1) {
            var data = dataArray[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), data.getLengthInBits(typeNumber));
            data.write(buffer);
        }
        var totalDataCount = 0;
        for (var i = 0; i < rsBlocks.length; i += 1) {
            totalDataCount += rsBlocks[i].getDataCount();
        }
        if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw 'code length overflow. ('
                + buffer.getLengthInBits()
                + '>'
                + totalDataCount * 8
                + ')';
        }
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 != 0) {
            buffer.putBit(false);
        }
        while (true) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
            }
            buffer.put(QRCode.PAD0, 8);
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
            }
            buffer.put(QRCode.PAD1, 8);
        }
        return QRCode.createBytes(buffer, rsBlocks);
    };
    QRCode.createBytes = function (buffer, rsBlocks) {
        var offset = 0;
        var maxDcCount = 0;
        var maxEcCount = 0;
        var dcdata = [];
        var ecdata = [];
        for (var r = 0; r < rsBlocks.length; r += 1) {
            dcdata.push([]);
            ecdata.push([]);
        }
        function createNumArray(len) {
            var a = [];
            for (var i = 0; i < len; i += 1) {
                a.push(0);
            }
            return a;
        }
        for (var r = 0; r < rsBlocks.length; r += 1) {
            var dcCount = rsBlocks[r].getDataCount();
            var ecCount = rsBlocks[r].getTotalCount() - dcCount;
            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);
            dcdata[r] = createNumArray(dcCount);
            for (var i = 0; i < dcdata[r].length; i += 1) {
                dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
            }
            offset += dcCount;
            var rsPoly = QRUtil_1.QRUtil.getErrorCorrectPolynomial(ecCount);
            var rawPoly = new Polynomial_1.Polynomial(dcdata[r], rsPoly.getLength() - 1);
            var modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = createNumArray(rsPoly.getLength() - 1);
            for (var i = 0; i < ecdata[r].length; i += 1) {
                var modIndex = i + modPoly.getLength() - ecdata[r].length;
                ecdata[r][i] = (modIndex >= 0) ? modPoly.getAt(modIndex) : 0;
            }
        }
        var totalCodeCount = 0;
        for (var i = 0; i < rsBlocks.length; i += 1) {
            totalCodeCount += rsBlocks[i].getTotalCount();
        }
        var data = createNumArray(totalCodeCount);
        var index = 0;
        for (var i = 0; i < maxDcCount; i += 1) {
            for (var r = 0; r < rsBlocks.length; r += 1) {
                if (i < dcdata[r].length) {
                    data[index] = dcdata[r][i];
                    index += 1;
                }
            }
        }
        for (var i = 0; i < maxEcCount; i += 1) {
            for (var r = 0; r < rsBlocks.length; r += 1) {
                if (i < ecdata[r].length) {
                    data[index] = ecdata[r][i];
                    index += 1;
                }
            }
        }
        return data;
    };
    QRCode.prototype.toDataURL = function (cellSize, margin) {
        if (cellSize === void 0) { cellSize = 2; }
        if (margin === void 0) { margin = cellSize * 4; }
        var mods = this.getModuleCount();
        var size = cellSize * mods + margin * 2;
        var gif = new GIFImage_1.GIFImage(size, size);
        for (var y = 0; y < size; y += 1) {
            for (var x = 0; x < size; x += 1) {
                if (margin <= x && x < size - margin &&
                    margin <= y && y < size - margin &&
                    this.isDark(~~((y - margin) / cellSize), ~~((x - margin) / cellSize))) {
                    gif.setPixel(x, y, 1);
                }
                else {
                    gif.setPixel(x, y, 0);
                }
            }
        }
        return gif.toDataURL();
    };
    QRCode.PAD0 = 0xEC;
    QRCode.PAD1 = 0x11;
    QRCode.stringToBytes = stringToBytes_SJIS_1.stringToBytes_SJIS;
    return QRCode;
}());
exports.QRCode = QRCode;
//# sourceMappingURL=QRCode.js.map