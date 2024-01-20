import RootStore from "@stores/RootStore";
import {makeAutoObservable} from "mobx";
import Balance from "@components/Balance";
import BN from "@src/utils/BN";
import { IToken, NODE_URL, TOKENS_LIST } from "@src/constants";
import { Address, Mnemonic, Provider, Wallet, WalletLocked, WalletUnlocked } from "fuels";

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
    public provider: Provider | null = null;

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

    fuel: any = null;

    getWallet = async (): Promise<WalletLocked | WalletUnlocked | null> => {
        const provider = await Provider.create(NODE_URL);
        if (this.loginType === LOGIN_TYPE.GENERATE_SEED) {
            if (this.seed == null) return null;
            const key = Mnemonic.mnemonicToSeed(this.seed);
            return Wallet.fromPrivateKey(key, provider);
        }
        if (this.address == null || this.fuel == null) return null;
        await this.checkConnectionWithWallet();
        return this.fuel.getWallet(this.address);
    };

    get addressInput(): null | { value: string } {
        if (this.address == null) return null;
        return { value: Address.fromString(this.address).toB256() };
    }
    checkConnectionWithWallet = async () => {
        // if (this.loginType == null || this.loginType === LOGIN_TYPE.GENERATE_SEED) return;
        // if (this.fuel == null) return;
        // const isConnected = await this.fuel.isConnected();
        // if (!isConnected) await this.loginWithWallet(this.loginType);
    };

    updateAccountBalances = async () => {
        if (this.address == null) {
            this.setAssetBalances([]);
            return;
        }
        try {
            const address = Address.fromString(this.address);
            const balances = (await this.provider?.getBalances(address)) ?? [];
            const assetBalances = TOKENS_LIST.map((asset) => {
                const t = balances.find(({ assetId }) => asset.assetId === assetId);
                const balance = t != null ? new BN(t.amount.toString()) : BN.ZERO;
                if (t == null) return new Balance({ balance, usdEquivalent: BN.ZERO, ...asset });

                return new Balance({ balance, ...asset });
            });
            this.setAssetBalances(assetBalances);
        } catch (e) {
            console.log("Balances update error", e);
        }
    };
}
export default AccountStore;
