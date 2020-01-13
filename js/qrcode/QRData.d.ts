import { Mode } from './Mode';
import { BitBuffer } from './BitBuffer';
export declare abstract class QRData {
    private mode;
    private data;
    constructor(mode: Mode, data: string);
    getMode(): Mode;
    getData(): string;
    abstract getLength(): number;
    abstract write(buffer: BitBuffer): void;
    getLengthInBits(typeNumber: number): number;
}
