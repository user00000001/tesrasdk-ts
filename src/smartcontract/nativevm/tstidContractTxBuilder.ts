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
import { Address, PublicKey } from '../../crypto';
import { DDOAttribute } from '../../transaction/ddo';
import { Transaction } from '../../transaction/transaction';
import { makeNativeContractTx } from '../../transaction/transactionUtils';
import { num2hexstring, str2hexstr } from '../../utils';
import { buildNativeCodeScript } from '../abi/nativeVmParamsBuilder';
import Struct from '../abi/struct';

/**
 * Address of TST ID contract
 */
export const TSTID_CONTRACT = '0000000000000000000000000000000000000003';

/**
 * Method names in TST ID contract
 */
const TSTID_METHOD  = {
    regIDWithPublicKey: 'regIDWithPublicKey',
    regIDWithAttributes: 'regIDWithAttributes',
    addAttributes: 'addAttributes',
    removeAttribute: 'removeAttribute',
    getAttributes: 'getAttributes',
    getDDO: 'getDDO',
    addKey: 'addKey',
    removeKey: 'removeKey',
    getPublicKeys: 'getPublicKeys',
    addRecovery: 'addRecovery',
    changeRecovery: 'changeRecovery',
    getKeyState: 'getKeyState'
};

/**
 * Registers Identity.
 *
 * GAS calculation: gasLimit * gasPrice is equal to the amount of gas consumed.
 *
 * @param tstId User's TST ID
 * @param publicKey Public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export function buildRegisterTstidTx(
    tstId: string,
    publicKey: PublicKey,
    gasPrice: string,
    gasLimit: string,
    payer?: Address
): Transaction {
    const method = TSTID_METHOD.regIDWithPublicKey;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }
    const struct = new Struct();
    struct.add(tstId, publicKey.serializeHex());
    const list = [struct];
    const params = buildNativeCodeScript(list);

    const tx = makeNativeContractTx(
        method,
        params,
        new Address(TSTID_CONTRACT),
        gasPrice,
        gasLimit,
        payer
    );

    return tx;
}

/**
 * Registers Identity with initial attributes.
 *
 * @param tstId User's TST ID
 * @param attributes Array of DDOAttributes
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export function buildRegIdWithAttributes(
    tstId: string,
    attributes: DDOAttribute[],
    publicKey: PublicKey,
    gasPrice: string,
    gasLimit: string,
    payer?: Address
) {
    const method = TSTID_METHOD.regIDWithAttributes;
    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    // let attrs = '';
    // for (const a of attributes) {
    //     attrs += a.serialize();
    // }

    // const p1 = new Parameter(f.parameters[0].getName(), ParameterType.ByteArray, tstId);
    // const p2 = new Parameter(f.parameters[1].getName(), ParameterType.ByteArray, publicKey.serializeHex());
    // const p3 = new Parameter(f.parameters[2].getName(), ParameterType.ByteArray, attrs);
    // f.setParamsValue(p1, p2, p3);
    const attrLen = attributes.length;
    const struct = new Struct();
    struct.add(tstId, publicKey.serializeHex(), attrLen);
    for (const a of attributes) {
        const key = str2hexstr(a.key);
        const type = str2hexstr(a.type);
        const value = str2hexstr(a.value);
        struct.add(key, type, value);
    }
    const params = buildNativeCodeScript([struct]);
    const tx = makeNativeContractTx(
        method,
        params,
        new Address(TSTID_CONTRACT),
        gasPrice,
        gasLimit,
        payer
    );

    return tx;
}

/**
 * Adds attributes to TST ID.
 *
 * @param tstId User's TST ID
 * @param attributes Array of DDOAttributes
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export function buildAddAttributeTx(
    tstId: string,
    attributes: DDOAttribute[],
    publicKey: PublicKey,
    gasPrice: string,
    gasLimit: string,
    payer?: Address
): Transaction {
    const method = TSTID_METHOD.addAttributes;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }
    const struct = new Struct();
    struct.add(tstId, attributes.length);
    for (const a of attributes) {
        const key = str2hexstr(a.key);
        const type = str2hexstr(a.type);
        const value = str2hexstr(a.value);
        struct.add(key, type, value);
    }
    struct.list.push(publicKey.serializeHex());
    const params = buildNativeCodeScript([struct]);

    const tx = makeNativeContractTx(
        method,
        params,
        new Address(TSTID_CONTRACT),
        gasPrice,
        gasLimit,
        payer
    );
    return tx;
}

/**
 * Removes attribute from TST ID.
 *
 * @param tstId User's TST ID
 * @param key Key of attribute to remove
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 *
 */
export function buildRemoveAttributeTx(
    tstId: string,
    key: string,
    publicKey: PublicKey,
    gasPrice: string,
    gasLimit: string,
    payer?: Address
): Transaction {
    const method = TSTID_METHOD.removeAttribute;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    const struct = new Struct();
    struct.add(tstId, str2hexstr(key), publicKey.serializeHex());
    const params = buildNativeCodeScript([struct]);
    const tx = makeNativeContractTx(
        method,
        params,
        new Address(TSTID_CONTRACT),
        gasPrice,
        gasLimit,
        payer
    );
    return tx;
}

/**
 * Queries attributes attached to TST ID.
 *
 * @param tstId User's TST ID
 */
export function buildGetAttributesTx(tstId: string) {
    const method = TSTID_METHOD.getAttributes;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    const struct = new Struct();
    struct.add(tstId);
    const params = buildNativeCodeScript([struct]);

    const tx = makeNativeContractTx(method, params, new Address(TSTID_CONTRACT));
    return tx;
}

