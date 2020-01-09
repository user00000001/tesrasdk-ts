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

import { Account } from '../src/account';
import { Claim, RevocationType } from '../src/claim/claim';
import { Address, PrivateKey } from '../src/crypto';
import { Identity } from '../src/identity';
import { WebsocketClient } from '../src/network/websocket/websocketClient';
import { buildRegisterTstidTx } from '../src/smartcontract/nativevm/tstidContractTxBuilder';
import { addSign, signTransaction } from '../src/transaction/transactionBuilder';

describe('test claim', () => {
    const restUrl = 'http://dapp1.tesra.me:25770';

    const privateKey = PrivateKey.random();
    const publicKey = privateKey.getPublicKey();
    const account = Account.create(privateKey, '123456', '');
    const identity = Identity.create(privateKey, '123456', '');
    const tstId =  identity.tstId;
    const address = account.address;
    const publicKeyId = tstId + '#keys-1';

    const adminPrivateKey = new PrivateKey('7c47df9664e7db85c1308c080f398400cb24283f5d922e76b478b5429e821b97');
    const adminAddress = new Address('AdLUBSSHUuFaak9j169hiamXUmPuCTnaRz');

    let serialized: string;
    let signed: string;

    // tslint:disable:no-console
    console.log('did:' + tstId);
    /**
     * Registers new TST ID to create transaction with Events and new block
     */
    beforeAll(async () => {
        const tx = buildRegisterTstidTx(tstId, publicKey, '500', '30000');
        tx.payer = adminAddress;
        signTransaction(tx, adminPrivateKey);
        addSign(tx, privateKey);

        const client = new WebsocketClient();
        await client.sendRawTransaction(tx.serialize(), false, true);
    }, 10000);

    test('test serialization', () => {
        const claim = new Claim({
            messageId: '1',
            issuer: tstId,
            subject: tstId,
            issuedAt: 1525800823
        }, undefined, false);
        claim.version = '0.7.0';
        claim.context = 'https://example.com/template/v1';
        claim.content = {
            Name: 'Bob Dylan',
            Age: '22'
        };
        claim.revocation = {
            type: RevocationType.AttestContract,
            addr: '8055b362904715fd84536e754868f4c8d27ca3f6'
        };

        serialized = claim.serialize();

        expect(serialized).toBeDefined();

    });

    test('test deserialization', async () => {
        const msg = Claim.deserialize(serialized);

        expect(msg.metadata.messageId).toEqual('1');
        expect(msg.metadata.issuer).toEqual(tstId);
        expect(msg.metadata.subject).toEqual(tstId);
        expect(msg.metadata.issuedAt).toEqual(1525800823);
        expect(msg.signature).toBeUndefined();
        expect(msg.version).toEqual('0.7.0');
        expect(msg.context).toEqual('https://example.com/template/v1');
        expect(msg.content.Name).toEqual('Bob Dylan');
        expect(msg.content.Age).toEqual('22');
        expect(msg.revocation.type).toEqual(RevocationType.AttestContract);
        expect(msg.revocation.addr).toEqual('8055b362904715fd84536e754868f4c8d27ca3f6');
        expect(msg.revocation.url).toBeUndefined();
    });

    test('test signature', async () => {
        const claim = new Claim({
            messageId: '1',
            issuer: tstId,
            subject: tstId,
            issuedAt: 1525800823
        }, undefined, false);
        claim.version = '0.7.0';
        claim.context = 'https://example.com/template/v1';
        claim.content = {
            Name: 'Bob Dylan',
            Age: '22'
        };
        claim.revocation = {
            type: RevocationType.AttestContract,
            addr: '8055b362904715fd84536e754868f4c8d27ca3f6'
        };

        await claim.sign(restUrl, publicKeyId, privateKey);

        signed = claim.serialize();

        expect(claim.signature).toBeDefined();
    });

    test('test verify', async () => {
        const msg = Claim.deserialize(signed);

        const result = await msg.verify(restUrl, false);

        expect(result).toBeTruthy();
    });

    test('test verify with missing attest', async () => {
        const msg = Claim.deserialize(signed);

        const result = await msg.verify(restUrl, true);

        expect(result).toBeFalsy();
    });
    test('claim', async () => {
        const restUrl = 'http://dapp1.tesra.me:25770';
        const tstId = 'did:tst:AN88DMMBZr5X9ChpMHX3LqRvQHqGxk2c3r';
        const publicKeyId = tstId + '#keys-1';
        const privateKey = new PrivateKey('4a8d6d61060998cf83acef4d6e7976d538b16ddeaa59a96752a4a7c0f7ec4860');
        const claim = new Claim({
            messageId: '1',
            issuer: tstId,
            subject: tstId,
            issuedAt: 1525800823
        }, undefined, false);
        claim.version = '0.7.0';
        claim.context = 'https://example.com/template/v1';
        claim.content = {
            Name: 'Bob Dylan',
            Age: '22'
        };
        claim.revocation = {
            type: RevocationType.AttestContract,
            addr: '8055b362904715fd84536e754868f4c8d27ca3f6'
        };
        await claim.sign(restUrl, publicKeyId, privateKey);
        const socketUrl = 'ws://dapp1.tesra.me:25771';
        const res = await claim.attest(socketUrl, '500', '20000', adminAddress, adminPrivateKey);
        console.log(res);

        const signed = claim.serialize();

        const msg = Claim.deserialize(signed);
        const result = await msg.verify(restUrl, false);

        console.log('Info: ', signed, result, claim);
    });
});
