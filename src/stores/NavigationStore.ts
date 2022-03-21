import { observable, action, computed } from 'mobx';
import { createRef, RefObject } from 'react';
import { BaseStore } from '.';
import { Localizable } from '../../packages/i18n';
import { NavigationButtonStore } from '../repository/models';
import { CommonActions } from '@react-navigation/native';

export const navigationRef: RefObject<any> = createRef();
export default class NavigationStore extends BaseStore {
  @observable
  previousRouteName = '';

  @observable
  currentRouteName = 'MainView';

  zoomInNavigationButtons = {
    0: {
      opacity: 0,
      scale: 0,
    },
    0.5: {
      opacity: 0.5,
      scale: 0.5,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };

  @action
  setCurrentRouteName = (route: string) => {
    this.previousRouteName = this.currentRouteName;
    this.currentRouteName = route;
  };

  navigate = (routeName: string, params?: object): void => {
    if (!navigationRef.current) {
      return;
    }
    navigationRef.current.navigate(routeName, params);
  };

  goBack = (key?: string): void => {
    if (!navigationRef.current) {
      return;
    }
    navigationRef.current?.dispatch({
      ...CommonActions.goBack(),
      source: key,
    });
  };

  @computed
  get navigationButtons(): Array<NavigationButtonStore> {
    const {
      appStore: { showLoading, hideLoading },
      charactersStore: { getCharacters },
      charactersStore,
    } = this.rootStore.stores;
    return [
      {
        text: Localizable.t('navigationButtons.characters'),
        handlePress: async () => {
          showLoading();
          await getCharacters(charactersStore.initialUrl);
          hideLoading();
          this.navigate('Characters', { screen: 'Characters' });
        },
      },
      {
        text: Localizable.t('navigationButtons.favorites'),
        handlePress: () => {
          this.navigate('Favorites', { screen: 'Favorites' });
        },
      },
      {
        text: Localizable.t('navigationButtons.contact'),
        handlePress: () => {
          this.navigate('ContactForm');
        },
      },
    ];
  }
}
