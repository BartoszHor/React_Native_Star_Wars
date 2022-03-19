import React from 'react';
import { observer } from 'mobx-react';
import { View, Text } from 'react-native';
import CharactersListStyles from '../characters/styles/CharactersStyles';
import { useStores } from '../../../App';
import { Localizable } from '../../../../packages/i18n';
import Loader from '../../../components/loader/Loader';

export default observer(() => {
  const {
    stores: { charactersStore },
  } = useStores();

  return charactersStore.allCharactersFetched ? (
    <View>
      <Text style={CharactersListStyles.listFooterText}>
        {Localizable.t('charactersList.:)')}
      </Text>
    </View>
  ) : (
    <Loader listView style={CharactersListStyles.listFooterLoader} />
  );
});
