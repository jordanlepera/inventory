// An All Components Screen is a great way to dev and quick-test components
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import { createStackNavigator } from 'react-navigation-stack';
import { useDarkModeContext } from 'react-native-dark-mode';
import { ShadowBox } from 'react-native-neomorph-shadows';
import NeuButton from '../Examples/Components/NeuButton';
import NeuIconButton from '../Examples/Components/NeuIconButton';
import NeuSearchbar from '../Examples/Components/NeuSearchbar';
import Snackbar from '../Examples/Components/Snackbar';
import uniqueId from 'lodash/uniqueId';
import { Images } from './DevTheme';
import styles from './Styles/InventoryScreenStyles';
import Colors from './DevTheme/Colors';
import DarkThemeColors from './DevTheme/DarkThemeColors';
import LightThemeColors from './DevTheme/LightThemeColors';
import UpdateScreen from './UpdateScreen';
import AddScreen from './AddScreen';

const itemsTest = [
  {
    name: 'Lisbeth verte Litre',
    category: 'Boisson 🥤',
    price: 0.47,
    quantity: 12,
    lastUpdate: '29/08/2017 à 00:00:00',
    activated: true,
  },
  {
    name: 'Lisbeth bleue Litre',
    category: 'Boisson 🥤',
    price: 0.4,
    quantity: 12,
    lastUpdate: '29/08/2017 à 00:00:00',
    activated: false,
  },
  {
    name: 'Lisbeth rouge Litre',
    category: 'Boisson 🥤',
    price: 0.47,
    quantity: 12,
    lastUpdate: '29/08/2017 à 00:00:00',
    activated: true,
  },
  {
    name: 'Schweppes Tonic',
    category: 'Boisson 🥤',
    price: 0.47,
    quantity: 12,
    lastUpdate: '29/08/2017 à 00:00:00',
    activated: true,
  },
];

const InventoryScreen = props => {
  const { navigation } = props;
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [toggleSnackbar, setToggleSnackbar] = useState(false);
  const [snackBarSettings, setSnackBarSettings] = useState({
    backgroundColor: Colors.charcoal,
    color: Colors.snow,
    text: "L'article a été ajouté",
    duration: 3000,
  });
  const mode = useDarkModeContext();
  const windowWidth = useWindowDimensions().width;

  function onResult(QuerySnapshot) {
    console.log('Got Articles collection result.');
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('article')
      .onSnapshot(querySnapshot => {
        const articleList = [];

        querySnapshot.forEach(documentSnapshot => {
          articleList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setArticles(articleList);
        setLoadingArticles(false);
      });

    // const subscriber = firestore()
    //   .collection('article')
    //   .doc('aiKvM8EJXSVOf3Ln4duR')
    //   .onSnapshot(documentSnapshot => {
    //     const articleList = [];
    //     articleList.push({
    //       ...documentSnapshot.data(),
    //       key: documentSnapshot.id,
    //     });
    //     setArticles(articleList);
    //     setLoadingArticles(false);
    //   });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('category')
      .onSnapshot(querySnapshot => {
        const categoryList = [];

        querySnapshot.forEach(documentSnapshot => {
          categoryList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setCategories(categoryList);
        setLoadingCategories(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const openAdd = () => {
    navigation.navigate('AddScreen', {
      categories: categories,
      setSnackBarSettings: setSnackBarSettings,
      setToggleSnackbar: setToggleSnackbar,
    });
  };

  const inventoryScreenDynamicStyle = StyleSheet.create({
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
      height: 210,
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
  });

  const articlesList = articles.map(item => (
    <NeuButton
      article={item}
      categories={categories ? categories : []}
      key={uniqueId('article_')}
      elevation={20}
      borderRadius={20}
      navigation={navigation}
      toggleSnackbar={toggleSnackbar}
      setToggleSnackbar={setToggleSnackbar}
      setSnackBarSettings={setSnackBarSettings}
    />
  ));

  const Content = () => {
    if (loadingArticles || loadingCategories) {
      return <ActivityIndicator />;
    }
    return articlesList;
  };

  return (
    <View style={inventoryScreenDynamicStyle.backgroundContainer}>
      <Snackbar
        backgroundColor={snackBarSettings.backgroundColor}
        color={snackBarSettings.color}
        text={snackBarSettings.text}
        toggled={toggleSnackbar}
        setToggled={setToggleSnackbar}
        duration={snackBarSettings.duration}
        iconName={snackBarSettings.iconName}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10,
        }}>
        <Image source={Images.backButton} />
      </TouchableOpacity>
      <ShadowBox style={inventoryScreenDynamicStyle.topToolbarContainer}>
        <View style={styles.topToolbar}>
          <NeuIconButton
            elevation={10}
            borderRadius={10}
            iconName="download"
            iconSize={25}
            navigation={navigation}
          />
          <Text style={inventoryScreenDynamicStyle.logo}>INVENTORY</Text>
          <NeuIconButton
            elevation={10}
            borderRadius={10}
            iconName="plus"
            iconSize={25}
            navigation={navigation}
            onPress={openAdd}
          />
        </View>
        <NeuSearchbar style={{ marginTop: 25 }} borderRadius={30} />
      </ShadowBox>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ marginTop: -20 }}>
        <View style={{ marginTop: 45 }}>
          <Content />
        </View>
      </ScrollView>
    </View>
  );
};

const stackNavigator = createStackNavigator(
  {
    InventoryScreen: { screen: InventoryScreen },
    UpdateScreen: { screen: UpdateScreen },
    AddScreen: { screen: AddScreen },
  },
  {
    cardStyle: {
      opacity: 1,
      backgroundColor: '#3e243f',
    },
    initialRouteName: 'InventoryScreen',
    headerMode: 'none',
    // Keeping this here for future when we can make
    navigationOptions: {
      header: {
        left: (
          <TouchableOpacity onPress={() => window.alert('pop')}>
            <Image
              source={Images.closeButton}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        ),
        style: {
          backgroundColor: '#3e243f',
        },
      },
    },
  },
);

export default createAppContainer(stackNavigator);
