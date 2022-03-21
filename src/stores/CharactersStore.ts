/* eslint-disable camelcase */
import { action, computed, flow, observable } from 'mobx';
import { LayoutAnimation } from 'react-native';
import Config from 'react-native-config';
import { BaseStore } from '.';
import { Localizable } from '../../packages/i18n';
import RestClient from '../repository/RestClient';

export default class CharactersStore extends BaseStore {
  @observable
  initialUrl = Config.API_URL;

  @observable
  nextCharactersUrl = '';

  @observable
  characters: Array<any> = [];

  @observable
  character: any | null = null;

  @observable
  totalCharactersCount: number = 0;

  @action
  setCharacter = (character: any) => {
    this.character = character;
  };

  @action
  resetCharactersStore = () => {
    this.nextCharactersUrl = '';
    this.characters = [];
    this.totalCharactersCount = 0;
  };

  getCharacters = flow(function* (this: CharactersStore, url: string) {
    try {
      const {
        data: { count, next, results: characters },
      } = yield RestClient.fetchCharacters(this.nextCharactersUrl || url);
      if (next === null) {
        this.characters = [...this.characters, ...characters];
        return;
      }
      this.nextCharactersUrl = next;
      this.totalCharactersCount = count;
      this.characters = [...this.characters, ...characters];
    } catch (error) {
      console.log('looog', error);
    }
  }).bind(this);

  @computed
  get shouldFetachMoreCharacters(): boolean {
    return this.characters.length < this.totalCharactersCount;
  }

  @computed
  get allCharactersFetched(): boolean {
    return (
      this.characters.length > 0 &&
      this.characters.length === this.totalCharactersCount
    );
  }

  @computed
  get characterRowButtons(): Array<any> {
    const {
      favoritesStore: { addToFavorites, removeFromFavorites },
      favoritesStore,
      alertStore: { showDropdownAlert },
      appStore: { setModalVisable },
    } = this.rootStore.stores;
    return [
      {
        text: Localizable.t('charactersList.details'),
        handlePress: (index: number) => {
          this.setCharacter(this.characters[index]);
          setModalVisable();
        },
        characterButton: true,
      },
      {
        text: Localizable.t('charactersList.addToFavorites'),
        handlePress: (index: number) => {
          addToFavorites(index);
          showDropdownAlert('Added character to favorites!');
        },
        characterButton: true,
      },
      {
        text: Localizable.t('charactersList.remove'),
        handlePress: (index: number) => {
          if (favoritesStore.favoriteCharacters.length !== 1) {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
          }
          removeFromFavorites(index);
          showDropdownAlert('Removed character from favorites!');
        },
        characterButton: true,
      },
    ];
  }

  @computed
  get characterDetailsButtons(): Array<any> {
    const {
      favoritesStore: { addToFavorites },
      alertStore: { showDropdownAlert },
    } = this.rootStore.stores;
    return [
      {
        text: Localizable.t('charactersList.planetInfo'),
        handlePress: () => {
          console.log('looog planet');
        },
        characterButton: true,
      },
      {
        text: Localizable.t('charactersList.addToFavorites'),
        handlePress: (index: number) => {
          addToFavorites(index);
          showDropdownAlert('Added character to favorites!');
        },
        characterButton: true,
      },
    ];
  }

  @computed
  get characterButtonsFiltered(): Array<any> {
    const { navigationStore } = this.rootStore.stores;
    return navigationStore.currentRouteName === 'Characters'
      ? this.characterRowButtons.splice(0, 2)
      : this.characterRowButtons.slice(-1);
  }
}
