/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useStores } from '../../../App';
import { Localizable } from '../../../../packages/i18n';
import { Colors } from '../../../utils/colors';
import ContactFormStyles from './styles/ContactFormStyles';
import Images from '../../../utils/Images';

export default observer(() => {
  const {
    stores: {
      contactFormStore,
      contactFormStore: {
        focusLastNameInput,
        focusZipCodeInput,
        focusEmailInput,
        focusPhoneInput,
        focusMessageInput,
        onFirstNameInputFocus,
        onLastNameInputFocus,
        onZipInputFocus,
        onEmailInputFocus,
        onPhoneInputFocus,
        onMessageInputFocus,
        setFirstName,
        setLastName,
        setZipCode,
        setEmail,
        setPhone,
        setMessage,
        clearStore,
        submit,
      },
    },
  } = useStores();
  useEffect(() => {
    return () => clearStore();
  }, []);

  return (
    <View style={ContactFormStyles.container}>
      <ImageBackground
        source={Images.splash.background}
        resizeMode="cover"
        style={ContactFormStyles.background}>
        <Image
          source={Images.charactersList.arrowDown}
          style={ContactFormStyles.arrowDown}
          resizeMode="contain"
        />
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={ContactFormStyles.scrollView}
          keyboardShouldPersistTaps="always">
          <View style={ContactFormStyles.rowContainer}>
            <View style={ContactFormStyles.inputContainerFlex}>
              <Text style={ContactFormStyles.inputTitle}>
                {Localizable.t('contactForm.firstName')}
              </Text>
              <TextInput
                autoFocus
                autoCapitalize="words"
                style={ContactFormStyles.input}
                onSubmitEditing={focusLastNameInput}
                returnKeyType="next"
                maxLength={30}
                value={contactFormStore.firstName}
                onChangeText={setFirstName}
                onFocus={onFirstNameInputFocus}
              />
            </View>
            <View style={ContactFormStyles.separator} />
            <View style={ContactFormStyles.inputContainerFlex}>
              <Text style={ContactFormStyles.inputTitle}>
                {Localizable.t('contactForm.surname')}
              </Text>
              <TextInput
                ref={contactFormStore.lastNameTextInputRef}
                autoCapitalize="words"
                style={ContactFormStyles.input}
                onSubmitEditing={focusZipCodeInput}
                returnKeyType="next"
                maxLength={30}
                value={contactFormStore.lastName}
                onChangeText={setLastName}
                onFocus={onLastNameInputFocus}
              />
            </View>
          </View>
          <View style={ContactFormStyles.rowContainer}>
            <View style={ContactFormStyles.inputContainerFlex}>
              <Text style={ContactFormStyles.inputTitle}>
                {Localizable.t('contactForm.postalCode')}
              </Text>
              <TextInput
                ref={contactFormStore.zipCodeTextInputRef}
                style={[
                  ContactFormStyles.input,
                  {
                    borderColor: contactFormStore.isZipError
                      ? Colors.red
                      : Colors.yellow,
                  },
                ]}
                onSubmitEditing={focusEmailInput}
                keyboardType="numeric"
                placeholderTextColor="white"
                returnKeyType="next"
                value={contactFormStore.zipCode}
                onChangeText={setZipCode}
                onFocus={onZipInputFocus}
              />
            </View>
            <View style={ContactFormStyles.separator} />
            <View style={ContactFormStyles.inputContainerFlex}>
              <Text style={ContactFormStyles.inputTitle}>
                {Localizable.t('contactForm.email')}
              </Text>
              <TextInput
                ref={contactFormStore.emailTextInputRef}
                autoCapitalize={'none'}
                style={[
                  ContactFormStyles.input,
                  {
                    borderColor: contactFormStore.isEmailError
                      ? Colors.red
                      : Colors.yellow,
                  },
                ]}
                onSubmitEditing={focusPhoneInput}
                returnKeyType="next"
                value={contactFormStore.email}
                onChangeText={setEmail}
                onFocus={onEmailInputFocus}
              />
            </View>
          </View>
          <View style={ContactFormStyles.rowContainer}>
            <View style={ContactFormStyles.inputContainerFlex}>
              <Text style={ContactFormStyles.inputTitle}>
                {Localizable.t('contactForm.telephone')}
              </Text>
              <TextInput
                ref={contactFormStore.phoneTextInputRef}
                style={[
                  ContactFormStyles.input,
                  {
                    borderColor: contactFormStore.isPhoneError
                      ? Colors.red
                      : Colors.yellow,
                  },
                ]}
                onSubmitEditing={focusMessageInput}
                keyboardType="numeric"
                placeholderTextColor="white"
                returnKeyType="next"
                value={contactFormStore.phone}
                onChangeText={setPhone}
                onFocus={onPhoneInputFocus}
              />
            </View>
          </View>
          <View style={ContactFormStyles.rowContainer}>
            <View style={ContactFormStyles.inputContainerFlex}>
              <Text style={ContactFormStyles.inputTitle}>
                {Localizable.t('contactForm.message')}
              </Text>
              <TextInput
                ref={contactFormStore.messageTextInputRef}
                style={[
                  ContactFormStyles.input,
                  {
                    maxHeight: 150,
                    paddingTop: 15,
                  },
                ]}
                multiline
                numberOfLines={10}
                placeholder="Your message"
                placeholderTextColor="white"
                value={contactFormStore.message}
                onChangeText={setMessage}
                onFocus={onMessageInputFocus}
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={!contactFormStore.fieldsValid}
            style={[
              ContactFormStyles.submitButton,
              {
                borderColor: contactFormStore.fieldsValid
                  ? Colors.green
                  : Colors.red,
                borderWidth: contactFormStore.fieldsValid ? 2 : 1,
              },
            ]}
            onPress={submit}>
            <Text
              style={[
                ContactFormStyles.submitButtonText,
                {
                  color: contactFormStore.fieldsValid
                    ? Colors.white
                    : Colors.red,
                },
              ]}>
              {Localizable.t('contactForm.submit')}
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
});
