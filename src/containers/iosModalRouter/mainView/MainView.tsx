import React from 'react';
import { observer } from 'mobx-react';
import { View, ImageBackground } from 'react-native';
import Images from '../../../utils/Images';
import MainViewStyles from '../mainView/styles/MainViewStyles';
import { useStores } from '../../../App';
import { NavigationButton } from '../../../repository/models';
import Button from '../../../components/buttons/Button';

const renderButton = ({ text, handlePress, index }: NavigationButton) => {
  return (
    <Button text={text} handlePress={handlePress} index={index} key={index} />
  );
};

export default observer(() => {
  const {
    stores: { navigationStore, splashScreenStore, appStore },
  } = useStores();
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
