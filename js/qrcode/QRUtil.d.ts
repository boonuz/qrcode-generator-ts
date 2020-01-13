import { Mode } from './Mode';
import { ErrorCorrectLevel } from './ErrorCorrectLevel';
import { Polynomial } from './Polynomial';
import { QRCode } from './QRCode';
export declare class QRUtil {
    constructor();
    static getPatternPosition(typeNumber: number): number[];
    private static PATTERN_POSITION_TABLE;
    private static MAX_LENGTH;
    static getMaxLength(typeNumber: number, mode: Mode, errorCorrectLevel: ErrorCorrectLevel): number;
    static getErrorCorrectPolynomial(errorCorrectLength: number): Polynomial;
    static getMaskFunc(maskPattern: number): (i: number, j: number) => boolean;
    static getLostPoint(qrCode: QRCode): number;
    static getBCHTypeInfo(data: number): number;
    static getBCHTypeNumber(data: number): number;
    private static G15;
    private static G18;
    private static G15_MASK;
    private static getBCHDigit;
}
