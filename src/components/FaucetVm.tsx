import React, {useMemo} from "react";
import RootStore from "@stores/RootStore";
import {useStores} from "@stores/useStores";
import {TOKENS_BY_ASSET_ID, TOKENS_LIST} from "@src/constants";
import BN from "@src/utils/BN";
import {makeAutoObservable} from "mobx";
import {useVM} from "@src/hooks/useVM";


const ctx = React.createContext<FaucetVM | null>(null);

interface IProps {
    children: React.ReactNode;
}
const availableToMint = ["ETH", "UNI", "USDC"];

export const FaucetVMProvider: React.FC<IProps> = ({ children }) => {
    const rootStore = useStores();
    const store = useMemo(() => new FaucetVM(rootStore), [rootStore]);
    return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useFaucetVM = () => useVM(ctx);

const faucetAmounts: Record<string, number> = {
    ETH: 0.5,
    USDC: 3000,
    BTC: 0.01,
    UNI: 50,
    // LINK: 50,
    // COMP: 5,
};
class FaucetVM {
    public rootStore: RootStore;
    loading: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    initialized: boolean = true;
    actionTokenAssetId: string | null = null;


    get faucetTokens() {
        const { accountStore } = this.rootStore;
        if (accountStore.assetBalances == null) return [];


        return TOKENS_LIST.map((v) => {
            const balance = accountStore.findBalanceByAssetId(v.assetId);
            const mintAmount = new BN(faucetAmounts[v.symbol] ?? 0);
            const formatBalance = BN.formatUnits(balance?.balance ?? BN.ZERO, v.decimals);
            return {
                ...TOKENS_BY_ASSET_ID[v.assetId],
                ...balance,
                formatBalance,
                mintAmount,
                disabled: !availableToMint.includes(v.symbol),
            };
        });
    }
    private _setLoading = (l: boolean) => (this.loading = l);
    setActionTokenAssetId = (l: string | null) => (this.actionTokenAssetId = l);

    mint = async (assetId?: string) => {
        if (assetId == null) return;
        const { accountStore, notificationStore } = this.rootStore;
        await accountStore.checkConnectionWithWallet();
        try {
            this._setLoading(true);
            this.setActionTokenAssetId(assetId);
            // const tokenFactory = CONTRACT_ADDRESSES.tokenFactory;
            const wallet = await accountStore.getWallet();
            if (wallet == null || accountStore.addressInput == null) return;
            const tokenFactoryContract = TokenAbi__factory.connect(tokenFactory, wallet);

            const token = TOKENS_BY_ASSET_ID[assetId];
            const amount = BN.parseUnits(faucetAmounts[token.symbol], token.decimals);
            const hash = hashMessage(token.symbol);
            const identity = { Address: accountStore.addressInput };

            const { transactionResult } = await tokenFactoryContract.functions
                .mint(identity, hash, amount.toString())
                .txParams({ gasPrice: 1 })
                .call();
            if (transactionResult != null) {
                const token = TOKENS_BY_ASSET_ID[assetId];
                this.rootStore.notificationStore.toast(`You have successfully minted ${token.symbol}`, {
                    type: "success",
                });
            }
            await this.rootStore.accountStore.updateAccountBalances();
        } catch (e) {
            const errorText = e?.toString();
            console.log(errorText);
            notificationStore.toast(errorText ?? "", { type: "error" });
        } finally {
            this.setActionTokenAssetId(null);
            this._setLoading(false);
        }
    };

}

