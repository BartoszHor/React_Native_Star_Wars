import { observable } from 'mobx';
import { BaseStore } from '.';
export default class AlertStore extends BaseStore {
  @observable
  alerts: Array<any> = [];
}
