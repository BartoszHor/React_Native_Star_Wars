import { observable, flow } from 'mobx';
import { BaseStore } from '.';

export default class SplashScreenStore extends BaseStore {
  @observable
  reactSplashShown = true;

  zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 0.5,
    },
    1: {
      opacity: 0,
      scale: 0,
    },
  };

  fadeOutSplash = flow(function* (this: SplashScreenStore) {
    this.reactSplashShown = false;
  }).bind(this);
}
