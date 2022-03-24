import React from 'react';
import { observer } from 'mobx-react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { useStores } from '../../../App';
import Images from '../../../utils/Images';
import CharactersFiltersRowStyles from './styles/CharactersFiltersRowStyles';

export default observer(({ item, index }: { item: string; index: number }) => {
  const {
    stores: {
      charactersStore: { onPlanetFilterClick },
      charactersStore,
    },
  } = useStores();
  const selected = !charactersStore.excludedPlanets.some(
    (planet) => planet === item,
  );
  return (
    <TouchableOpacity
      onPress={() => onPlanetFilterClick(item)}
      key={index}
      style={CharactersFiltersRowStyles.container}>
      <Text style={CharactersFiltersRowStyles.planet}>{item}</Text>
      <View
        style={
          selected
            ? CharactersFiltersRowStyles.selectedView
            : CharactersFiltersRowStyles.unselectedView
        }>
        <Image
          source={Images.close.arrowDown}
          style={
            selected
              ? CharactersFiltersRowStyles.selectedIcon
              : CharactersFiltersRowStyles.unselectedIcon
          }
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
});
