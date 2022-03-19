import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';

export default StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: 'yellow',
    borderWidth: 2,
    marginVertical: 20,
    marginHorizontal: 60,
  },
  titleText: {
    shadowColor: Colors.white,
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 5 },
    fontWeight: '900',
    fontSize: 20,
    color: Colors.white,
    paddingVertical: 20,
    letterSpacing: 2,
  },
});
