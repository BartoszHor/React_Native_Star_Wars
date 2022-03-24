import { observer } from 'mobx-react';
import React from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useStores } from '../../../App';
import CharactersFiltersStyles from '../characters/styles/CharactersFiltersStyles';
import Modal from '../../../components/modals/Modal';
import CharactersFiltersRow from '../characters/CharactersFiltersRow';
import Images from '../../../utils/Images';

const renderItem = ({ item, index }: { item: string; index: number }) => (
  <CharactersFiltersRow item={item} index={index} />
);

export default observer(() => {
  const {
    stores: {
      layoutStore,
      charactersStore,
      charactersStore: { setFiltersInvisable },
    },
  } = useStores();

  return (
    <Modal isVisible={charactersStore.filtersVisable}>
      <View
        style={[
          CharactersFiltersStyles.container,
          {
            width: layoutStore.screenWidth,
            height: layoutStore.screenHeight / 1.2,
          },
        ]}>
        <TouchableOpacity
          onPress={setFiltersInvisable}
          style={CharactersFiltersStyles.closeButton}>
          <Image
            source={Images.close.arrowDown}
            style={CharactersFiltersStyles.closeImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={CharactersFiltersStyles.listContainer}>
          <FlatList
            initialNumToRender={charactersStore.planets.length}
            keyExtractor={(planet) => planet}
            showsVerticalScrollIndicator={false}
            data={charactersStore.planets}
            renderItem={renderItem}
          />
        </View>
      </View>
    </Modal>
  );
});