/**
 * Queries Description Object of TST ID(DDO).
 *
 * @param tstId User's TST ID
 */
export function buildGetDDOTx(tstId: string) {
    const method = TSTID_METHOD.getDDO;
    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    const struct = new Struct();
    struct.add(tstId);
    const params = buildNativeCodeScript([struct]);
    const tx = makeNativeContractTx(method, params, new Address(TSTID_CONTRACT));
    return tx;
}
/**
 * Adds a new public key to TST ID.
 *
 * @param tstId User's TST ID
 * @param newPk New public key to be added
 * @param userKey User's public key or address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export function buildAddControlKeyTx(
    tstId: string,
    newPk: PublicKey,
    userKey: PublicKey | Address,
    gasPrice: string,
    gasLimit: string,
    payer?: Address
): Transaction {
    const method = TSTID_METHOD.addKey;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    const p1 = tstId;
    const p2 = newPk.serializeHex();
    let p3;
    if (userKey instanceof PublicKey) {
        p3 = userKey.serializeHex();
    } else if (userKey instanceof Address) {
        p3 = userKey.serialize();
    }
    const struct = new Struct();
    struct.add(p1, p2, p3);
    const params = buildNativeCodeScript([struct]);
    const tx = makeNativeContractTx(
        method,
        params,
        new Address(TSTID_CONTRACT),
        gasPrice,
        gasLimit,
        payer
    );

    return tx;
}

/**
 * Revokes a public key from TST ID.
 *
 * @param tstId User's TST ID
 * @param pk2Remove Public key to be removed
 * @param sender User's public key or address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export function buildRemoveControlKeyTx(
    tstId: string,
    pk2Remove: PublicKey,
    sender: PublicKey | Address,
    gasPrice: string,
    gasLimit: string,
    payer?: Address
): Transaction {
    const method = TSTID_METHOD.removeKey;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    const p1 = tstId;
    const p2 = pk2Remove.serializeHex();
    let p3;
    if (sender instanceof PublicKey) {
        p3 = sender.serializeHex();
    } else if (sender instanceof Address) {
        p3 = sender.serialize();
    }
    const struct = new Struct();
    struct.add(p1, p2, p3);
    const params = buildNativeCodeScript([struct]);

    const tx = makeNativeContractTx(
        method,
        params,
        new Address(TSTID_CONTRACT),
        gasPrice,
        gasLimit,
        payer
    );
    return tx;
}

/**
 * Queries public keys attached to TST ID.
 *
 * @param tstId User's TST ID
 */
export function buildGetPublicKeysTx(tstId: string) {
    const method = TSTID_METHOD.getPublicKeys;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }
    const struct = new Struct();
    struct.add(tstId);
    const params = buildNativeCodeScript([struct]);

    const tx = makeNativeContractTx(method, params, new Address(TSTID_CONTRACT));
    return tx;
}

/**
 * Adds recovery address to TST ID.
 *
 * @param tstId User's TST ID
 * @param recovery Recovery address, must have not be set
 * @param publicKey User's public key, must be user's existing public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export function buildAddRecoveryTx(
    tstId: string,
    recovery: Address,
    publicKey: PublicKey,
    gasPrice: string,
    gasLimit: string,
    payer?: Address
): Transaction {
    const method = TSTID_METHOD.addRecovery;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    const p1 = tstId;
    const p2 = recovery;
    const p3 = publicKey.serializeHex();
    const struct = new Struct();
    struct.add(p1, p2, p3);
    const params = buildNativeCodeScript([struct]);
    const tx = makeNativeContractTx(method, params, new Address(TSTID_CONTRACT), gasPrice, gasLimit, payer);
    return tx;
}

/**
 * Changes recovery address of TST ID.
 *
 * This contract call must be initiated by the original recovery address.
 *
 * @param tstId user's TST ID
 * @param newrecovery New recovery address
 * @param oldrecovery Original recoevery address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export function buildChangeRecoveryTx(
    tstId: string,
    newrecovery: Address,
    oldrecovery: Address,
    gasPrice: string,
    gasLimit: string,
    payer?: Address
): Transaction {
    const method = TSTID_METHOD.changeRecovery;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    const p1 = tstId;
    const p2 = newrecovery;
    const p3 = oldrecovery;
    const struct = new Struct();
    struct.add(p1, p2, p3);
    const params = buildNativeCodeScript([struct]);

    const tx = makeNativeContractTx(method, params, new Address(TSTID_CONTRACT),
    gasPrice, gasLimit);
    tx.payer = payer || oldrecovery;
    return tx;
}

/**
 * Queries the state of the public key associated with TST ID.
 *
 * @param tstId user's TST ID
 * @param pkId User's public key Id
 */
export function buildGetPublicKeyStateTx(tstId: string, pkId: number) {
    const method = TSTID_METHOD.getKeyState;

    if (tstId.substr(0, 3) === 'did') {
        tstId = str2hexstr(tstId);
    }

    // tslint:disable-next-line:no-console
    console.log('did: ' + tstId);

    const index = num2hexstring(pkId, 4, true);

    // tslint:disable-next-line:no-console
    console.log('index: ' + index);

    const struct = new Struct();
    struct.add(tstId, pkId);
    const params = buildNativeCodeScript([struct]);

    const tx = makeNativeContractTx(method, params, new Address(TSTID_CONTRACT));
    return tx;
}
