import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useStores } from '../../../App';
import CharacterDetailsStyles from '../characters/styles/CharacterDetailsStyles';
import Modal from '../../../components/modals/Modal';
import { Localizable } from '../../../../packages/i18n';
import Images from '../../../utils/Images';
import { CharacterButton } from '../../../repository/models';
import Button from '../../../components/buttons/Button';

const renderButton = (
  { text, handlePress, characterButton, disabled }: CharacterButton,
  index: number,
  characterIndex: number,
  characterInFavorites: boolean,
) => {
  return (
    <Button
      disabled={disabled}
      text={text}
      handlePress={handlePress}
      index={index}
      infoLoaded={true}
      key={index}
      characterButton={characterButton}
      characterIndex={characterIndex}
      characterInFavorites={characterInFavorites}
    />
  );
};

export default observer(() => {
  const {
    stores: {
      layoutStore,
      appStore,
      charactersStore,
      favoritesStore,
      appStore: { setModalInvisable },
    },
  } = useStores();

  const characterIndex =
    charactersStore.charactersWithFilteredPlanets.findIndex(
      ({ name }) => name === charactersStore?.character?.name,
    );
  const characterInFavorites = favoritesStore.favoriteCharacters.some(
    ({ name }) => name === charactersStore?.character?.name,
  );
  return charactersStore?.character ? (
    <Modal isVisible={appStore.modalVisable}>
      <View
        style={[
          CharacterDetailsStyles.container,
          {
            width: layoutStore.screenWidth,
            height: layoutStore.screenHeight / 1.2,
          },
        ]}>
        <TouchableOpacity
          onPress={setModalInvisable}
          style={CharacterDetailsStyles.closeButton}>
          <Image
            source={Images.close.arrowDown}
            style={CharacterDetailsStyles.closeImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={CharacterDetailsStyles.characterDetails}>
          <Text style={CharacterDetailsStyles.characterText}>
            {Localizable.t('charactersList.name')}
            {charactersStore.character.name}
          </Text>
          <Text style={CharacterDetailsStyles.characterText}>
            {Localizable.t('charactersList.height')}
            {charactersStore.character.height}
          </Text>
          <Text style={CharacterDetailsStyles.characterText}>
            {Localizable.t('charactersList.gender')}
            {charactersStore.character.gender}
          </Text>
          <Text style={CharacterDetailsStyles.characterText}>
            {Localizable.t('charactersList.mass')}
            {charactersStore.character.mass}
          </Text>
          {!!charactersStore.characterPlanetInfo && (
            <>
              <Text style={CharacterDetailsStyles.characterText}>
                {Localizable.t('charactersList.planetName')}
                {charactersStore.characterPlanetInfo.name}
              </Text>
              <Text style={CharacterDetailsStyles.characterText}>
                {Localizable.t('charactersList.population')}
                {charactersStore.characterPlanetInfo.population}
              </Text>
              <Text style={CharacterDetailsStyles.characterText}>
                {Localizable.t('charactersList.climate')}
                {charactersStore.characterPlanetInfo.climate}
              </Text>
            </>
          )}
          <View style={CharacterDetailsStyles.buttonsContainer}>
            {charactersStore.characterDetailsButtons.map((button, index) =>
              renderButton(button, index, characterIndex, characterInFavorites),
            )}
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
});
