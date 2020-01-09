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

/**
 * Struct is a special kind of parameter that used in smart contract.
 */
export default class Struct {
    list: any[];

    constructor() {
        this.list = [];
    }
    /**
     * Add arguments to struct.
     * @param args Array of some kinds of value.
     * Boolean, number, string, Address and Struct are supported.
     */
    add(...args: any[]) {
        for (const a of args) {
            this.list.push(a);
        }
    }
}
