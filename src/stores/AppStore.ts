/* eslint-disable camelcase */
import { flow, observable, action } from 'mobx';
import { BaseStore } from '.';
export default class AppStore extends BaseStore {
  @observable
  loading: boolean | null = null;

  @observable
  modalVisable = false;

  @action
  setModalVisable = () => {
    this.modalVisable = true;
  };

  @action
  setModalInvisable = () => {
    this.modalVisable = false;
  };

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
  }).bind(this);
}
