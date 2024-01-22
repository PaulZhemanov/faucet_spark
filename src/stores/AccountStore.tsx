import RootStore from "@stores/RootStore";
import {makeAutoObservable} from "mobx";

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
    public loginType: LOGIN_TYPE | null = null;
    seed: string | null = null;
    serialize = (): ISerializedAccountStore => ({
        address: this.address,
        loginType: this.loginType,
        seed: this.seed,
    });
}
export default AccountStore;
