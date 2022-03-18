import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';

export default StyleSheet.create({
  container: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashScreenText: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 200,
  },
});
