import React from 'react';
import { observer } from 'mobx-react';
import DropdownAlert from 'react-native-dropdownalert';

import { useStores } from '../../App';
import { Colors } from '../../utils/colors';
import AlertsStyles from './styles/AlertsStyles';

export default observer(() => {
  const {
    stores: { alertStore },
  } = useStores();
  return (
    <>
      {/* Alerts tbc */}
      <DropdownAlert
        imageStyle={AlertsStyles.dropdownImage}
        infoColor={Colors.black}
        ref={alertStore.dropdownAlertRef}
        containerStyle={AlertsStyles.containerStyle}
      />
    </>
  );
});
