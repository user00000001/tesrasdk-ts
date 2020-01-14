import { Address } from '../../crypto';
import { Transaction } from './../../transaction/transaction';
/**
 * Attests the claim.
 *
 * @param claimId Unique id of the claim
 * @param issuer Issuer's TST ID
 * @param subject Subject's TST ID
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer's address
 */
export declare function buildCommitRecordTx(claimId: string, issuer: string, subject: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
/**
 * Revokes the claim.
 *
 * @param claimId Unique id of the claim
 * @param revokerTstid Revoker's TST ID
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer's address
 */
export declare function buildRevokeRecordTx(claimId: string, revokerTstid: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
/**
 * Queries the state of attest.
 *
 * @param claimId Unique id of the claim
 */
export declare function buildGetRecordStatusTx(claimId: string): Transaction;
