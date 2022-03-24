import { StyleSheet } from 'react-native';

import { Colors } from '../../../../utils/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: Colors.white,
    marginHorizontal: 5,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  planet: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.white,
    letterSpacing: 2,
  },

  selectedView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
  unselectedView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderColor: Colors.red,
    borderWidth: 1,
  },
  selectedIcon: {
    width: 15,
    height: 15,
    tintColor: Colors.black,
  },
  unselectedIcon: {
    width: 15,
    height: 15,
    tintColor: Colors.white,
  },
});
