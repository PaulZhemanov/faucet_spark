import BigNumber from "bignumber.js";
import { BigNumber as EthersBigNumber } from "@ethersproject/bignumber";

type TValue = BN | EthersBigNumber | BigNumber.Value;
const bigNumberify = (n: any): string | number => {
    if (n && n.toString) {
        const primitive = n.toString();

        if (typeof primitive !== "object") {
            return primitive;
        }
    }

    return n;
};
class BN extends BigNumber {
    constructor(n: TValue, base?: number) {
        super(bigNumberify(n), base);
    }
    static formatUnits(value: TValue, decimals = 8): BN {
        return new BN(value).div(new BN(10).pow(decimals));
    }
    static ZERO = new BN(0);

    static parseUnits(value: TValue, decimals = 8): BN {
        return new BN(10).pow(decimals).times(bigNumberify(value));
    }

}

export default BN;
