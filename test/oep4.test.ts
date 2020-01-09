import { BigNumber } from 'bignumber.js';
import { Account } from '../src';
import RestClient from '../src/network/rest/restClient';
import { Address } from './../src/crypto/address';
import { PrivateKey } from './../src/crypto/PrivateKey';
import { WebsocketClient } from './../src/network/websocket/websocketClient';
import { Oep4State, Oep4TxBuilder } from './../src/smartcontract/neovm/oep4TxBuilder';
import { addSign, signTransaction } from './../src/transaction/transactionBuilder';
import { hexstr2str, reverseHex } from './../src/utils';
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

describe('test oep4', () => {
    const private1 = new PrivateKey('5f2fe68215476abb9852cfa7da31ef00aa1468782d5ca809da5c4e1390b8ee45');
    const private2 = new PrivateKey('49855b16636e70f100cc5f4f42bc20a6535d7414fb8845e7310f8dd065a97221');
    const private3 = new PrivateKey('1094e90dd7c4fdfd849c14798d725ac351ae0d924b29a279a9ffa77d5737bd96');

    const address1 = new Address('AQf4Mzu1YJrhz9f3aRkkwSm9n3qhXGSh4p');
    const address2 = new Address('AXK2KtCfcJnSMyRzSwTuwTKgNrtx5aXfFX');
    const address3 = new Address('AVXf5w8WD2y6jV1Lzi36oSKYNif1C7Surc');

    const codeHash = '78ac3965410c552609b691bbfe30469110c71485';

    const contractAddr = new Address(reverseHex(codeHash));
    const oep4 = new Oep4TxBuilder(contractAddr);
    const gasPrice = '500';
    const gasLimit = '200000';
    // const url = TEST_TST_URL.REST_URL;
    const url = 'http://dapp1.tesra.me:';
    const restClient = new RestClient(url + '25770');
    const socketClient = new WebsocketClient(url + '25771');

    test('init', async () => {
        const tx = oep4.init(gasPrice, gasLimit, address1);
        signTransaction(tx, private1);
        const response = await socketClient.sendRawTransaction(tx.serialize(), false, true);
        // tslint:disable:no-console
        console.log(JSON.stringify(response));
        expect(response.Result.State).toEqual(1);
    });

    test('getBalance', async () => {
        const tx = oep4.queryBalanceOf(address1);
        const res = await restClient.sendRawTransaction(tx.serialize(), true);
        const val = res.Result.Result ? parseInt(reverseHex(res.Result.Result), 16) : 0;
        // tslint:disable-next-line:no-console
        console.log(val);
        expect(val).toBeGreaterThan(0);
    });

    test('1_test_transfer', async () => {
        const tx = oep4.makeTransferTx(address1, address2, '10000', gasPrice, gasLimit, address1);
        signTransaction(tx, private1);
        const response = await socketClient.sendRawTransaction(tx.serialize(), false, true);
        // tslint:disable:no-console
        console.log(JSON.stringify(response));
        expect(response.Result.State).toEqual(1);
    }, 10000);

    test('test_totalSupply', async () => {
        const tx = oep4.queryTotalSupply();
        const res = await restClient.sendRawTransaction(tx.serialize(), true);
        console.log(res);
        const val = parseInt(reverseHex(res.Result.Result), 16);
        // tslint:disable-next-line:no-console
        expect(val).toBeGreaterThan(0);
    }, 10000);

    test('test_name', async () => {
        const tx = oep4.queryName();
        const res = await restClient.sendRawTransaction(tx.serialize(), true);
        console.log('res: ' + JSON.stringify(res));
        if (!res.Result.Result) {
            return;
        }
        const val = hexstr2str(res.Result.Result);
        console.log(val);
        // tslint:disable-next-line:no-console
        expect(val).toBeDefined();
    }, 10000);

    test('test_symbol', async () => {
        const tx = oep4.querySymbol();
        const res = await restClient.sendRawTransaction(tx.serialize(), true);
        const val = hexstr2str(res.Result.Result);
        // tslint:disable-next-line:no-console
        console.log(val);
        expect(val).toBeDefined();
    });

    test('test_decimals', async () => {
        const tx = oep4.queryDecimals();
        const res = await restClient.sendRawTransaction(tx.serialize(), true);
        console.log(res);
        const val = res.Result;
        console.log(val);
        if (val.Result) {
            console.log('decimal:' + parseInt(val.Result, 16));
        }
        // tslint:disable-next-line:no-console
        expect(val).toBeTruthy();
    }, 10000);

    test('test_approve', async () => {
        const tx = oep4.makeApproveTx(address1, address3, '10000', gasPrice, gasLimit, address1);
        signTransaction(tx, private1);
        const response = await socketClient.sendRawTransaction(tx.serialize(), false, true);
        // tslint:disable:no-console
        console.log(JSON.stringify(response));
        expect(response.Result.State).toEqual(1);
    });

    test('test_queryAllowance', async () => {
        const tx = oep4.makeQueryAllowanceTx(address1, address3);
        const res = await restClient.sendRawTransaction(tx.serialize(), true);
        console.log(res);
        const val = res.Result.Result ? parseInt(reverseHex(res.Result.Result), 16) : 0;
        console.log(val);
        // tslint:disable-next-line:no-console
        expect(val).toEqual(10000);
    });

    test('test_transferFrom', async () => {
        const tx = oep4.makeTransferFromTx(address3, address1, address3, '10000', gasPrice, gasLimit, address3);
        signTransaction(tx, private3);
        const response = await socketClient.sendRawTransaction(tx.serialize(), false, true);
        // tslint:disable:no-console
        console.log(JSON.stringify(response));
        expect(response.Result.State).toEqual(1);
    });

    test('test_transferMulti', async () => {
        const state1 = new Oep4State(address1, address2, '200');
        const state2 = new Oep4State(address1, address3, '300');
        const tx = oep4.makeTransferMultiTx([state1, state2], gasPrice, gasLimit, address2);
        signTransaction(tx, private2);
        addSign(tx, private1);
        // addSign(tx, private1);
        const response = await socketClient.sendRawTransaction(tx.serialize(), false, true);
        // tslint:disable:no-console
        console.log(JSON.stringify(response));
        expect(response.Result.State).toEqual(1);
    });

    test('bigDecimal_oep4_transfer', async () => {
        const newOep4 = new Oep4TxBuilder(new Address(reverseHex('55e02438c938f6f4eb15a9cb315b26d0169b7fd7')));
        const tx = newOep4.makeTransferTx(address1, address2,
            '65530', gasPrice, gasLimit, address1);
        signTransaction(tx, private1);
        const response = await socketClient.sendRawTransaction(tx.serialize(), false, true);
        // tslint:disable:no-console
        console.log(JSON.stringify(response));
        const notify = response.Result.Notify.find((item) => item.ContractAddress !== '0200000000000000000000000000000000000000');
        if (notify) {
            const val = new BigNumber(reverseHex(notify.States[3]), 16).toString();
            console.log('val: ', val);
        }

        const tx2 = newOep4.queryBalanceOf(address2);
        const res = await restClient.sendRawTransaction(tx2.serialize(), true);
        console.log('balance after transfer: ', res.Result);
        const val2 = res.Result.Result ? new BigNumber(reverseHex(res.Result.Result), 16).toString() : 0;
        console.log('balance : ', val2);
    }, 10000);
});
