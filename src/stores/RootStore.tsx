import {makeAutoObservable} from "mobx";
import AccountStore, {ISerializedAccountStore} from "@stores/AccountStore";
import NotificationStore from "@stores/NotificationStore";
import SettingsStore, {ISerializedSettingStore} from "@stores/SettingsStore";

export interface ISerializedRootStore {
    accountStore?: ISerializedAccountStore;
    settingStore?: ISerializedSettingStore;



}
export default class RootStore {
    public accountStore: AccountStore;
    public notificationStore: NotificationStore;
    public settingsStore: SettingsStore;


    constructor(initState?: ISerializedRootStore) {
        this.accountStore = new AccountStore(this, initState?.accountStore);
        this.notificationStore = new NotificationStore(this);
        this.settingsStore = new SettingsStore(this, initState?.settingStore);
        makeAutoObservable(this);
    }

    serialize = (): ISerializedRootStore => ({
        accountStore: this.accountStore.serialize(),
        settingStore: this.settingsStore.serialize(),

    });
}
