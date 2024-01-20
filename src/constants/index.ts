import tokens from "./tokens.json";
import tokenLogos from "./tokenLogos";


export const TOKENS_LIST: Array<IToken> = Object.values(tokens).map((t) => ({
    ...t,
    logo: tokenLogos[t.symbol],
}));
export const TOKENS_BY_ASSET_ID: Record<string, IToken> = TOKENS_LIST.reduce(
    (acc, t) => ({ ...acc, [t.assetId]: t }),
    {},
);
export const NODE_URL = "https://beta-4.fuel.network/graphql";

export const FAUCET_URL = "https://faucet-beta-4.fuel.network";
export const TOKENS_BY_SYMBOL: Record<string, IToken> = TOKENS_LIST.reduce((acc, t) => ({ ...acc, [t.symbol]: t }), {});

export interface IToken {
    logo: string;
    assetId: string;
    name: string;
    symbol: string;
    decimals: number;
    priceFeed: string;
}
export const ROUTES = {
    ROOT: "/",
    CONNECT: "/connect",
    TRADE: "/:marketId",
    FAUCET: "/faucet",
};
export const CONTRACT_ADDRESSES = {
    spotMarket: "0xc99fa347474ccd17a9f6304d0978b42f844fd974bfac9df2f2899cb89db1bc84",
    tokenFactory: "0xc3d0426df8a40e7b4803f305537a83e7037be91596c393e7a6b693133f9d7301",
    pyth: "0x2b480dd77abdc48224a22b809608b445604f0de1a999160fb7f126cca2ffc108",
    proxy: "0x36eadaee6e25bd050239834703f3881f91cbc3cb3bb7c96f57483703d8ecba3f",
    accountBalance: "0xcfa7a1e1030c7aaf97fc065dab030fd4d6afd75dc80d35a3b843f0c467f69a2f",
    clearingHouse: "0x0815f30454fe7bafec5b137513a8d1dcb36a4ffa5530217d7e6381352fb2614b",
    insuranceFund: "0x7cdf5bd4cd5b9584517bee34b5fc94abe4790b1e99f1a7f81f40ef824164d103",
    perpMarket: "0x87f7c3ef8c5b36696021c1e355f8946f36a156dfc66d44fd276e35aa950f008e",
    vault: "0xfa8f7e7b7ed37ce7b0b98ac832317298aadb1a3833c5eec7899429c75124762f",
};