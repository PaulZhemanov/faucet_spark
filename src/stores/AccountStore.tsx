import RootStore from "@stores/RootStore";
import {makeAutoObservable} from "mobx";
import Balance from "@components/Balance";
import BN from "@src/utils/BN";
import {IToken} from "@src/constants";

export enum LOGIN_TYPE {
    FUEL_WALLET = "Fuel Wallet",
    FUEL_DEV = "Fuel Wallet Development",
    FUELET = "Fuelet Wallet",
    GENERATE_SEED = "Generate seed",
}
export interface ISerializedAccountStore {
    address: string | null;
    loginType: LOGIN_TYPE | null;
    seed: string | null;
}
class AccountStore {
    public readonly rootStore: RootStore;
    constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
    public address: string | null = null;

    get isLoggedIn() {
        return this.address != null;
    }
    getBalance = (token: IToken): BN | null => {
        const balance = this.findBalanceByAssetId(token.assetId);
        if (balance == null) return null;
        return balance.balance ?? BN.ZERO;
    };
    findBalanceByAssetId = (assetId: string) =>
        this.assetBalances && this.assetBalances.find((balance) => balance.assetId === assetId);

    public assetBalances: Balance[] | null = null;
    setAssetBalances = (v: Balance[] | null) => (this.assetBalances = v);

    public loginType: LOGIN_TYPE | null = null;
    seed: string | null = null;

    serialize = (): ISerializedAccountStore => ({
        address: this.address,
        loginType: this.loginType,
        seed: this.seed,
    });

    checkConnectionWithWallet = async () => {
        // if (this.loginType == null || this.loginType === LOGIN_TYPE.GENERATE_SEED) return;
        // if (this.fuel == null) return;
        // const isConnected = await this.fuel.isConnected();
        // if (!isConnected) await this.loginWithWallet(this.loginType);
    };
}
export default AccountStore;
