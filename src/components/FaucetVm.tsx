import React, {useMemo} from "react";
import RootStore from "@stores/RootStore";
import {useStores} from "@stores/useStores";
import { TOKENS_BY_ASSET_ID, TOKENS_LIST } from "@src/constants";
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


}

