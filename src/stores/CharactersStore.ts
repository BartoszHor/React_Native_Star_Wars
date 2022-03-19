/* eslint-disable camelcase */
import { action, computed, flow, observable } from 'mobx';
import Config from 'react-native-config';
import { BaseStore } from '.';
import RestClient from '../repository/RestClient';

export default class CharactersStore extends BaseStore {
  @observable
  initialUrl = Config.API_URL;

  @observable
  nextCharactersUrl = '';

  @observable
  characters: Array<any> = [];

  @observable
  totalCharactersCount: number = 0;

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
}
