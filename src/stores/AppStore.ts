/* eslint-disable camelcase */
import { flow, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { BaseStore } from '.';
import { PersistDataStore } from './RootStore';

export default class AppStore extends BaseStore implements PersistDataStore {
  hydrateStore = (hydrate: Function) => hydrate('appStore', this);

  @persist
  @observable
  storesHydrated = false;

  appDidMount = flow(function* (this: AppStore) {
    const { hydrateStores } = this.rootStore;
    yield hydrateStores();
    this.storesHydrated = true;
  }).bind(this);
}
