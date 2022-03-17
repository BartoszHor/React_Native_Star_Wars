import { RootStore } from '.';

export default class BaseStore {
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  rootStore: RootStore;
}
