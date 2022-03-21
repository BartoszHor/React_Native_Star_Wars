import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.white,
    paddingHorizontal: 30,
  },
  characterDetails: {
    marginVertical: 40,
    flex: 1,
  },
  characterText: {
    shadowColor: Colors.white,
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 5 },
    fontWeight: '400',
    fontSize: 24,
    color: Colors.white,
    letterSpacing: 2,
    marginBottom: 30,
  },
  closeImage: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: -5,
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
});
