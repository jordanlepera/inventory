import React from 'react';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import { View, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import { useDarkModeContext } from 'react-native-dark-mode';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../DevScreens/Styles/NeuSearchbarStyles';
import DarkThemeColors from '../../DevScreens/DevTheme/DarkThemeColors';
import LightThemeColors from '../../DevScreens/DevTheme/LightThemeColors';

const NeuSearchbar = props => {
  const { borderRadius, style } = props;
  const mode = useDarkModeContext();
  const windowWidth = useWindowDimensions().width;
  Icon.loadFont();

  const searchBarInputStyles = StyleSheet.create({
    searchBarInput: {
      fontSize: 20,
      width: '100%',
      color: mode === 'light' ? LightThemeColors.color : DarkThemeColors.color,
    },
  });

  const combinedSearchbarStyles = StyleSheet.flatten([
    style,
    styles.searchBarContainer,
  ]);

  return (
    <View style={combinedSearchbarStyles}>
      <NeomorphBox
        inner
        lightShadowColor={
          mode === 'light'
            ? LightThemeColors.input.lightShadowColor
            : DarkThemeColors.input.lightShadowColor
        }
        darkShadowColor={
          mode === 'light'
            ? LightThemeColors.input.darkShadowColor
            : DarkThemeColors.input.darkShadowColor
        }
        style={{
          shadowRadius: 2,
          borderRadius: borderRadius,
          shadowOpacity: 1,
          backgroundColor:
            mode === 'light'
              ? LightThemeColors.backgroundColor
              : DarkThemeColors.backgroundColor,
          width: (windowWidth * 90) / 100,
          height: 50,
          zIndex: 1200,
        }}>
        <View style={styles.searchBarInnerContainer}>
          <Icon
            style={styles.searchIcon}
            name="search"
            size={20}
            color={
              mode === 'light' ? LightThemeColors.color : DarkThemeColors.color
            }
          />
          <TextInput
            style={searchBarInputStyles.searchBarInput}
            placeholder="Rechercher un article..."
            placeholderTextColor={
              mode === 'light'
                ? LightThemeColors.placeholderColor
                : DarkThemeColors.placeholderColor
            }
          />
        </View>
      </NeomorphBox>
    </View>
  );
};

export default NeuSearchbar;
