import { BigNumber } from 'bignumber.js';
import { I128 } from '../common/int128';
import { Address } from '../crypto';
import AbiFunction from '../smartcontract/abi/abiFunction';
import { Parameter } from '../smartcontract/abi/parameter';
import Struct from '../smartcontract/abi/struct';
import { StringReader } from '../utils';
export declare const pushBool: (param: boolean) => string;
export declare const pushInt: (param: number, ledgerCompatible?: boolean) => string;
export declare const pushBigNum: (param: BigNumber, ledgerCompatible?: boolean) => string;
export declare const getStructBytes: (val: Struct) => string;
export declare const getMapBytes: (val: Map<string, Parameter>) => string;
export declare const pushMap: (val: Map<string, any>, ledgerCompatible: boolean) => string;
export declare const pushParam: (p: any, ledgerCompatible: boolean) => string;
export declare const serializeAbiFunction: (abiFunction: AbiFunction, ledgerCompatible?: boolean) => string;
export declare function convertArray(list: Parameter[]): any;
export declare function convertMap(p: Parameter): any;
/**
 * To deserialize the value return from smart contract invoke.
 * @param hexstr
 */
export declare function deserializeItem(sr: StringReader): any;
export declare const createCodeParamsScript: (list: any[], ledgerCompatible?: boolean) => string;
export declare const buildSmartContractParam: (functionName: string, params: Parameter[]) => string;
export declare function buildWasmContractParam(params: Parameter[]): string;
export declare function writeUint16(data: number): string;
export declare function writeUint32(data: number): string;
export declare function writeUint64(data: number): string;
export declare function writeVarBytes(data: string): string;
export declare function writeString(data: string): string;
export declare function writeAddress(data: Address): string;
export declare function writeI128(data: I128): string;
export declare function writeBool(data: boolean): string;
export declare function writeVarUint(data: number): string;
