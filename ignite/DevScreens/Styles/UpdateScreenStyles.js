import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../DevTheme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topToolbar: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 60,
  },
  searchBarContainer: {
    zIndex: 1000,
    width: '90%',
    height: 50,
    borderRadius: 30,
  },
  searchBarInnerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    flexDirection: 'row',
  },
  inputIcon: {
    marginHorizontal: 10,
  },
});
