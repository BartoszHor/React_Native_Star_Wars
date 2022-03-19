/* eslint-disable camelcase */
import { flow, observable, action } from 'mobx';
import { BaseStore } from '.';
export default class AppStore extends BaseStore {
  @observable
  storesHydrated = false;

  @observable
  loading: boolean | null = null;

  @action
  showLoading = () => {
    this.loading = true;
  };

  @action
  hideLoading = () => {
    this.loading = false;
  };

  appDidMount = flow(function* (this: AppStore) {
    const { hydrateStores } = this.rootStore;
    yield hydrateStores();
    this.storesHydrated = true;
  }).bind(this);
}
