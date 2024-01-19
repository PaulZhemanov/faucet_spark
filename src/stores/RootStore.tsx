import {makeAutoObservable} from "mobx";
import AccountStore, {ISerializedAccountStore} from "@stores/AccountStore";
import NotificationStore from "@stores/NotificationStore";
import SettingsStore, {ISerializedSettingStore} from "@stores/SettingsStore";
import TradeStore, {ISerializedTradeStore} from "@stores/TradeStore";

export interface ISerializedRootStore {
    accountStore?: ISerializedAccountStore;
    settingStore?: ISerializedSettingStore;
    tradeStore?: ISerializedTradeStore;



}
export default class RootStore {
    public accountStore: AccountStore;
    public notificationStore: NotificationStore;
    public settingsStore: SettingsStore;
    public tradeStore: TradeStore;


    constructor(initState?: ISerializedRootStore) {
        this.accountStore = new AccountStore(this, initState?.accountStore);
        this.notificationStore = new NotificationStore(this);
        this.settingsStore = new SettingsStore(this, initState?.settingStore);
        this.tradeStore = new TradeStore(this, initState?.tradeStore);



        makeAutoObservable(this);
    }

    serialize = (): ISerializedRootStore => ({
        accountStore: this.accountStore.serialize(),
        settingStore: this.settingsStore.serialize(),
        tradeStore: this.tradeStore.serialize(),

    });
}
