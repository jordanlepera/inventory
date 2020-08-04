import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDarkModeContext } from 'react-native-dark-mode';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../../DevScreens/Styles/NeuIconButtonStyles';
import DarkThemeColors from '../../DevScreens/DevTheme/DarkThemeColors';
import LightThemeColors from '../../DevScreens/DevTheme/LightThemeColors';

const NeuIconButton = props => {
  const { elevation, borderRadius, iconName, iconSize, onPress } = props;
  const mode = useDarkModeContext();
  Icon.loadFont();

  const elevationStyle = StyleSheet.create({
    neumorphBox: {
      shadowRadius: elevation,
      borderRadius: borderRadius,
      backgroundColor:
        mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      width: 50,
      height: 50,
    },
    containerCommon: {
      borderRadius: borderRadius,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: '5%' }}>
      <NeomorphBox swapShadowLevel style={elevationStyle.neumorphBox}>
        <View style={styles.contentContainer}>
          <Icon
            name={iconName}
            size={iconSize}
            color={
              mode === 'light' ? LightThemeColors.color : DarkThemeColors.color
            }
          />
        </View>
      </NeomorphBox>
    </TouchableOpacity>
  );
};

export default NeuIconButton;
