import React from 'react';
import { observer } from 'mobx-react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationButton } from '../../repository/models';
import ButtonStyles from './styles/ButtonStyles';
import * as Animatable from 'react-native-animatable';
import { useStores } from '../../App';

export default observer(({ text, handlePress, index }: NavigationButton) => {
  const {
    stores: { navigationStore },
  } = useStores();
  return (
    <TouchableOpacity onPress={handlePress}>
      <Animatable.View
        style={ButtonStyles.innerContainer}
        useNativeDriver
        delay={index * 500}
        duration={1000}
        animation={navigationStore.zoomInNavigationButtons}>
        <Text style={ButtonStyles.titleText}>{text}</Text>
      </Animatable.View>
    </TouchableOpacity>
  );
});
