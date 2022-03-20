import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CharactersListStyles from '../characters/styles/CharactersStyles';
import { Localizable } from '../../../../packages/i18n';
import { CharacterButton } from '../../../repository/models';
import { observer } from 'mobx-react';
import { useStores } from '../../../App';
import Button from '../../../components/buttons/Button';

const renderButton = (
  { text, handlePress, characterButton }: CharacterButton,
  characterIndex: number,
  index: number,
) => {
  return (
    <Button
      text={text}
      handlePress={handlePress}
      index={index}
      key={index}
      characterButton={characterButton}
      characterIndex={characterIndex}
    />
  );
};

interface Props {
  item: any;
  index: number;
}

export default observer(({ item: character, index: characterIndex }: Props) => {
  const {
    stores: { charactersStore },
  } = useStores();
  return (
    <TouchableOpacity style={CharactersListStyles.characterContainer}>
      <View style={CharactersListStyles.characterInnerContainer}>
        <View>
          <Text style={CharactersListStyles.characterName}>
            {Localizable.t('charactersList.name')}
            {character.name.split(' ').splice(0, 2).join(' ')}
          </Text>
          <Text style={CharactersListStyles.characterName}>
            {Localizable.t('charactersList.height')}
            {character.height}
          </Text>
        </View>
        <View>
          <View>
            {charactersStore.characterButtons.map((button, index) =>
              renderButton(button, characterIndex, index),
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});
