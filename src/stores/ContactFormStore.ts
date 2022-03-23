import { observable, action, computed } from 'mobx';
import { RefObject, createRef } from 'react';
import { TextInput } from 'react-native';

import { BaseStore } from '../stores';

type ContactFormErrorType =
  | 'firstName'
  | 'lastName'
  | 'zipCode'
  | 'email'
  | 'phone'
  | 'message';
export default class ContactFormStore extends BaseStore {
  @observable.ref
  lastNameTextInputRef: RefObject<TextInput> = createRef();

  @observable.ref
  zipCodeTextInputRef: RefObject<TextInput> = createRef();

  @observable.ref
  emailTextInputRef: RefObject<TextInput> = createRef();

  @observable.ref
  phoneTextInputRef: RefObject<TextInput> = createRef();

  @observable.ref
  messageTextInputRef: RefObject<TextInput> = createRef();

  @observable
  firstName = '';

  @observable
  lastName = '';

  @observable
  zipCode = '';

  @observable
  email = '';

  @observable
  phone = '+48';

  @observable
  message = '';

  @observable
  errors: Array<ContactFormErrorType> = [];

  @action
  focusLastNameInput = () => {
    this.lastNameTextInputRef.current?.focus();
  };

  @action
  focusZipCodeInput = () => {
    this.zipCodeTextInputRef.current?.focus();
  };

  @action
  focusEmailInput = () => {
    this.emailTextInputRef.current?.focus();
  };

  @action
  focusPhoneInput = () => {
    this.phoneTextInputRef.current?.focus();
  };

  @action
  focusMessageInput = () => {
    this.messageTextInputRef.current?.focus();
  };

  blurZipCodeInput = () => {
    this.zipCodeTextInputRef.current?.blur();
  };

  blurEmailInput = () => {
    this.emailTextInputRef.current?.blur();
  };

  blurPhoneInput = () => {
    this.phoneTextInputRef.current?.blur();
  };

  @action
  setFirstName = (name: string) => {
    this.firstName = name;
  };

  @action
  setLastName = (name: string) => {
    this.lastName = name;
  };

  @action
  setZipCode = (zipCode: string) => {
    this.zipCode = zipCode;
    if (this.zipCode.length === 5) {
      const zipArray = this.zipCode.split('');
      zipArray.splice(2, 0, '-');
      const zipArrayModified = zipArray;
      this.zipCode = zipArrayModified.join('');
      this.focusEmailInput();
    }
  };

  @action
  setEmail = (email: string) => {
    this.email = email;
  };

  @action
  setPhone = (phone: string) => {
    this.phone = phone;
  };

  @action
  setMessage = (message: string) => {
    this.message = message;
  };

  @action
  setErrors = (errors: Array<ContactFormErrorType>) => {
    errors.forEach((error) => {
      if (!this.errors.some((e) => e === error)) {
        this.errors.push(error);
      }
    });
  };

  @action
  resetErrors = (errorTypes: Array<ContactFormErrorType> | null) => {
    this.errors = this.errors.filter(
      (error) => !errorTypes?.some((e) => e === error),
    );
  };

  @action
  clearStore = () => {
    this.errors = [];
    this.firstName = '';
    this.lastName = '';
    this.zipCode = '';
    this.email = '';
    this.phone = '+48';
    this.message = '';
  };

  onFirstNameInputFocus = () => {
    this.resetErrors(['firstName']);
  };

  onLastNameInputFocus = () => {
    this.resetErrors(['lastName']);
  };

  onZipInputFocus = () => {
    this.zipCode = '';
    this.resetErrors(['zipCode']);
  };

  onEmailInputFocus = () => {
    this.resetErrors(['email']);
  };

  onPhoneInputFocus = () => {
    this.resetErrors(['phone']);
  };

  onMessageInputFocus = () => {
    this.resetErrors(['message']);
  };

  submit = () => {
    const {
      alertStore: { showDropdownAlert },
      navigationStore: { goBack },
    } = this.rootStore.stores;
    this.validateFields();
    if (!this.errors.length) {
      showDropdownAlert('Thanks for sending form');
      goBack();
    }
    if (!!this.errors.length) {
      showDropdownAlert('Please provide proper format in marked fields');
    }
  };

  validateFields = () => {
    const zipRegExp = /^[0-9]{2}-[0-9]{3}/;
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegExp = /^(\+48\s*)?\d{2}\s*\d{3}(\s*|\-)\d{2}(\s*|\-)\d{2}$/;
    if (!zipRegExp.test(this.zipCode)) {
      this.setErrors(['zipCode']);
      this.blurZipCodeInput();
    }
    if (!emailRegExp.test(this.email)) {
      this.setErrors(['email']);
      this.blurEmailInput();
    }
    if (!phoneRegExp.test(this.phone)) {
      this.setErrors(['phone']);
      this.blurPhoneInput();
    }
  };

  @computed
  get isZipError(): boolean {
    return this.errors.some((error) => error === 'zipCode');
  }

  @computed
  get isEmailError(): boolean {
    return this.errors.some((error) => error === 'email');
  }

  @computed
  get isPhoneError(): boolean {
    return this.errors.some((error) => error === 'phone');
  }

  @computed
  get fieldsValid(): boolean {
    return (
      this.firstName.length !== 0 &&
      this.lastName.length !== 0 &&
      this.zipCode.length === 6 &&
      this.email.length > 4 &&
      this.phone.length >= 12 &&
      !!this.message.length &&
      this.errors.length === 0
    );
  }
}
