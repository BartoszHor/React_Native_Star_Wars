import React from 'react';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { observer } from 'mobx-react';
import { View, ImageBackground } from 'react-native';
import { navigationRef } from '../stores/NavigationStore';
import Images from '../utils/Images';

const getCurrentRouteName = (
  state?: NavigationState | PartialState<NavigationState>,
): string => {
  if (!state) return '';
  const route = state.routes[state?.index || 0];
  if (route.state) {
    return getCurrentRouteName(route.state);
  }
  return route.name;
};

const Stack = createStackNavigator();

const Characters = () => (
  <View style={{ backgroundColor: 'black', flex: 1 }}>
    <ImageBackground
      source={Images.splash.splashBackground}
      resizeMode="cover"
      style={{ flex: 1 }}
    />
  </View>
);

const IosModalScreens = () => (
  <Stack.Navigator
    initialRouteName="Characters"
    screenOptions={{
      presentation: 'modal',
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }}>
    <Stack.Screen name="Characters" component={Characters} />
  </Stack.Navigator>
);

export default observer(
  ({ onRouteChange }: { onRouteChange: (routeName: string) => void }) => {
    return (
      <NavigationContainer
        ref={navigationRef}
        onStateChange={(state) => onRouteChange(getCurrentRouteName(state))}>
        <IosModalScreens />
      </NavigationContainer>
    );
  },
);
