import React from 'react';
import { observer } from 'mobx-react';
import { View, Text } from 'react-native';
import { useStores } from '../../App';
import { Alert, IAlertButton } from '../../repository/models';
import AlertButton from './AlertButton';
import AlertStyles from './styles/AlertStyles';

export default observer(({ title, text, buttons }: Alert) => {
  const {
    stores: {
      alertStore: { dismissAlert },
    },
  } = useStores();
  return (
    <View style={[AlertStyles.container]}>
      <View style={AlertStyles.background} />
      <View style={AlertStyles.alert}>
        {!!title && <Text style={AlertStyles.title}>{title}</Text>}
        {!!text && <Text style={AlertStyles.text}>{text}</Text>}
        <View style={AlertStyles.buttons}>
          {buttons.map((button: IAlertButton, index: number) => (
            <AlertButton {...button} onPress={dismissAlert} key={index} />
          ))}
        </View>
      </View>
    </View>
  );
});
