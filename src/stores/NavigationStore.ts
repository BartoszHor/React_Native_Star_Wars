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
      },
      {
        text: Localizable.t('navigationButtons.filters'),
        handlePress: () => {
          this.navigate(Localizable.t('navigationButtons.filters'));
        },
      },
      {
        text: Localizable.t('navigationButtons.contact'),
        handlePress: () => {
          this.navigate(
            Localizable.t('navigationButtons.contact').replace(/ /g, ''),
          );
        },
      },
    ];
  }
}
