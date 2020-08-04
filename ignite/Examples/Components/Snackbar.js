import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { useDarkModeContext } from 'react-native-dark-mode';
import Colors from '../../DevScreens/DevTheme/Colors';
import DarkThemeColors from '../../DevScreens/DevTheme/DarkThemeColors';
import LightThemeColors from '../../DevScreens/DevTheme/LightThemeColors';

const Snackbar = props => {
  const {
    backgroundColor,
    color,
    text,
    toggled,
    setToggled,
    duration,
    iconName,
  } = props;
  const [toggledAnim, setToggledAnim] = useState(false);
  // const snackBarViewRef = useRef(null);
  const windowWidth = useWindowDimensions().width;
  const mode = useDarkModeContext();

  const snackBarStyle = StyleSheet.create({
    snackBarContainer: {
      width: (windowWidth * 90) / 100,
      maxHeight: 70,
      height: 70,
      justifyContent: 'center',
      marginHorizontal: '5%',
      backgroundColor: backgroundColor
        ? backgroundColor
        : mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      color: Colors.snow,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOpacity: 0.51,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 13.16,
      display: 'flex',
    },
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setToggled(false);
  //   }, duration);
  // }, []);

  return (
    <Modal
      isVisible={toggled}
      style={snackBarStyle.snackBarContainer}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      animationOutTiming={1500}
      swipeDirection="up"
      hasBackdrop={false}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          padding: 15,
          alignItems: 'center',
        }}>
        <Icon name={iconName} size={30} color={Colors.snow} />
        <Text style={{ color: Colors.snow, marginLeft: 16 }}>{text}</Text>
      </View>
    </Modal>
  );
};

export default Snackbar;
