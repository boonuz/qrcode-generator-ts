import { BitBuffer } from './BitBuffer';
import { QRData } from './QRData';
export declare class QR8BitByte extends QRData {
    constructor(data: string);
    write(buffer: BitBuffer): void;
    getLength(): number;
}
