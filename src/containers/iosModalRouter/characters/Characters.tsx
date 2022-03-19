import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  View,
  ImageBackground,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Images from '../../../utils/Images';
import CharacterStyles from '../characters/styles/CharactersStyles';
import { useStores } from '../../../App';
import { Localizable } from '../../../../packages/i18n';
import { CharacterRow } from '../../../repository/models';

const renderItem = ({ item: { name, height }, index }: CharacterRow) => {
  return (
    <TouchableOpacity style={CharacterStyles.characterContainer}>
      <View style={CharacterStyles.characterInnerContainer}>
        <View>
          <Text style={CharacterStyles.characterName}>
            {Localizable.t('charactersList.name')}
            {name}
          </Text>
          <Text style={CharacterStyles.characterName}>
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

export default observer(() => {
  const {
    stores: {
      charactersStore,
      charactersStore: { getCharacters, resetCharactersStore },
    },
  } = useStores();
  useEffect(() => {
    return () => {
      resetCharactersStore();
    };
  }, []);

  return (
    <View style={CharacterStyles.container}>
      <ImageBackground
        source={Images.splash.background}
        resizeMode="cover"
        style={CharacterStyles.background}>
        <View>
          <Image
            source={Images.charactersList.arrowDown}
            style={CharacterStyles.arrowDown}
            resizeMode="contain"
          />
          <FlatList
            style={CharacterStyles.charactersListContainer}
            data={charactersStore.characters}
            renderItem={renderItem}
            onEndReachedThreshold={0.7}
            onEndReached={() =>
              charactersStore.shouldFetachMoreCharacters &&
              getCharacters(charactersStore.nextCharactersUrl)
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
});
