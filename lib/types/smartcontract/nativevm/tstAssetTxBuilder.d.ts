import { Address } from '../../crypto';
import { Transaction } from '../../transaction/transaction';
import { Transfer } from '../../transaction/transfer';
import { State } from './token';
export declare const TST_CONTRACT = "0000000000000000000000000000000000000001";
export declare const TSG_CONTRACT = "0000000000000000000000000000000000000002";
/**
 * Get the address of native asset contract
 * @param tokenType Token type. Can only be TST or TSG
 */
export declare function getTokenContract(tokenType: string): Address;
/**
 * Verify amount
 * @param amount Amount
 */
export declare function verifyAmount(amount: number | string): void;
/**
 * Creates transaction to transfer native assets.
 * @param tokenType TST or TSG
 * @param from sender's address
 * @param to receiver's address
 * @param amount Amount of amount to transfer
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for transaction's gas.
 */
export declare function makeTransferTx(tokenType: string, from: Address, to: Address, amount: number | string, gasPrice: string, gasLimit: string, payer?: Address): Transfer;
/**
 * transfer from multiple senders to one receiver
 * this tx needs multiple senders' signature.
 * @param tokenType
 * @param from array of senders' address
 * @param to receiver's address
 * @param amounts
 */
export declare function makeTransferStateTx(tokenType: string, states: State[], gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * transfer from one sender to multiple receivers
 * @param tokenType
 * @param from
 * @param to
 * @param amounts
 */
export declare function makeTransferToMany(tokenType: string, from: Address, to: Address[], amounts: string | number[], gasPrice: string, gasLimit: string): Transaction;
/**
 * Withdraw tsg from sender's address and send to receiver's address
 * @param from Sender's address
 * @param to Receiver's address
 * @param amount Amount of TSG to withdraw.The value needs to multiply 1e9 to keep precision
 * @param payer Address to pay for transaction's gas
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeWithdrawTsgTx(from: Address, to: Address, amount: number | string, payer: Address, gasPrice: string, gasLimit: string): Transfer;
/**
 * Creates transaction to query allowance that can be sent from sender to receiver
 * @param asset Asset type. Only TST or TSG.
 * @param from Sender's address
 * @param to Receiver's address
 */
export declare function makeQueryAllowanceTx(asset: string, from: Address, to: Address): Transaction;
/**
 * Creates transaction to query balance.
 * @param asset Token type,tst or tsg
 * @param address Address to query balance
 */
export declare function makeQueryBalanceTx(asset: string, address: Address): Transaction;
export declare function deserializeTransferTx(str: string): Transfer;
