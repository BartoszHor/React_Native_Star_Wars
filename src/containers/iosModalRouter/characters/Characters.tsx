import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { View, ImageBackground, FlatList, Image } from 'react-native';
import Images from '../../../utils/Images';
import CharactersListStyles from '../characters/styles/CharactersStyles';
import { useStores } from '../../../App';
import CharacterRowComponent from './CharacterRow';
import CharactersListFooter from './CharactersListFooter';
import { CharacterRow } from '../../../repository/models';

const renderItem = ({ item: { name, height } }: { item: CharacterRow }) => (
  <CharacterRowComponent name={name} height={height} />
);

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
    <View style={CharactersListStyles.container}>
      <ImageBackground
        source={Images.splash.background}
        resizeMode="cover"
        style={CharactersListStyles.background}>
        <View>
          <Image
            source={Images.charactersList.arrowDown}
            style={CharactersListStyles.arrowDown}
            resizeMode="contain"
          />
          <FlatList
            style={CharactersListStyles.charactersListContainer}
            data={charactersStore.characters}
            renderItem={renderItem}
            onEndReachedThreshold={0.7}
            onEndReached={() =>
              charactersStore.shouldFetachMoreCharacters &&
              getCharacters(charactersStore.nextCharactersUrl)
            }
            ListFooterComponent={<CharactersListFooter />}
          />
        </View>
      </ImageBackground>
    </View>
  );
});
