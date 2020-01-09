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

// export const ADDR_VERSION = '41';
export const ADDR_VERSION = '17';

export const DEFAULT_SCRYPT = {
    cost: 4096, // 除以2时间减半
    blockSize: 8,
    parallel: 8,
    size: 64
};

// specified by oep, same as bip38
export const OEP_HEADER = '0142';

export const OEP_FLAG = 'e0';

// Tst://nativeMethod?param1=xxx&param2=yyy
export const WEBVIEW_SCHEME = 'Tst';

export const DEFAULT_ALGORITHM = {
    algorithm: 'ECDSA',
    parameters: {
        curve: 'P-256' // also called secp256r1
    }
};

export const DEFAULT_SM2_ID = '1234567812345678';

export const TEST_NODE = 'dapp4.tesra.me'; // 0.9
// export const TEST_NODE = '192.168.50.74';
// export const TEST_NODE = '127.0.0.1';

export const MAIN_NODE = 'dapp3.tesra.me';

export const HTTP_REST_PORT = '25770';
export const HTTP_WS_PORT = '25771';
export const HTTP_JSON_PORT = '25768';

export const REST_API = {
    getBalance: '/api/v1/balance',
    sendRawTx: '/api/v1/transaction',
    getMerkleProof: '/api/v1/merkleproof' // end with /txHash
};

export const TST_NETWORK = {
    MAIN: 'MainNet',
    TEST: 'TestNet'
};

export const TEST_TST_URL = {
    SOCKET_URL: `ws://${TEST_NODE}:${HTTP_WS_PORT}`,

    RPC_URL: `http://${TEST_NODE}:${HTTP_JSON_PORT}`,

    REST_URL: `http://${TEST_NODE}:${HTTP_REST_PORT}`,

    sendRawTxByRestful: `http://${TEST_NODE}:${HTTP_REST_PORT}${REST_API.sendRawTx}`
};

export const MAIN_TST_URL = {
    SOCKET_URL: `ws://${MAIN_NODE}:${HTTP_WS_PORT}`,

    RPC_URL: `http://${MAIN_NODE}:${HTTP_JSON_PORT}/`,

    REST_URL: `http://${MAIN_NODE}:${HTTP_REST_PORT}/`,

    sendRawTxByRestful: `http://${TEST_NODE}:${HTTP_REST_PORT}${REST_API.sendRawTx}`

};

export const TOKEN_TYPE = {
    TST: 'TST',
    TSG: 'TSG'
};

export const DEFAULT_GAS_LIMIT = 30000;

export const NATIVE_INVOKE_NAME = 'Tesra.Native.Invoke';

export const TX_MAX_SIG_SIZE = 16;

// tslint:disable-next-line:quotemark
export const TST_BIP44_PATH = "m/44'/1024'/0'/0/0";

export const UNBOUND_GENERATION_AMOUNT = [5, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export const UNBOUND_TIME_INTERVAL = 31536000;

export const TST_TOTAL_SUPPLY = 1000000000;

export const GENESIS_BLOCK_TIMESTAMP = 1530316800;
