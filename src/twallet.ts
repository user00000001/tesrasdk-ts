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
import { Account } from './account';
import { DEFAULT_SCRYPT } from './consts';
import { Identity } from './identity';

/**
 * Class to manage Accounts and Identity
 */
export class TWallet {

    static parseJson(json: string): TWallet {
        return TWallet.parseJsonObj(JSON.parse(json));
    }

    /**
     * Deserializes JSON object.
     *
     * Object should be real object, not stringified.
     *
     * @param obj JSON object
     */
    static parseJsonObj(obj: any): TWallet {
        const twallet = new TWallet();
        twallet.name = obj.name;
        twallet.defaultTstid = obj.defaultTstid;
        twallet.defaultAccountAddress = obj.defaultAccountAddress;
        twallet.createTime = obj.createTime;
        twallet.version = obj.version;
        twallet.scrypt = obj.scrypt;
        twallet.identities = obj.identities && (obj.identities as any[]).map((i) => Identity.parseJsonObj(i));
        twallet.accounts = obj.accounts && (obj.accounts as any[]).map((a) => Account.parseJsonObj(a));
        twallet.extra = obj.extra;
        return twallet;
    }

    static fromTWalletFile(obj: any): TWallet {
        const twallet = TWallet.parseJsonObj(obj);
        return twallet;
    }

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
    static create(name: string): TWallet {
        const twallet = new TWallet();
        twallet.name = name;

        // createtime
        twallet.createTime = (new Date()).toISOString();
        twallet.version = '1.0';
        twallet.scrypt = {
            n: DEFAULT_SCRYPT.cost,
            r: DEFAULT_SCRYPT.blockSize,
            p: DEFAULT_SCRYPT.parallel,
            dkLen: DEFAULT_SCRYPT.size
        };

        return twallet;
    }

    name: string;
    defaultTstid: string = '';
    defaultAccountAddress: string = '';
    createTime: string;
    version: string;
    scrypt: {
        n: number;
        r: number;
        p: number;
        dkLen: number;
    };
    identities: Identity[] = [];
    accounts: Account[] = [];
    extra: null;

    addAccount(account: Account): void {
        for (const ac of this.accounts) {
            if (ac.address.toBase58() === account.address.toBase58()) {
                return;
            }
        }
        this.accounts.push(account);
    }

    addIdentity(identity: Identity): void {
        for (const item of this.identities) {
            if (item.tstId === identity.tstId) {
                return;
            }
        }
        this.identities.push(identity);
    }

    setDefaultAccount(address: string): void {
        this.defaultAccountAddress = address;
    }

    setDefaultIdentity(tstId: string): void {
        this.defaultTstid = tstId;
    }

    toJson(): string {
        return JSON.stringify(this.toJsonObj());
    }

    /**
     * Serializes to JSON object.
     *
     * Returned object will not be stringified.
     *
     */
    toJsonObj(): any {
        const obj = {
            name: this.name,
            defaultTstid: this.defaultTstid,
            defaultAccountAddress: this.defaultAccountAddress,
            createTime: this.createTime,
            version: this.version,
            scrypt: this.scrypt,
            identities: this.identities.map((i) => i.toJsonObj()),
            accounts: this.accounts.map((a) => a.toJsonObj()),
            extra: null
        };

        return obj;
    }

    signatureData(): string {
        return '';
    }

    /*
    *generate a twallet file that is compatible with cli twallet.
    */
    toTWalletFile(): any {
        const obj = this.toJsonObj();
        return obj;
    }
}
