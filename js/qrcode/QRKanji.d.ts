import { QRData } from './QRData';
import { BitBuffer } from './BitBuffer';
export declare class QRKanji extends QRData {
    constructor(data: string);
    write(buffer: BitBuffer): void;
    getLength(): number;
}
