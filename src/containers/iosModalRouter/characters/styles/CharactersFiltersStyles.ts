import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  closeImage: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
  },
});
