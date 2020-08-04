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
});
