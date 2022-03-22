import { StyleSheet } from 'react-native';

import { Colors } from '../../../utils/colors';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  alert: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderRadius: 10,
    borderColor: Colors.yellow,
    borderWidth: 2,
  },
  title: {
    fontWeight: '800',
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    marginVertical: 20,
    fontWeight: '500',
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  buttons: {
    alignSelf: 'stretch',
    marginTop: 15,
  },
});
