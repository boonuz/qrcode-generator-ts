import { InputStream } from './InputStream';
export declare class Base64DecodeInputStream extends InputStream {
    private istream;
    private buffer;
    private buflen;
    constructor(istream: InputStream);
    readByte(): number;
    private static isWhitespace;
    private static decode;
}
