import { observable, flow } from 'mobx';
import { BaseStore } from '.';

export default class SplashScreenStore extends BaseStore {
  @observable
  reactSplashShown = true;

  zoomOutSplasScreenLogo = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 0.5,
      scale: 0.5,
    },
    1: {
      opacity: 0,
      scale: 0,
    },
  };

  hideSplash = flow(function* (this: SplashScreenStore) {
    this.reactSplashShown = false;
  }).bind(this);
}
