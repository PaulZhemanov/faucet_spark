import {IToken} from "@src/constants";
import BN from "@src/utils/BN";

export interface IAssetBalance extends Omit<IToken, "logo" | "priceFeed"> {
    balance?: BN;
    usdEquivalent?: BN;
    logo?: string;
}
class Balance implements IAssetBalance {
    public readonly assetId: string;
    public readonly name: string;
    public readonly symbol: string;
    public readonly decimals: number;
    public readonly logo?: string;
    public readonly balance?: BN;
    public readonly usdEquivalent?: BN;

    constructor(props: IAssetBalance) {
        this.name = props.name;
        this.assetId = props.assetId;
        this.symbol = props.symbol;
        this.decimals = props.decimals;
        this.logo = props.logo;
        this.balance = props.balance;
        this.usdEquivalent = props.usdEquivalent;
    }
}

export default Balance;
