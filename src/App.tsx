import './localizable';
import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, StatusBar, View, Platform, UIManager } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from './utils/colors';
import RootStore from './stores/RootStore';
import Router from './router/Router';

const rootStore = new RootStore();
const storesContext = React.createContext(rootStore);
export const useStores = () => React.useContext(storesContext);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = observer(() => {
  const {
    stores: {
      navigationStore: { setCurrentRouteName },
    },
  } = useStores();

  return (
    <View style={styles.container}>
      <Router onRouteChange={setCurrentRouteName} />
    </View>
  );
});

export default () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <App />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  safeAreaView: {
    flex: 1,
  },
});
