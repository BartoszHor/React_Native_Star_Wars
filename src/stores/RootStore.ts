/* eslint-disable no-underscore-dangle */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, IHydrateResult } from 'mobx-persist';

import { AlertStore, NavigationStore } from '.';

const pullState = create({ storage: AsyncStorage });

export interface Stores {
  alertStore: AlertStore;
  navigationStore: NavigationStore;
}

export interface PersistDataStore {
  hydrateStore: (
    hydrate: <T extends Object>(
      key: string,
      store: T,
      initialState?: any,
    ) => IHydrateResult<T>,
  ) => Promise<Object>;
}
function implementsPersistDataStore(store: any): store is PersistDataStore {
  return 'hydrateStore' in store;
}
function persistDataStores(stores: Stores) {
  return Object.values(stores).filter(implementsPersistDataStore);
}

const stores = (store: RootStore): Stores => ({
  alertStore: new AlertStore(store),
  navigationStore: new NavigationStore(store),
});

class RootStore {
  stores: Stores = stores(this);

  hydrateStores = () => {
    return Promise.all(
      persistDataStores(this.stores).map((store) =>
        store.hydrateStore(pullState),
      ),
    );
  };
}

export default RootStore;
