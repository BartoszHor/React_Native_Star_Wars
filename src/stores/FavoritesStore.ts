/* eslint-disable camelcase */
import { action, observable, computed } from 'mobx';
import { persist } from 'mobx-persist';
import { BaseStore, PersistDataStore } from '.';

export default class FavoritesStore
  extends BaseStore
  implements PersistDataStore
{
  hydrateStore = (hydrate: Function) => hydrate('favoritesStore', this);

  @persist('list')
  @observable
  favoriteCharacters: Array<any> = [];

  @action
  addToFavorites = (index: number) => {
    const { charactersStore } = this.rootStore.stores;
    const character = charactersStore.characters[index];
    if (!this.favoriteCharacters.some(({ name }) => name === character.name)) {
      this.favoriteCharacters.push(character);
    }
  };

  @action
  removeFromFavorites = (index: number) => {
    const {
      navigationStore: { goBack },
    } = this.rootStore.stores;
    this.favoriteCharacters.splice(index, 1);
    if (!this.favoriteCharacters.length) {
      goBack();
    }
  };

  @computed
  get favoriteCharactersLength(): number {
    return this.favoriteCharacters.length;
  }
}
