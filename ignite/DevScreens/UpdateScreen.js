// An All Components Screen is a great way to dev and quick-test components
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Picker,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { createAppContainer } from 'react-navigation';
import { useDarkModeContext } from 'react-native-dark-mode';
import { ShadowBox } from 'react-native-neomorph-shadows';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from '../Examples/Components/Snackbar';
import NeuIconButton from '../Examples/Components/NeuIconButton';
import styles from './Styles/UpdateScreenStyles';
import Colors from './DevTheme/Colors';
import DarkThemeColors from './DevTheme/DarkThemeColors';
import LightThemeColors from './DevTheme/LightThemeColors';
import { NumberFormat } from '@formatjs/intl-numberformat';
NumberFormat.__addLocaleData(
  require('@formatjs/intl-numberformat/dist/locale-data/fr.json'), // locale-data for fr
);

const UpdateScreen = props => {
  const { navigation } = props;

  const article = navigation.getParam('article');
  const setSnackBarSettings = navigation.getParam('setSnackBarSettings');
  const setToggleSnackbar = navigation.getParam('setToggleSnackbar');
  const categories = navigation.getParam('categories');

  const [selectedValue, setSelectedValue] = useState('');
  const [snackBarErrorSettings, setSnackBarErrorSettings] = useState({
    backgroundColor: Colors.charcoal,
    color: Colors.snow,
    text: "L'article a été ajouté",
    duration: 3000,
  });
  const [toggleSnackBarError, setToggleSnackBarError] = useState(false);
  const textInputPickerRef = useRef(null);
  const refRBSheet = useRef();
  const [values, setValues] = useState({
    name: '',
    category: 1,
    price: 0.0,
    quantity: 0,
  });

  const mode = useDarkModeContext();
  const windowWidth = useWindowDimensions().width;
  Icon.loadFont();

  useEffect(() => {
    setValues(article);
    setSelectedValue(article.category);
  }, [article]);

  const updateScreenDynamicStyle = StyleSheet.create({
    backgroundContainer: {
      backgroundColor:
        mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      height: '100%',
      width: '100%',
      flex: 1,
    },
    topToolbarContainer: {
      backgroundColor:
        mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      shadowColor:
        mode === 'light'
          ? LightThemeColors.outerShadow.shadowColor
          : DarkThemeColors.outerShadow.shadowColor,
      width: windowWidth,
      height: 150,
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 40,
      shadowOpacity: 0.9,
      shadowOffset: { width: 0, height: 40 },
      shadowRadius: 20,
      zIndex: 1000,
    },
    logo: {
      fontSize: 25,
      color: mode === 'light' ? LightThemeColors.color : DarkThemeColors.color,
      flex: 1,
      textAlign: 'center',
      letterSpacing: 6,
    },
    title: {
      fontSize: 25,
      color: mode === 'light' ? LightThemeColors.color : DarkThemeColors.color,
      fontWeight: '700',
    },
    formContainer: {
      shadowRadius: 30,
      borderRadius: 25,
      backgroundColor:
        mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      width: (windowWidth * 90) / 100,
      height: 570,
      marginHorizontal: '5%',
      marginTop: 20,
      padding: 30,
      alignItems: 'center',
    },
    inputContainer: {
      shadowRadius: 2,
      borderRadius: 30,
      shadowOpacity: 1,
      backgroundColor:
        mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      marginRight: '5%',
      height: 50,
      zIndex: 1200,
      marginVertical: 10,
    },
    incrementInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: (windowWidth * 90) / 100,
    },
    inputLabel: {
      color: mode === 'light' ? LightThemeColors.color : DarkThemeColors.color,
      fontSize: 20,
      marginTop: 25,
      fontWeight: '500',
    },
    input: {
      fontSize: 20,
      width: '100%',
      color: mode === 'light' ? LightThemeColors.color : DarkThemeColors.color,
    },
    saveButtonOuter: {
      shadowRadius: 3,
      borderRadius: 10,
      backgroundColor:
        mode === 'light'
          ? LightThemeColors.backgroundColor
          : DarkThemeColors.backgroundColor,
      width: (windowWidth * 90) / 100,
      height: 66,
      marginVertical: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: '5%',
    },
    saveButtonInner: {
      shadowRadius: 2,
      borderRadius: 4,
      shadowOpacity: 0.5,
      backgroundColor: '#40D7AE',
      width: (windowWidth * 90) / 100 - 20,
      height: 45,
      zIndex: 1200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '700',
    },
  });

  const inputBasicWidth = StyleSheet.create({
    inputWidth: {
      width: (windowWidth * 90) / 100 - 70,
    },
  });

  const inputIncrementWidth = StyleSheet.create({
    inputWidth: {
      width: ((windowWidth * 90) / 100 - 70) / 2.5,
    },
  });

  const inputBasicContainer = StyleSheet.flatten([
    updateScreenDynamicStyle.inputContainer,
    inputBasicWidth.inputWidth,
  ]);

  const inputIncrementContainer = StyleSheet.flatten([
    updateScreenDynamicStyle.inputContainer,
    inputIncrementWidth.inputWidth,
  ]);

  function save() {
    checkAndProcess();
    // const snackBarSettingsSuccess = {
    //   backgroundColor: Colors.success,
    //   color: Colors.snow,
    //   text: `L'article ${values.name} a été supprimé`,
    //   duration: 3000,
    // };
    // setSnackBarSettings(snackBarSettingsSuccess);
    // setToggleSnackbar(true);
    // navigation.goBack();
  }

  function updateArticle() {
    firestore()
      .collection('article')
      .doc(article.key)
      .update({
        category: values.category,
        is_included: true,
        last_update: moment().format('YYYY-MM-DD HH:mm:ss'),
        name: values.name,
        price: values.price,
        quantity: values.quantity,
      })
      .then(() => {
        const snackBarSettingsSuccess = {
          backgroundColor: Colors.success,
          color: Colors.snow,
          text: `L'article "${values.name}" a été modifié`,
          duration: 3000,
          iconName: 'check-circle',
        };
        setSnackBarSettings(snackBarSettingsSuccess);
        navigation.goBack();
        setToggleSnackbar(true);
        setTimeout(() => {
          setToggleSnackbar(false);
        }, 3000);
      });
  }

  function deleteArticle() {
    firestore()
      .collection('article')
      .doc(article.key)
      .delete()
      .then(() => {
        const snackBarSettingsSuccess = {
          backgroundColor: Colors.success,
          color: Colors.snow,
          text: `L'article "${values.name}" a été supprimé`,
          duration: 3000,
          iconName: 'check-circle',
        };
        setSnackBarSettings(snackBarSettingsSuccess);
        navigation.goBack();
        setToggleSnackbar(true);
        setTimeout(() => {
          setToggleSnackbar(false);
        }, 3000);
      });
  }

  function checkAndProcess() {
    if (
      values.price &&
      values.price !== 0 &&
      values.quantity &&
      values.quantity !== 0 &&
      values.name &&
      values.name !== '' &&
      values.category &&
      values.category !== 0
    ) {
      updateArticle();
    } else {
      const snackBarSettingsError = {
        backgroundColor: Colors.error,
        color: Colors.snow,
        text: "L'un des champs est invalide",
        duration: 3000,
        iconName: 'times-circle',
      };
      if (!values.price && values.price === 0) {
        snackBarSettingsError.text = 'Veuillez indiquez un prix valide';
      }
      if (!values.quantity && values.quantity === 0) {
        snackBarSettingsError.text = 'Veuillez indiquez une quantité valide';
      }
      if (!values.name && values.name === '') {
        snackBarSettingsError.text = 'Veuillez indiquez un nom valide';
      }
      if (!values.category && values.category === 0) {
        snackBarSettingsError.text = 'Veuillez sélectionnez une catégorie';
      }
      setSnackBarErrorSettings(snackBarSettingsError);
      setToggleSnackBarError(true);
      setTimeout(async () => {
        setToggleSnackBarError(false);
      }, snackBarErrorSettings.duration);
      // displayError()
    }
  }

  return (
    <View style={updateScreenDynamicStyle.backgroundContainer}>
      <Snackbar
        backgroundColor={snackBarErrorSettings.backgroundColor}
        color={snackBarErrorSettings.color}
        text={snackBarErrorSettings.text}
        toggled={toggleSnackBarError}
        setToggled={setToggleSnackBarError}
        duration={snackBarErrorSettings.duration}
        iconName={snackBarErrorSettings.iconName}
      />
      <View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              backgroundColor:
                mode === 'light'
                  ? LightThemeColors.backgroundColor
                  : DarkThemeColors.backgroundColor,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
            draggableIcon: {
              backgroundColor:
                mode === 'light'
                  ? LightThemeColors.color
                  : DarkThemeColors.color,
            },
          }}>
          <View
            style={{
              backgroundColor:
                mode === 'light'
                  ? LightThemeColors.backgroundColor
                  : DarkThemeColors.backgroundColor,
              color: 'white',
              borderRadius: 30,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 0,
                paddingBottom: 10,
                paddingRight: 20,
                paddingLeft: 20,
              }}>
              <Text
                style={{
                  flexGrow: 1,
                  textAlign: 'center',
                  color:
                    mode === 'light'
                      ? LightThemeColors.color
                      : DarkThemeColors.color,
                  fontSize: 20,
                }}>
                Sélectionnez une catégorie
              </Text>
            </View>
            <Picker
              style={{
                width: windowWidth,
                backgroundColor:
                  mode === 'light'
                    ? LightThemeColors.backgroundColor
                    : DarkThemeColors.backgroundColor,
              }}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(categories[itemIndex].id);
                setValues({ ...values, category: categories[itemIndex].id });
                refRBSheet.current.close();
              }}>
              {categories.map(category => (
                <Picker.Item
                  label={category.name}
                  value={category.id}
                  color={
                    mode === 'light'
                      ? LightThemeColors.color
                      : DarkThemeColors.color
                  }
                />
              ))}
            </Picker>
          </View>
        </RBSheet>
      </View>
      <ShadowBox style={updateScreenDynamicStyle.topToolbarContainer}>
        <View style={styles.topToolbar}>
          <NeuIconButton
            elevation={10}
            borderRadius={10}
            iconName="chevron-left"
            iconSize={25}
            navigation={navigation}
            onPress={() => navigation.goBack()}
          />
          <Text style={updateScreenDynamicStyle.logo}>INVENTORY</Text>
          <NeuIconButton
            elevation={10}
            borderRadius={10}
            iconName="trash"
            iconSize={25}
            navigation={navigation}
            onPress={() => deleteArticle()}
          />
        </View>
      </ShadowBox>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ marginTop: -20 }}
        keyboardDismissMode="none">
        <View style={{ marginTop: 45 }}>
          <NeomorphBox style={updateScreenDynamicStyle.formContainer}>
            <Text style={updateScreenDynamicStyle.title}>
              Modifier un article
            </Text>
            <Text style={updateScreenDynamicStyle.inputLabel}>
              Nom de l'article
            </Text>
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
              style={inputBasicContainer}>
              <View style={styles.searchBarInnerContainer}>
                <TextInput
                  style={updateScreenDynamicStyle.input}
                  defaultValue={values.name}
                  placeholder="Nom de l'article"
                  placeholderTextColor={
                    mode === 'light'
                      ? LightThemeColors.placeholderColor
                      : DarkThemeColors.placeholderColor
                  }
                  onChangeText={text => setValues({ ...values, name: text })}
                />
              </View>
            </NeomorphBox>
            <Text style={updateScreenDynamicStyle.inputLabel}>Catégorie</Text>
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
              style={inputBasicContainer}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <View style={styles.searchBarInnerContainer}>
                  <Text
                    ref={textInputPickerRef}
                    style={updateScreenDynamicStyle.input}
                    placeholder="Catégorie de l'article..."
                    placeholderTextColor={
                      mode === 'light'
                        ? LightThemeColors.placeholderColor
                        : DarkThemeColors.placeholderColor
                    }>
                    {selectedValue && selectedValue !== ''
                      ? categories[selectedValue - 1].name
                      : "Catégorie de l'article..."}
                  </Text>
                  <Icon
                    style={styles.searchIcon}
                    name="sort"
                    size={20}
                    color={
                      mode === 'light'
                        ? LightThemeColors.color
                        : DarkThemeColors.color
                    }
                  />
                </View>
              </TouchableOpacity>
            </NeomorphBox>
            <Text style={updateScreenDynamicStyle.inputLabel}>Prix U.H.T.</Text>
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
              style={inputBasicContainer}>
              <View style={styles.searchBarInnerContainer}>
                <TextInput
                  style={updateScreenDynamicStyle.input}
                  keyboardType="decimal-pad"
                  defaultValue={values.price && values.price !== '' ? new Intl.NumberFormat('fr-FR', {
                    minimumFractionDigits: 2,
                  }).format(values.price) : ''}
                  placeholder={new Intl.NumberFormat('fr-FR', {
                    minimumFractionDigits: 2,
                  }).format(0)}
                  placeholderTextColor={
                    mode === 'light'
                      ? LightThemeColors.placeholderColor
                      : DarkThemeColors.placeholderColor
                  }
                  onChangeText={text => {
                    const textPrepared = text.replace(',', '.');
                    setValues({ ...values, price: parseFloat(textPrepared) });
                  }}
                />
                <Icon
                  style={styles.searchIcon}
                  name="euro"
                  size={20}
                  color={
                    mode === 'light'
                      ? LightThemeColors.color
                      : DarkThemeColors.color
                  }
                />
              </View>
            </NeomorphBox>
            <Text style={updateScreenDynamicStyle.inputLabel}>Quantité</Text>
            <View style={updateScreenDynamicStyle.incrementInput}>
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
                style={inputIncrementContainer}>
                <View style={styles.searchBarInnerContainer}>
                  <TextInput
                    keyboardType="decimal-pad"
                    style={updateScreenDynamicStyle.input}
                    defaultValue={
                      values.quantity
                        ? new Intl.NumberFormat('fr-FR').format(values.quantity)
                        : new Intl.NumberFormat('fr-FR').format(0)
                    }
                    value={values.quantity}
                    placeholder="Quantité..."
                    placeholderTextColor={
                      mode === 'light'
                        ? LightThemeColors.placeholderColor
                        : DarkThemeColors.placeholderColor
                    }
                    onChangeText={text => {
                      const textPrepared = text.replace(',', '.');
                      setValues({
                        ...values,
                        quantity: parseFloat(textPrepared),
                      });
                    }}
                  />
                </View>
              </NeomorphBox>
              <NeuIconButton
                elevation={10}
                borderRadius={10}
                iconName="plus"
                iconSize={25}
                onPress={() => {
                  values.quantity = values.quantity + 1;
                  setValues({ ...values });
                }}
              />
              <NeuIconButton
                elevation={10}
                borderRadius={10}
                iconName="minus"
                iconSize={25}
                onPress={() => {
                  values.quantity =
                    values.quantity > 0 ? values.quantity - 1 : 0;
                  setValues({ ...values });
                }}
              />
            </View>
          </NeomorphBox>
          <NeomorphBox style={updateScreenDynamicStyle.saveButtonOuter}>
            <TouchableOpacity
              onPress={() => save()}
              style={{
                with: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <NeomorphBox
                inner
                swapShadowLevel
                style={updateScreenDynamicStyle.saveButtonInner}>
                <Text style={updateScreenDynamicStyle.buttonText}>
                  ENREGISTRER
                </Text>
              </NeomorphBox>
            </TouchableOpacity>
          </NeomorphBox>
        </View>
      </ScrollView>
    </View>
  );
};

export default createAppContainer(UpdateScreen);
