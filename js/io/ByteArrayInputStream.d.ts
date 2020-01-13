import { InputStream } from './InputStream';
export declare class ByteArrayInputStream extends InputStream {
    private bytes;
    private pos;
    constructor(bytes: number[]);
    readByte(): number;
}
