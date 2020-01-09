/*
* Copyright (C) 2019-2020 The TesraSupernet Authors
* This file is part of The TesraSupernet library.
*
* The TesraSupernet is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* The TesraSupernet is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with The TesraSupernet.  If not, see <http://www.gnu.org/licenses/>.
*/

import { BigNumber } from 'bignumber.js';
import * as Long from 'long';
import { ERROR_CODE } from './../error';
import { bigIntFromBytes, bigIntToBytes } from './../utils';

const SIZE = 8;
/**
 * Big positive integer base on BigNumber
 */
export default class BigInt {
    /**
     * Create BigInt from string
     * @param hex Byte string value
     */
    static fromHexstr(hex: string): BigInt {
        // hex = reverseHex(hex);
        // const bi = new BigNumber(hex, 16).toString();
        // return new BigInt(bi);
        const long = bigIntFromBytes(hex);
        return new BigInt(long.toString());
    }

    value: string | number;
    ledgerCompatible: boolean;

    constructor(value: string | number, ledgerCompatible: boolean = true) {
        const bi = new BigNumber(value);
        if (!bi.isInteger()) {
            throw new Error(String(ERROR_CODE.INVALID_PARAMS));
        }
        this.value = value;
        this.ledgerCompatible = ledgerCompatible;
    }

    /**
     * Create hex string from BigInt
     */
    toHexstr(): string {
        const bi = Long.fromValue(this.value);
        let hex = bigIntToBytes(bi);
        if (this.ledgerCompatible && (hex.length % 2 !== 0 || hex.length < 16)) {
            hex = hex + '0'.repeat(SIZE * 2 - hex.length);
        }
        return hex;
    }
}
