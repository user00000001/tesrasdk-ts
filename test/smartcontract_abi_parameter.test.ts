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

import { Parameter, ParameterType } from '../src/smartcontract/abi/parameter';

describe('test smartcontract.abi.parameter', () => {
    test('test setValue with 0', () => {
        const p = new Parameter('test', ParameterType.Integer, 123);
        const result = p.setValue({
            name: 'test',
            type: ParameterType.Integer,
            value: 0
        });
        expect(result).toBeTruthy();
        expect(p.getValue()).toEqual(0);
    });
    test('test setValue with false', () => {
        const p = new Parameter('test', ParameterType.Boolean, true);
        const result = p.setValue({
            name: 'test',
            type: ParameterType.Boolean,
            value: false
        });
        expect(result).toBeTruthy();
        expect(p.getValue()).toEqual(false);
    });
    test('test setValue with null', () => {
        const p = new Parameter('test', ParameterType.Integer, 123);
        const result = p.setValue({
            name: 'test',
            type: ParameterType.Integer,
            value: null
        });
        expect(result).toBeFalsy();
        expect(p.getValue()).toEqual(123);
    });
});
