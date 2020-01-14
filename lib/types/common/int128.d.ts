import { BigNumber } from 'bignumber.js';
import { StringReader } from '../utils';
import BigInt from './bigInt';
export declare class I128 {
    static deserialize(sr: StringReader): I128;
    value: number[];
    constructor(value?: number[]);
    compareTo(o: I128): 1 | 0 | -1;
    serialize(): string;
}
export declare class U128 {
    static deserialize(sr: StringReader): U128;
    value: number[];
    constructor(value?: number[]);
    compareTo(o: U128): 1 | 0 | -1;
    serialize(): string;
    toBigInt(): BigInt;
    toI128(): I128;
}
export declare function oneBits128(): I128;
export declare function bigPow(a: number, b: number): BigNumber;
export declare const pow128: BigNumber;
export declare const maxBigU128: BigNumber;
export declare const maxI128: BigNumber;
export declare const minI128: BigNumber;
export declare function I128FromInt(val: number): I128;
export declare function I128FromBigInt(val: string): I128;
export declare function putUint64(value: number[], val: number): void;
