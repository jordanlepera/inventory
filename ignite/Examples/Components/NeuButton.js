import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useDarkModeContext } from 'react-native-dark-mode';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import firestore from '@react-native-firebase/firestore';
import styles from '../../DevScreens/Styles/NeuButtonStyles';
import LedButton from './LedButton';
import DarkThemeColors from '../../DevScreens/DevTheme/DarkThemeColors';
import LightThemeColors from '../../DevScreens/DevTheme/LightThemeColors';
import '@formatjs/intl-numberformat/polyfill';
import { NumberFormat } from '@formatjs/intl-numberformat';
NumberFormat.__addLocaleData(
  require('@formatjs/intl-numberformat/dist/locale-data/fr.json'), // locale-data for zh
);

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const NeuButton = props => {
  const {
    article,
    categories,
    elevation,
    borderRadius,
    toggleSnackbar,
    setToggleSnackbar,
    setSnackBarSettings,
    navigation,
  } = props;
  const [activated, setActivated] = useState(false);
  const mode = useDarkModeContext();
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    setActivated(article.is_included);
  }, [article]);

  const openUpdate = () => {
    navigation.navigate('UpdateScreen', {
      article: article,
      categories: categories,
      toggleSnackbar: toggleSnackbar,
      setToggleSnackbar: setToggleSnackbar,
      setSnackBarSettings: setSnackBarSettings,
    });
  };

  const elevationStyle = StyleSheet.create({
    neumorphBox: {
      shadowRadius: elevation,
      borderRadius: borderRadius,
      backgroundColor:
        mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      width: (windowWidth * 90) / 100,
      height: 150,
      marginHorizontal: '5%',
      marginVertical: 25,
    },
    containerCommon: {
      borderRadius: borderRadius,
    },
    text: {
      color: mode === 'light' ? LightThemeColors.color : DarkThemeColors.color,
    },
  });

  const handleLedButtonTouched = () => {
    if (article.is_included) {
      setActivated(false);
      ReactNativeHapticFeedback.trigger('notificationError', options);
    } else {
      setActivated(true);
      ReactNativeHapticFeedback.trigger('notificationSuccess', options);
    }
    firestore()
      .collection('article')
      .doc(article.key)
      .update({
        is_included: !article.is_included,
      });
  };

  return (
    <NeomorphBox swapShadowLevel style={elevationStyle.neumorphBox}>
      <TouchableOpacity
        onPress={() => {
          ReactNativeHapticFeedback.trigger('impactLight', options);
          openUpdate();
        }}>
        <View style={styles.contentContainer}>
          <Text style={[elevationStyle.text, styles.title]}>
            {article.name}
          </Text>
          <Text style={[elevationStyle.text, styles.title]}>
            {categories[article.category - 1].name}
          </Text>
          <Text style={styles.lineJump}>{'\n'}</Text>
          <Text style={elevationStyle.text}>
            Prix U.H.T. :{' '}
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }).format(article.price)}
          </Text>
          <Text style={elevationStyle.text}>Quantité : {article.quantity}</Text>
          <Text style={elevationStyle.text}>
            Modifié le : {article.last_update}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleLedButtonTouched()}
        style={{
          position: 'absolute',
          right: 15,
          top: 15,
        }}>
        <LedButton isActivated={activated} setActivated={setActivated} />
      </TouchableOpacity>
    </NeomorphBox>
  );
};

export default NeuButton;
