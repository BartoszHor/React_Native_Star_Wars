import React from 'react';
import { observer } from 'mobx-react';
import { View, ActivityIndicator } from 'react-native';
import { useStores } from '../../App';
import { Colors } from '../../utils/colors';
import LoaderStyles from './styles/LoaderStyles';

export default observer(({ listView, style: listStyle }) => {
  const {
    stores: { appStore },
  } = useStores();
  return appStore.loading || listView ? (
    <View style={listView ? listStyle : LoaderStyles.container}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  ) : null;
});
