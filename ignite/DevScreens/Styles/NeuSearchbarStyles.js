import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchBarContainer: {
    zIndex: 1000,
    width: '90%',
    height: 50,
    borderRadius: 30,
  },
  searchBarInnerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchIcon: {
    marginHorizontal: 10,
  },
});
