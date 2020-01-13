import { QRData } from './QRData';
import { BitBuffer } from './BitBuffer';
export declare class QRAlphaNum extends QRData {
    constructor(data: string);
    write(buffer: BitBuffer): void;
    getLength(): number;
    private static getCode;
}
