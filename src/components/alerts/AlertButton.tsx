import React from 'react';
import { observer } from 'mobx-react';
import { TouchableOpacity, Text } from 'react-native';
import { IAlertButton } from '../../repository/models';
import AlertButtonStyles from './styles/AlertButtonStyles';

export default observer(({ text, onPress }: IAlertButton) => {
  return (
    <TouchableOpacity style={AlertButtonStyles.button} onPress={onPress}>
      <Text style={AlertButtonStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
});
