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
import { navigationRef } from '../stores/NavigationStore';
import Characters from '../containers/iosModalRouter/characters/Characters';
import MainView from '../containers/iosModalRouter/mainView/MainView';

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

const IosModalScreens = () => (
  <Stack.Navigator
    initialRouteName="MainView"
    screenOptions={{
      presentation: 'modal',
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }}>
    <Stack.Screen name="MainView" component={MainView} />
    <Stack.Screen name="Characters" component={Characters} />
    {/* <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="ContactForm" component={ContactForm} /> */}
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
