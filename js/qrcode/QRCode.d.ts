import { ErrorCorrectLevel } from './ErrorCorrectLevel';
import { QRData } from './QRData';
export declare class QRCode {
    private static PAD0;
    private static PAD1;
    private typeNumber;
    private errorCorrectLevel;
    private qrDataList;
    private modules;
    private moduleCount;
    constructor();
    getTypeNumber(): number;
    setTypeNumber(typeNumber: number): void;
    getErrorCorrectLevel(): ErrorCorrectLevel;
    setErrorCorrectLevel(errorCorrectLevel: ErrorCorrectLevel): void;
    clearData(): void;
    addData(qrData: QRData | string): void;
    private getDataCount;
    private getData;
    isDark(row: number, col: number): boolean;
    getModuleCount(): number;
    make(): void;
    private getBestMaskPattern;
    private makeImpl;
    private mapData;
    private setupPositionAdjustPattern;
    private setupPositionProbePattern;
    private setupTimingPattern;
    private setupTypeNumber;
    private setupTypeInfo;
    static createData(typeNumber: number, errorCorrectLevel: ErrorCorrectLevel, dataArray: QRData[]): number[];
    private static createBytes;
    toDataURL(cellSize?: number, margin?: number): string;
    static stringToBytes: (s: string) => number[];
}
