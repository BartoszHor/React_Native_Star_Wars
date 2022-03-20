import React from 'react';
import { observer } from 'mobx-react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CharacterButton, NavigationButton } from '../../repository/models';
import ButtonStyles from './styles/ButtonStyles';
import * as Animatable from 'react-native-animatable';
import { useStores } from '../../App';

export default observer(
  ({
    text,
    handlePress,
    characterButton,
    index,
    characterIndex,
  }: NavigationButton | CharacterButton) => {
    const {
      stores: { navigationStore, favoritesStore },
    } = useStores();
    return !characterButton ? (
      <TouchableOpacity
        disabled={index === 1 && !favoritesStore.favoriteCharactersLength}
        onPress={() => handlePress()}>
        <Animatable.View
          style={ButtonStyles.innerContainer}
          useNativeDriver
          delay={index * 200}
          duration={600}
          animation={navigationStore.zoomInNavigationButtons}>
          {index === 1 && (
            <View style={ButtonStyles.favoritesBadge}>
              <Text style={ButtonStyles.favoritesBadgeText}>
                {favoritesStore.favoriteCharactersLength}
              </Text>
            </View>
          )}
          <Text style={ButtonStyles.titleText}>{text}</Text>
        </Animatable.View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => handlePress(characterIndex)}>
        <View style={ButtonStyles.innerContainerCharacterButton}>
          <Text style={ButtonStyles.titleTextCharacterButton}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);
