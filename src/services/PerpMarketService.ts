import {
	// ACCOUNT_BALANCE_INDEXER,
	IToken,
	// PERP_MARKET_INDEXER,
	TOKENS_BY_ASSET_ID,
	TOKENS_BY_SYMBOL,
} from "@src/constants";
import BN from "@src/utils/BN";
// import makeIndexerRequest from "@src/utils/makeIndexerRequest";

interface IPerpPriceResponse {
	id: string;
	mark_price: number;
	market_price: number;
	token: string;
}

interface IPerpOrderResponse {
	active: boolean;
	base_size: string;
	base_token: string;
	id: string;
	order_price: number;
	order_id: string;
	trader: string;
}

interface IPerpTradeResponse {
	id: string;
	matcher: string;
	price: number;
	token: string;
	trade_amount: number;
	trade_value: number;
}

export class PerpMarketPrice {
	symbol: string;
	id: string;
	markPrice: BN;
	marketPrice: BN;
	tokenId: string;

	constructor(priceOutput: IPerpPriceResponse) {
		this.id = priceOutput.id;
		this.tokenId = `0x${priceOutput.token}`;
		const token = TOKENS_BY_ASSET_ID[this.tokenId];
		this.symbol = `${token.symbol}-PERP`;
		this.id = priceOutput.id;
		this.markPrice = new BN(priceOutput.mark_price);
		this.marketPrice = new BN(priceOutput.market_price);
	}

	get token(): IToken {
		return TOKENS_BY_ASSET_ID[this.tokenId];
	}
}

// export const getPerpMarketPrices = async (): Promise<Record<string, PerpMarketPrice>> => {
// 	const query = `SELECT json_agg(t) FROM (SELECT * FROM composabilitylabs_perp_market_indexer.priceentity) t;`;
// 	const res = await makeIndexerRequest(query, ACCOUNT_BALANCE_INDEXER);z
// 	return res?.data.data[0] != null
// 		? res.data.data[0]
// 				.map((price: IPerpPriceResponse): PerpMarketPrice => new PerpMarketPrice(price))
// 				.reduce(
// 					(acc: PerpMarketPrice[], val: PerpMarketPrice) => ({
// 						...acc,
// 						[val.symbol]: val,
// 					}),
// 					{} as Record<string, PerpMarketPrice>,
// 				)
// 		: {};
// };

export class PerpTrade {
	id: string;
	matcher: string;
	price: BN;
	tokenId: string;
	trade_amount: BN;
	trade_value: BN;
	marketSymbol: string;

	//todo how to undestand if its a short or long
	constructor(tradeOutput: IPerpTradeResponse) {
		this.id = tradeOutput.id;
		this.matcher = tradeOutput.matcher;
		this.price = new BN(tradeOutput.price.toString());
		this.tokenId = `0x${tradeOutput.token}`;
		this.trade_amount = new BN(tradeOutput.trade_amount.toString());
		this.trade_value = new BN(tradeOutput.trade_value.toString());
		const token = TOKENS_BY_ASSET_ID[this.tokenId];
		this.marketSymbol = `${token.symbol}-PERP`;
	}

	get token(): IToken {
		return TOKENS_BY_ASSET_ID[this.tokenId];
	}

	get formattedPrice(): BN {
		return BN.formatUnits(this.price, TOKENS_BY_SYMBOL.USDC.decimals);
	}

	get formattedTradeAmount(): BN {
		return BN.formatUnits(this.trade_amount, this.token.decimals);
	}
}

// export const getPerpTrades = async (): Promise<PerpTrade[]> => {
// 	//todo get latest for trades
// 	const query = `SELECT json_agg(t) FROM (SELECT * FROM composabilitylabs_perp_market_indexer.tradeentity) t;`;
// 	const res = await makeIndexerRequest(query, ACCOUNT_BALANCE_INDEXER);
// 	return res?.data.data[0] != null
// 		? res.data.data[0].map((trade: IPerpTradeResponse): PerpTrade => new PerpTrade(trade))
// 		: [];
// };

export class PerpOrder {
	active: boolean;
	baseSize: BN;
	baseToken: string;
	id: string;
	orderPrice: BN;
	trader: string;
	marketSymbol: string;
	orderId: string;

	constructor(orderOutput: IPerpOrderResponse) {
		this.active = orderOutput.active;
		this.baseSize = new BN(orderOutput.base_size);
		this.baseToken = `0x${orderOutput.base_token}`;
		this.id = orderOutput.id;
		this.orderPrice = new BN(orderOutput.order_price);
		this.trader = orderOutput.trader;
		const token = TOKENS_BY_ASSET_ID[this.baseToken];
		this.marketSymbol = `${token.symbol}-PERP`;
		this.orderId = orderOutput.order_id;
	}

	get token(): IToken {
		return TOKENS_BY_ASSET_ID[this.baseToken];
	}

	get formattedSize(): BN {
		return BN.formatUnits(this.baseSize, this.token.decimals);
	}

	get formattedPrice(): BN {
		return BN.formatUnits(this.orderPrice, TOKENS_BY_SYMBOL.USDC.decimals);
	}

	get formattedTotal(): BN {
		return this.formattedSize.times(this.formattedPrice);
	}
}

// export const getUserPerpOrders = async (address: string): Promise<PerpOrder[]> => {
// 	const query = `SELECT json_agg(t) FROM (SELECT * FROM composabilitylabs_perp_market_indexer.orderentity WHERE trader = '${address}' AND active = true  ) t;`;
// 	const res = await makeIndexerRequest(query, PERP_MARKET_INDEXER);
// 	return res?.data.data[0] != null
// 		? res?.data.data[0].map((order: IPerpOrderResponse): PerpOrder => new PerpOrder(order))
// 		: [];
// };
//
// export const getPerpOrders = async (): Promise<PerpOrder[]> => {
// 	const query = `SELECT json_agg(t) FROM (SELECT * FROM composabilitylabs_perp_market_indexer.orderentity WHERE active = true ) t;`;
// 	const res = await makeIndexerRequest(query, PERP_MARKET_INDEXER);
// 	return res?.data.data[0] != null
// 		? res?.data.data[0].map((order: IPerpOrderResponse): PerpOrder => new PerpOrder(order))
// 		: [];
// };
