import React from 'react';
import { observer } from 'mobx-react';
import { View, ImageBackground, Text } from 'react-native';
import Images from '../../../utils/Images';
import CharacterStyles from '../characters/styles/CharactersStyles';

export default observer(() => {
  return (
    <View style={CharacterStyles.container}>
      <ImageBackground
        source={Images.splash.background}
        resizeMode="cover"
        style={CharacterStyles.image}>
        <View>
          <Text style={{ color: 'white' }}> Flat list with chars to do</Text>
        </View>
      </ImageBackground>
    </View>
  );
});
