import { Account } from './account';
import { Identity } from './identity';
/**
 * Class to manage Accounts and Identity
 */
export declare class TWallet {
    static parseJson(json: string): TWallet;
    /**
     * Deserializes JSON object.
     *
     * Object should be real object, not stringified.
     *
     * @param obj JSON object
     */
    static parseJsonObj(obj: any): TWallet;
    static fromTWalletFile(obj: any): TWallet;
    /**
     * @example
     * ```typescript
     *
     * import { TWallet } from 'tesrasdk-ts';
     * const twallet = TWallet.create('test');
     * ```
     *
     * @param name TWallet's name
     */
    static create(name: string): TWallet;
    name: string;
    defaultTstid: string;
    defaultAccountAddress: string;
    createTime: string;
    version: string;
    scrypt: {
        n: number;
        r: number;
        p: number;
        dkLen: number;
    };
    identities: Identity[];
    accounts: Account[];
    extra: null;
    addAccount(account: Account): void;
    addIdentity(identity: Identity): void;
    setDefaultAccount(address: string): void;
    setDefaultIdentity(tstId: string): void;
    toJson(): string;
    /**
     * Serializes to JSON object.
     *
     * Returned object will not be stringified.
     *
     */
    toJsonObj(): any;
    signatureData(): string;
    toTWalletFile(): any;
}
