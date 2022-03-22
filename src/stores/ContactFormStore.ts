import { observable, action, computed } from 'mobx';
import { RefObject, createRef } from 'react';
import { TextInput } from 'react-native';

import { BaseStore } from '../stores';

type ContactFormErrorType = 'firstName' | 'lastName' | 'zipCode' | 'email';

export default class ContactFormStore extends BaseStore {
  @observable.ref
  lastNameTextInputRef: RefObject<TextInput> = createRef();

  @observable.ref
  zipCodeTextInputRef: RefObject<TextInput> = createRef();

  @observable.ref
  emailTextInputRef: RefObject<TextInput> = createRef();

  @observable
  firstName = '';

  @observable
  lastName = '';

  @observable
  zipCode = '';

  @observable
  email = '';

  @observable
  errors: Array<ContactFormErrorType> = [];

  @observable
  lastAddedErrors: Array<ContactFormErrorType> | null = null;

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
  setErrors = (errors: Array<ContactFormErrorType>) => {
    this.lastAddedErrors = errors;
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

  submit = () => {
    this.validateFields();
    console.log('looog submit');
  };

  validateFields = () => {
    if (this.firstName.length === 0) {
      this.setErrors(['firstName']);
    }
    if (this.lastName.length === 0) {
      this.setErrors(['lastName']);
    }
    if (this.zipCode.length === 0) {
      this.setErrors(['zipCode']);
    }
  };

  // @computed to be used if needed
  // get isFirstNameError(): boolean {
  //   return this.errors.some((error) => error === 'firstName');
  // }

  //tbc - zipCode regExp

  @computed
  get fieldsValid(): boolean {
    const regExp = /^[0-9]{2}-[0-9]{3}/;
    return (
      this.firstName.length !== 0 &&
      this.lastName.length !== 0 &&
      this.zipCode.length === 6 &&
      regExp.test(this.zipCode) &&
      this.errors.length === 0
    );
  }
}
