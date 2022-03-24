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
  planets: Array<string> = [];

  @observable
  character: any | null = null;

  @observable
  characterPlanetInfo: any | null = null;

  @observable
  totalCharactersCount: number = 0;

  @observable
  charactersScreenSearchBarText = '';

  @observable
  filtersVisable = false;

  @observable
  excludedPlanets: Array<string> = [];

  @action
  setCharactersScreenSearchBarText = (text: string) => {
    this.charactersScreenSearchBarText = text;
  };

  @action
  setCharacter = (character: any) => {
    this.character = character;
  };

  @action
  setFiltersVisable = () => {
    this.filtersVisable = true;
  };

  @action
  setFiltersInvisable = () => {
    this.filtersVisable = false;
  };

  @action
  clearCharacterPlanetInfo = () => {
    this.characterPlanetInfo = null;
  };

  @action
  resetCharactersStore = () => {
    this.nextCharactersUrl = '';
    this.characters = [];
    this.totalCharactersCount = 0;
  };

  @action
  onPlanetFilterClick = (item: any) => {
    const i = this.excludedPlanets.indexOf(item);
    if (i !== -1) {
      this.excludedPlanets.splice(i, 1);
    } else {
      this.excludedPlanets.push(item);
    }
  };

  @action
  resetPlanets = () => {
    this.planets = [];
    this.excludedPlanets = [];
  };

  getCharacters = flow(function* (this: CharactersStore, url: string) {
    const {
      alertStore: { handleError },
    } = this.rootStore.stores;
    try {
      const {
        data: { count, next, results: characters },
      } = yield RestClient.fetchCharacters(this.nextCharactersUrl || url);
      const charactersWithHomeworld = [];
      for (const character of characters) {
        const { data: homeworld } = yield RestClient.fetchPlanetInfo(
          character.homeworld,
        );
        const characterWithHomewrold = {
          ...character,
          planet: homeworld,
        };
        charactersWithHomeworld.push(characterWithHomewrold);
        if (this.planets.indexOf(characterWithHomewrold.planet.name) === -1) {
          this.planets.push(characterWithHomewrold.planet.name);
        }
      }

      if (next === null) {
        this.characters = [...this.characters, ...charactersWithHomeworld];
        return;
      }
      this.nextCharactersUrl = next;
      this.totalCharactersCount = count;
      this.characters = [...this.characters, ...charactersWithHomeworld];
    } catch (error) {
      handleError({ error });
    }
  }).bind(this);

  getPlanetInfo = flow(function* (this: CharactersStore, url: string) {
    const {
      alertStore: { handleError },
    } = this.rootStore.stores;
    try {
      const { data } = yield RestClient.fetchPlanetInfo(url);
      this.characterPlanetInfo = data;
    } catch (error) {
      handleError({ error });
    }
  }).bind(this);

  @computed
  get shouldFetachMoreCharacters(): boolean {
    return (
      this.characters.length < this.totalCharactersCount &&
      this.charactersScreenSearchBarText.length === 0
    );
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
          this.setCharacter(this.charactersWithFilteredPlanets[index]);
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
      appStore: { showLoading, hideLoading },
    } = this.rootStore.stores;
    return [
      {
        text: !!this.characterPlanetInfo
          ? Localizable.t('charactersList.planetInfoLoaded')
          : Localizable.t('charactersList.planetInfo'),
        handlePress: async () => {
          showLoading();
          await this.getPlanetInfo(this.character.homeworld);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          hideLoading();
        },
        characterButton: true,
        disabled: !!this.characterPlanetInfo,
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

  @computed
  get shouldHideLoader(): boolean {
    const { navigationStore } = this.rootStore.stores;
    return (
      this.charactersScreenSearchBarText.length > 0 &&
      navigationStore.currentRouteName === 'Characters'
    );
  }

  @computed
  get filteredCharacters(): Array<any> {
    return this.characters.filter((character) =>
      character.name
        .toLowerCase()
        .includes(this.charactersScreenSearchBarText.toLowerCase()),
    );
  }

  @computed
  get charactersWithFilteredPlanets(): Array<any> {
    const charactersWithFilteredPlanets = this.filteredCharacters.filter(
      (item) => !this.excludedPlanets.includes(item.planet.name),
    );
    return charactersWithFilteredPlanets;
  }
}
