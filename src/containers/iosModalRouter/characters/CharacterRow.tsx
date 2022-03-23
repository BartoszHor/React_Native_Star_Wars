import React from 'react';
import { View, Text } from 'react-native';
import { Localizable } from '../../../../packages/i18n';
import { CharacterButton } from '../../../repository/models';
import { observer } from 'mobx-react';
import { useStores } from '../../../App';
import CharactersListStyles from '../characters/styles/CharactersStyles';
import Button from '../../../components/buttons/Button';

const renderButton = (
  { text, handlePress, characterButton }: CharacterButton,
  characterIndex: number,
  index: number,
  characterInFavorites: boolean,
) => {
  return (
    <Button
      text={text}
      handlePress={handlePress}
      index={index}
      key={index}
      characterButton={characterButton}
      characterIndex={characterIndex}
      characterInFavorites={characterInFavorites}
    />
  );
};

interface Props {
  item: any;
  index: number;
}

export default observer(({ item: character, index: characterIndex }: Props) => {
  const {
    stores: { charactersStore, favoritesStore },
  } = useStores();
  const characterInFavorites = favoritesStore.favoriteCharacters.some(
    ({ name }) => name === character.name,
  );
  return (
    <View style={CharactersListStyles.characterContainer}>
      <View style={CharactersListStyles.characterInnerContainer}>
        <View>
          <Text style={CharactersListStyles.characterName}>
            {Localizable.t('charactersList.name')}
            {character.name.split(' ').splice(0, 2).join(' ')}
          </Text>
          <Text style={CharactersListStyles.characterName}>
            {Localizable.t('charactersList.planet')}
            {character.planet.name}
          </Text>
        </View>
        <View>
          <View style={CharactersListStyles.buttonsContainer}>
            {charactersStore.characterButtonsFiltered.map((button, index) =>
              renderButton(button, characterIndex, index, characterInFavorites),
            )}
          </View>
        </View>
      </View>
    </View>
  );
});
