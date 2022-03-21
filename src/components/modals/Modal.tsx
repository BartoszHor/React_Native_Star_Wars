import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';

import ModalStyles from './styles/ModalStyles';

export default observer(
  ({ children, isVisible }: { children: any; isVisible: boolean }) => {
    const [visible, setVisible] = useState(false);
    const [animatedValue] = useState(new Animated.Value(0));
    useEffect(() => {
      if (isVisible) {
        setVisible(true);
        Animated.timing(animatedValue, {
          toValue: 100,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      }
    }, [isVisible]);
    return visible ? (
      <>
        <Animated.View style={ModalStyles.background} />
        <Animated.View
          style={[
            ModalStyles.container,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}>
          {children}
        </Animated.View>
      </>
    ) : null;
  },
);
