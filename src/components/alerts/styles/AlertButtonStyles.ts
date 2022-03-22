import { StyleSheet } from 'react-native';

import { Colors } from '../../../utils/colors';

export default StyleSheet.create({
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: 12.5,
    borderRadius: 10,
    backgroundColor: Colors.black,
    borderColor: Colors.yellow,
    borderWidth: 2,
    margin: 5,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.white,
  },
});
