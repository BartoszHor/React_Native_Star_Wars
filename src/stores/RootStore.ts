/* eslint-disable no-underscore-dangle */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, IHydrateResult } from 'mobx-persist';

import {
  AlertStore,
  NavigationStore,
  AppStore,
  SplashScreenStore,
  CharactersStore,
  FavoritesStore,
  LayoutStore,
} from '.';
const hydrateStores = create({ storage: AsyncStorage });

export interface Stores {
  appStore: AppStore;
  alertStore: AlertStore;
  navigationStore: NavigationStore;
  splashScreenStore: SplashScreenStore;
  charactersStore: CharactersStore;
  favoritesStore: FavoritesStore;
  layoutStore: LayoutStore;
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
  appStore: new AppStore(store),
  alertStore: new AlertStore(store),
  navigationStore: new NavigationStore(store),
  splashScreenStore: new SplashScreenStore(store),
  charactersStore: new CharactersStore(store),
  favoritesStore: new FavoritesStore(store),
  layoutStore: new LayoutStore(store),
});

class RootStore {
  stores: Stores = stores(this);

  hydrateStores = () => {
    return Promise.all(
      persistDataStores(this.stores).map((store) =>
        store.hydrateStore(hydrateStores),
      ),
    );
  };
}

export default RootStore;
