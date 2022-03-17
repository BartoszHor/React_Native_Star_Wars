import { observable, action } from 'mobx';
import { createRef, RefObject } from 'react';

import { BaseStore } from '.';

export const navigationRef: RefObject<any> = createRef();

export default class NavigationStore extends BaseStore {
  @observable
  previousRouteName = '';

  @observable
  currentRouteName = 'test';

  @action
  setCurrentRouteName = (route: string) => {
    this.previousRouteName = this.currentRouteName;
    this.currentRouteName = route;
  };
}
