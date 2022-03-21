import './localizable';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  StyleSheet,
  StatusBar,
  View,
  Platform,
  UIManager,
  LogBox,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './utils/colors';
import RootStore from './stores/RootStore';
import Router from './router/Router';
import SplashScreen from './containers/splash/SplashScreen';
import Loader from './components/loader/Loader';
import Alerts from './components/alerts/Alerts';

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
      appStore: { appDidMount },
      navigationStore: { setCurrentRouteName },
      splashScreenStore,
    },
  } = useStores();
  useEffect(() => {
    componentDidMount();
    return () => console.log('to do all actions on app unmount');
  }, []);

  const componentDidMount = async () => {
    LogBox.ignoreAllLogs();
    await appDidMount();
  };

  return (
    <View style={styles.container}>
      <Router onRouteChange={setCurrentRouteName} />
      <Loader />
      <Alerts />
      {splashScreenStore.reactSplashShown && <SplashScreen />}
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
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
