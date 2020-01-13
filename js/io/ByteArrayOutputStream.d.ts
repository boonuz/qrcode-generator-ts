import { OutputStream } from './OutputStream';
export declare class ByteArrayOutputStream extends OutputStream {
    private bytes;
    constructor();
    writeByte(b: number): void;
    toByteArray(): number[];
}
