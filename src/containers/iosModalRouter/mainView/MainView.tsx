import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { View, ImageBackground } from 'react-native';
import Images from '../../../utils/Images';
import MainViewStyles from '../mainView/styles/MainViewStyles';
import { useStores } from '../../../App';
import { NavigationButtonStore } from '../../../repository/models';
import Button from '../../../components/buttons/Button';

const renderButton = (
  { text, handlePress }: NavigationButtonStore,
  index: number,
) => {
  return (
    <Button text={text} handlePress={handlePress} index={index} key={index} />
  );
};

export default observer(() => {
  const {
    stores: {
      navigationStore,
      splashScreenStore,
      appStore,
      charactersStore: { resetPlanets },
    },
  } = useStores();

  useEffect(() => {
    if (navigationStore.previousRouteName === 'Characters') {
      resetPlanets();
    }
  }, [navigationStore.currentRouteName]);

  return (
    <View style={MainViewStyles.container}>
      <ImageBackground
        source={Images.splash.background}
        resizeMode="cover"
        style={MainViewStyles.background}>
        {!splashScreenStore.reactSplashShown && !appStore.loading && (
          <View>{navigationStore.navigationButtons.map(renderButton)}</View>
        )}
      </ImageBackground>
    </View>
  );
});
