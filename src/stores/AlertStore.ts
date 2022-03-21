import { observable, action } from 'mobx';
import { RefObject, createRef } from 'react';
import DropdownAlert from 'react-native-dropdownalert';

import { BaseStore } from '.';
import {
  Alert,
  HandleErrorProps,
  HandleAlertProps,
} from '../repository/models';
import { Localizable } from '../../packages/i18n';
import { extractErrorMessage } from '../utils/alertUtils';

export default class AlertStore extends BaseStore {
  @observable
  dropdownAlertRef: RefObject<DropdownAlert> = createRef();

  @observable
  alerts: Array<Alert> = [];

  @action
  handleError = ({
    error,
    buttons = [
      {
        text: Localizable.t('alerts.ok'),
        onPress: () => this.dismissAlert(),
        buttonType: 'default',
      },
    ],
    showAlert = false,
    title = Localizable.t('alerts.error'),
    onCloseButtonClick,
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
        onCloseButtonClick,
      };
      this.alerts = [alert];
    }
  };

  @action
  showAlert = ({
    title = Localizable.t('alerts.pageNotFound'),
    text = Localizable.t('alerts.404'),
    buttons = [
      {
        text: Localizable.t('alerts.ok'),
        onPress: () => this.dismissAlert(),
        buttonType: 'default',
      },
    ],
    onCloseButtonClick,
  }: HandleAlertProps) => {
    const alert = {
      title,
      text,
      buttons,
      onCloseButtonClick,
    };
    this.alerts = [alert];
  };

  @action
  dismissAlert = () => {
    if (this.alerts.length > 0) {
      this.alerts = this.alerts.filter((_, i) => i !== this.alerts.length - 1);
    }
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
