import { observable, action } from 'mobx';
import { RefObject, createRef } from 'react';
import DropdownAlert from 'react-native-dropdownalert';

import { BaseStore } from '.';
import { Alert, HandleErrorProps } from '../repository/models';
import { Localizable } from '../../packages/i18n';
import { extractErrorMessage } from '../utils/alertUtils';

export default class AlertStore extends BaseStore {
  @observable
  dropdownAlertRef: RefObject<DropdownAlert> = createRef();

  defaultButton = {
    text: Localizable.t('alerts.ok'),
    onPress: () => this.dismissAlert(),
    buttonType: 'default',
  };

  @observable
  alerts: Array<Alert> = [];

  @action
  handleError = ({
    error,
    buttons = [{ ...this.defaultButton }],
    showAlert = true,
    title = Localizable.t('alerts.error'),
  }: HandleErrorProps) => {
    if (!!showAlert) {
      const errorMessage = extractErrorMessage(error);
      if (!errorMessage) {
        return;
      }
      const alert = {
        title,
        text: errorMessage,
        buttons,
      };
      this.alerts = [alert];
    }
  };

  @action
  dismissAlert = () => {
    this.navigateBack();
    if (this.alerts.length > 0) {
      this.alerts = this.alerts.filter((_, i) => i !== this.alerts.length - 1);
    }
  };

  @action
  navigateBack = () => {
    const {
      navigationStore: { navigate },
      appStore: { setModalInvisable },
      appStore,
    } = this.rootStore.stores;
    if (appStore.modalVisable) {
      setModalInvisable();
      return;
    }
    navigate('MainView');
  };

  @action
  showDropdownAlert = (message: string) => {
    if (this.dropdownAlertRef.current?.state?.isOpen) {
      return;
    }
    this.dropdownAlertRef.current?.alertWithType(
      'custom',
      'Star Wars',
      message,
    );
  };
}
