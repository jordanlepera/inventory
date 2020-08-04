import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useDarkModeContext } from 'react-native-dark-mode';
import { NeomorphBox, ShadowBox } from 'react-native-neomorph-shadows';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../DevScreens/Styles/LedButtonStyles';
import DarkThemeColors from '../../DevScreens/DevTheme/DarkThemeColors';
import LightThemeColors from '../../DevScreens/DevTheme/LightThemeColors';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const LedButton = props => {
  const { isActivated, setActivated } = props;
  const mode = useDarkModeContext();

  const activatedColors = ['#70FFA3', '#00A93B'];
  const desactivatedColors = ['#FF8D8D', '#FF4E4E'];

  const elevationStyle = StyleSheet.create({
    neumorphBox: {
      shadowRadius: 3,
      borderRadius: 30,
      shadowOpacity: 1,
      backgroundColor:
        mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const ledLightStyle = StyleSheet.create({
    ledLight: {
      shadowColor: isActivated ? activatedColors[0] : desactivatedColors[0],
      backgroundColor: isActivated ? activatedColors[0] : desactivatedColors[0],
    },
    dynamicContentContainerValues: {
      width: 12,
      height: 12,
    },
  });

  const combineLedStyles = StyleSheet.flatten([
    styles.contentContainer,
    ledLightStyle.ledLight,
    ledLightStyle.dynamicContentContainerValues,
  ]);

  return (
    <NeomorphBox
      swapShadowLevel
      style={elevationStyle.neumorphBox}
      darkShadowColor={
        mode === 'light'
          ? LightThemeColors.outerShadow.shadowColor
          : DarkThemeColors.outerShadow.shadowColor
      }
      lightShadowColor={
        mode === 'light'
          ? LightThemeColors.innerShadow.shadowColor
          : DarkThemeColors.innerShadow.shadowColor
      }>
      <ShadowBox style={combineLedStyles} pointerEvents="none">
        <LinearGradient
          style={{ width: '100%', height: '100%', borderRadius: 15 }}
          colors={isActivated ? activatedColors : desactivatedColors}
          useAngle={true}
          angle={45}
          angleCenter={{ x: 0.5, y: 0.5 }}
        />
      </ShadowBox>
    </NeomorphBox>
  );
};

export default LedButton;
