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

