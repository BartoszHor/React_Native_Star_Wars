import React from 'react';
import { observer } from 'mobx-react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useStores } from '../../App';
import Images from '../../utils/Images';
import SplashScreenStyles from './styles/SplashScreenStyles';

export default observer(() => {
  const {
    stores: {
      splashScreenStore,
      splashScreenStore: { hideSplash },
    },
  } = useStores();
  return (
    <Animatable.View
      useNativeDriver
      style={SplashScreenStyles.container}
      animation={splashScreenStore.zoomOut}
      delay={3000}
      duration={5000}
      onAnimationEnd={hideSplash}>
      <View style={SplashScreenStyles.contentContainer}>
        <Image
          source={Images.splash.logo}
          style={SplashScreenStyles.logo}
          resizeMode="contain"
        />
      </View>
    </Animatable.View>
  );
});
