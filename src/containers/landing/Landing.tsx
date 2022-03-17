import React from 'react';
import { observer } from 'mobx-react';
import { View, ImageBackground, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useStores } from '../../App';
import Images from '../../utils/Images';
import LandingStyles from './styles/LandingStyles';
import { Localizable } from '../../../packages/i18n';

export default observer(() => {
  const {
    stores: {
      splashScreenStore,
      splashScreenStore: { fadeOutSplash },
    },
  } = useStores();

  return splashScreenStore.reactSplashShown ? (
    <Animatable.View
      useNativeDriver
      style={LandingStyles.container}
      animation={splashScreenStore.zoomOut}
      delay={3000}
      duration={3000}
      onAnimationEnd={fadeOutSplash}>
      <View style={LandingStyles.contentContainer}>
        <ImageBackground
          source={Images.splash.splashBackground}
          resizeMode="cover"
          style={LandingStyles.container}
        />
        <Text style={LandingStyles.splashScreenText}>
          {Localizable.t('splahScreen.welcome')}
        </Text>
      </View>
    </Animatable.View>
  ) : null;
});
