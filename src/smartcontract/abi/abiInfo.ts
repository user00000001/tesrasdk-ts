
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
import AbiFunction from './abiFunction';
import { Parameter } from './parameter';

/**
 * Decribes the Abi info.
 */
export default class AbiInfo {
    static parseJson(json: string): AbiInfo {
        const a = new AbiInfo();
        const obj = JSON.parse(json);
        a.hash = obj.hash;
        a.entrypoint = obj.entrypoint;
        a.functions = obj.functions;

        return a;
    }

    hash: string;
    entrypoint: string;
    functions: AbiFunction[] = [];

    getHash(): string {
        return this.hash;
    }

    getEntryPoint(): string {
        return this.entrypoint;
    }

    getFunction(name: string): AbiFunction {
        for (const v of this.functions) {
            if (v.name === name) {
                const parameters = v.parameters.map((p: any) => new Parameter(p.name, p.type, ''));
                return new AbiFunction(v.name, v.returntype, parameters);
            }
        }
        throw Error('not found');
    }
}
