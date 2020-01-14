import { Address, PublicKey } from '../../crypto';
import { DDOAttribute } from '../../transaction/ddo';
import { Transaction } from '../../transaction/transaction';
/**
 * Address of TST ID contract
 */
export declare const TSTID_CONTRACT = "0000000000000000000000000000000000000003";
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
export declare function buildRegisterTstidTx(tstId: string, publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
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
export declare function buildRegIdWithAttributes(tstId: string, attributes: DDOAttribute[], publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
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
export declare function buildAddAttributeTx(tstId: string, attributes: DDOAttribute[], publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
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
export declare function buildRemoveAttributeTx(tstId: string, key: string, publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Queries attributes attached to TST ID.
 *
 * @param tstId User's TST ID
 */
export declare function buildGetAttributesTx(tstId: string): Transaction;
/**
 * Queries Description Object of TST ID(DDO).
 *
 * @param tstId User's TST ID
 */
export declare function buildGetDDOTx(tstId: string): Transaction;
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
export declare function buildAddControlKeyTx(tstId: string, newPk: PublicKey, userKey: PublicKey | Address, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
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
export declare function buildRemoveControlKeyTx(tstId: string, pk2Remove: PublicKey, sender: PublicKey | Address, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Queries public keys attached to TST ID.
 *
 * @param tstId User's TST ID
 */
export declare function buildGetPublicKeysTx(tstId: string): Transaction;
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
export declare function buildAddRecoveryTx(tstId: string, recovery: Address, publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
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
export declare function buildChangeRecoveryTx(tstId: string, newrecovery: Address, oldrecovery: Address, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Queries the state of the public key associated with TST ID.
 *
 * @param tstId user's TST ID
 * @param pkId User's public key Id
 */
export declare function buildGetPublicKeyStateTx(tstId: string, pkId: number): Transaction;
