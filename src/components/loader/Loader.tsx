import React from 'react';
import { observer } from 'mobx-react';
import { View, ActivityIndicator } from 'react-native';
import { useStores } from '../../App';
import { Colors } from '../../utils/colors';
import LoaderStyles from './styles/LoaderStyles';

export default observer(() => {
  const {
    stores: { appStore },
  } = useStores();
  return appStore.loading ? (
    <View style={LoaderStyles.container}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  ) : null;
});
