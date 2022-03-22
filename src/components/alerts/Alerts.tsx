import React from 'react';
import { observer } from 'mobx-react';
import DropdownAlert from 'react-native-dropdownalert';
import { useStores } from '../../App';
import { Colors } from '../../utils/colors';
import AlertsStyles from './styles/AlertsStyles';
import Alert from '../alerts/Alert';

export default observer(() => {
  const {
    stores: { alertStore },
  } = useStores();
  return (
    <>
      {alertStore.alerts.map((alert, index) => (
        <Alert {...alert} key={index} />
      ))}
      <DropdownAlert
        imageStyle={AlertsStyles.dropdownImage}
        infoColor={Colors.black}
        ref={alertStore.dropdownAlertRef}
        containerStyle={AlertsStyles.containerStyle}
      />
    </>
  );
});
