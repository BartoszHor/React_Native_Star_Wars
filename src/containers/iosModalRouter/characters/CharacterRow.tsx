import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CharactersListStyles from '../characters/styles/CharactersStyles';
import { Localizable } from '../../../../packages/i18n';
import { CharacterRow } from '../../../repository/models';

export default ({ name, height }: CharacterRow) => {
  return (
    <TouchableOpacity style={CharactersListStyles.characterContainer}>
      <View style={CharactersListStyles.characterInnerContainer}>
        <View>
          <Text style={CharactersListStyles.characterName}>
            {Localizable.t('charactersList.name')}
            {name}
          </Text>
          <Text style={CharactersListStyles.characterName}>
            {Localizable.t('charactersList.height')}
            {height}
          </Text>
        </View>
        <View>
          <Text style={{ color: 'white', backgroundColor: 'red', flex: 1 }}>
            asss
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
