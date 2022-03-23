import { StyleSheet } from 'react-native';

import { Colors } from '../../../../utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  background: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  arrowDown: {
    height: 40,
    tintColor: Colors.white,
    alignSelf: 'center',
  },
  inputContainerFlex: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: '200',
    color: Colors.white,
    marginBottom: 5,
  },
  input: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: '400',
    borderColor: Colors.yellow,
    borderWidth: 2,
    color: Colors.white,
  },
  submitButton: {
    marginVertical: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 15,
    borderColor: Colors.red,
    borderWidth: 1,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '400',
  },
  separator: {
    width: 15,
  },
  scrollView: {
    paddingTop: 20,
    borderTopColor: Colors.white,
    borderWidth: 1,
    borderTopWidth: 0.4,
  },
});
