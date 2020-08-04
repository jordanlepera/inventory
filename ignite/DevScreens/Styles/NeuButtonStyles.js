import { StyleSheet } from 'react-native';
import { Fonts } from '../DevTheme/';

export default StyleSheet.create({
  contentContainer: {
    ...Fonts.base,
    padding: 30,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  lineJump: {
    lineHeight: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 25,
  },
});
