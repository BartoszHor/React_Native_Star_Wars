import { observable, action, computed } from 'mobx';
import { createRef, RefObject } from 'react';
import { BaseStore } from '.';
import { Localizable } from '../../packages/i18n';
import { NavigationButton } from '../repository/models';

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

  @computed
  get navigationButtons(): Array<NavigationButton> {
    return [
      {
        text: Localizable.t('navigationButtons.characters'),
        handlePress: () => {
          this.navigate(Localizable.t('navigationButtons.characters'));
        },
        index: 0,
      },
      {
        text: Localizable.t('navigationButtons.favorites'),
        handlePress: () => {
          this.navigate(Localizable.t('navigationButtons.favorites'));
        },
        index: 1,
      },
      {
        text: Localizable.t('navigationButtons.contact'),
        handlePress: () => {
          this.navigate(
            Localizable.t('navigationButtons.contact').replace(/ /g, ''),
          );
        },
        index: 2,
      },
    ];
  }
}
