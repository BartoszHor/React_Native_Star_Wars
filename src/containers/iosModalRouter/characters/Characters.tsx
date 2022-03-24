import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Images from '../../../utils/Images';
import CharactersListStyles from '../characters/styles/CharactersStyles';
import { useStores } from '../../../App';
import CharacterRowComponent from './CharacterRow';
import CharactersListFooter from './CharactersListFooter';

const renderItem = ({ item, index }: { item: any; index: number }) => (
  <CharacterRowComponent item={item} index={index} />
);

export default observer(
  ({
    route: {
      params: { screen },
    },
  }) => {
    const {
      stores: {
        charactersStore,
        favoritesStore,
        charactersStore: {
          getCharacters,
          resetCharactersStore,
          setCharactersScreenSearchBarText,
          setFiltersVisable,
        },
      },
    } = useStores();
    useEffect(() => {
      return () => {
        resetCharactersStore();
        setCharactersScreenSearchBarText('');
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
            {screen === 'Characters' ? (
              <>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    onChangeText={setCharactersScreenSearchBarText}
                    value={charactersStore.charactersScreenSearchBarText}
                    style={CharactersListStyles.searchBar}
                    placeholder={'Search by name'}
                    placeholderTextColor={'white'}
                  />
                  <TouchableOpacity
                    onPress={setFiltersVisable}
                    style={{ flex: 1 }}>
                    <Image
                      source={Images.filters.filter}
                      style={CharactersListStyles.filter}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  style={CharactersListStyles.charactersListContainer}
                  data={charactersStore.charactersWithFilteredPlanets}
                  renderItem={renderItem}
                  onEndReachedThreshold={0.7}
                  onEndReached={() =>
                    charactersStore.shouldFetachMoreCharacters &&
                    charactersStore.excludedPlanets.length === 0 &&
                    getCharacters(charactersStore.nextCharactersUrl)
                  }
                  ListFooterComponent={
                    charactersStore.excludedPlanets.length === 0 ? (
                      <CharactersListFooter />
                    ) : null
                  }
                />
              </>
            ) : (
              <ScrollView
                style={CharactersListStyles.charactersListContainer}
                showsHorizontalScrollIndicator={false}
                bounces>
                {favoritesStore.favoriteCharacters.map((item, index) => (
                  <CharacterRowComponent
                    item={item}
                    index={index}
                    key={index}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  },
);
