import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";

export interface ISerializedSettingStore {
	tradeTableSize: string | null;
}

class SettingsStore {
	public readonly rootStore: RootStore;

	constructor(rootStore: RootStore, initState?: ISerializedSettingStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
		if (initState != null) {
			this.setTradeTableSize(initState.tradeTableSize);
		}
	}

	depositModalOpened: boolean = false;
	setDepositModal = (s: boolean) => (this.depositModalOpened = s);

	tradeTableSize: string | null = null;
	setTradeTableSize = (v: string | null) => (this.tradeTableSize = v);

	serialize = (): ISerializedSettingStore => ({
		tradeTableSize: this.tradeTableSize,
	});
}

export default SettingsStore;
