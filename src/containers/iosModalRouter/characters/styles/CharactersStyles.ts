import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  charactersListContainer: {
    backgroundColor: 'transparent',
    marginBottom: 20,
    borderTopColor: Colors.white,
    borderTopWidth: 0.4,
  },
  background: {
    flex: 1,
  },
  searchBar: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
    textAlignVertical: 'center',
    borderColor: 'white',
    opacity: 0.5,
    height: 28,
    paddingHorizontal: 5,
  },
  arrowDown: {
    height: 40,
    tintColor: Colors.white,
    alignSelf: 'center',
  },
  characterContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  characterInnerContainer: {
    backgroundColor: 'transparent',
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  characterName: {
    shadowColor: Colors.white,
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 5 },
    fontWeight: '500',
    fontSize: 16,
    color: Colors.white,
    letterSpacing: 2,
    paddingLeft: 5,
    paddingVertical: 10,
  },
  listFooterLoader: {
    marginBottom: 60,
  },
  listFooterText: {
    color: Colors.yellow,
    marginBottom: 60,
    alignSelf: 'center',
    letterSpacing: 2,
  },
  buttonsContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});
