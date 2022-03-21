import { observable, action } from 'mobx';

import { BaseStore } from '.';

export default class LayoutStore extends BaseStore {
  @observable
  screenHeight = 0;

  @observable
  screenWidth = 0;

  @action
  onAppLayout = ({ nativeEvent: { layout } }) => {
    const { width, height } = layout;
    this.screenHeight = height;
    this.screenWidth = width;
  };
}
