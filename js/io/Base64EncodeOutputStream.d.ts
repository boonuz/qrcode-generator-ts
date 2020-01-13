import { OutputStream } from './OutputStream';
export declare class Base64EncodeOutputStream extends OutputStream {
    private ostream;
    private buffer;
    private buflen;
    private length;
    constructor(ostream: OutputStream);
    writeByte(n: number): void;
    flush(): void;
    private writeEncoded;
    private static encode;
}
