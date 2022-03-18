import React from 'react';
import { observer } from 'mobx-react';
import { View, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useStores } from '../../App';
import Images from '../../utils/Images';
import LandingStyles from './styles/LandingStyles';

export default observer(() => {
  const {
    stores: {
      splashScreenStore,
      splashScreenStore: { hideSplash },
    },
  } = useStores();

  return splashScreenStore.reactSplashShown ? (
    <Animatable.View
      useNativeDriver
      style={LandingStyles.container}
      animation={splashScreenStore.zoomOut}
      delay={3000}
      duration={5000}
      onAnimationEnd={hideSplash}>
      <View style={LandingStyles.contentContainer}>
        <ImageBackground
          source={Images.splash.splashBackground}
          resizeMode="cover"
          style={LandingStyles.container}
        />
        <Image
          source={Images.splash.logo}
          style={LandingStyles.logo}
          resizeMode="contain"
        />
      </View>
    </Animatable.View>
  ) : null;
});
