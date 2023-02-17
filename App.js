import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigations/AuthStack';
import { UserContext } from './src/containers/context/UserContext';
import { BackHandler } from 'react-native';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import FlashMessage from 'react-native-flash-message';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './src/containers/context/AuthContext';
import { useAuth } from './src/utils/useAuth';
import AuthLoadingScreen from './src/navigations/AuthLoadingScreen';
import I18n from './src/constants/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import AppStack from './src/navigations/AppStack';
global.appLang = false;
global.language = 'en';
global.updateLanguage = 'english';
global.lang = '';
global.apiToken = '';
global.lat = 56.1304;
global.lng = 106.3468;
global.quiz_status = '';
var watchID;
global.LanguageSelected = 'English';
global.isConnected = true;
global.apiGet = '';
global.BackCheckScreen = 'Background';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const App = () => {
  const { auth, state } = useAuth();
  const [netConnected, setNetConnected] = React.useState(true);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(lang => {
      var val = JSON.parse(lang);
      global.apiToken = val.api_token;
      global.quiz_status = val.quiz_status;
    });
  });
  React.useEffect(() => {
    AsyncStorage.getItem('appLanguage').then(lang => {
      var val = JSON.parse(lang);
      if (val) {
        global.appLang = true;
        global.language = val;
      }
      I18n.locale = val == 'en' || val == null ? 'en' : 'fr';
      global.language = I18n.locale;
      global.LanguageSelected = I18n.locale == 'en' ? 'English' : 'French';
    });
  });

  React.useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      (global.lat = info.coords.latitude), (global.lng = info.coords.longitude);
    });

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      async position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);

        const currentLatitude = JSON.stringify(position.coords.latitude);

        setCurrentLongitude(currentLongitude);

        setCurrentLatitude(currentLatitude);
        global.lat = position.coords.latitude;
        global.lng = position.coords.longitude;
        let curruntLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        await AsyncStorage.setItem(
          'curruntLocation',
          JSON.stringify(curruntLocation),
        );
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
        global.lat = position.coords.latitude;
        global.lng = position.coords.longitude;
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    NetInfo.addEventListener(handleConnectivityChange);
  });

  const handleConnectivityChange = state => {
    if (state.isConnected) {
      global.isConnected = true;
      setNetConnected(state.isConnected);
    } else {
      global.isConnected = false;
      setNetConnected(state.isConnected);
    }
  };

  const isConnected = async () => {
    await fetch('https://www.google.com/')
      .then(response => {
        if (response.ok) {
          global.isConnected = true;
          setNetConnected(true);
        }
      })
      .catch(error => {
        return false;
      });
  };

  const _renderModelView = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={!netConnected}
        onRequestClose={() => {
          BackHandler.exitApp();
        }}>
        <View
          style={{
            marginTop: 22,
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
          }}>
          <View style={{ justifyContent: 'center', marginBottom: 30 }}></View>
          <Text
            style={{
              alignSelf: 'flex-start',
              marginLeft: 24,
              fontSize: 20,
              fontWeight: '600',
            }}>
            {'Connection Failed!'}
          </Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              marginLeft: 24,
              marginTop: 16,
              marginBottom: 24,
              fontSize: 16,
              fontWeight: '400',
            }}>
            {
              'I tried my best but it looks like there is no connectivity. Please check your internet connection.'
            }
          </Text>
          <View style={{ height: 50 }}>
            <TouchableOpacity onPress={() => isConnected()}>
              <Text>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const _renderScreens = () => {
    if (state.loading) {
      return (
        <RootStack.Screen
          name={'AuthLoadingScreen'}
          component={AuthLoadingScreen}
        />
      );
    } else if (state.user) {
      global.token = state.user.token;
      global.device_id = state.user.device_id;
      global.email = state.user.email;

      return (
        <RootStack.Screen name={'AppStack'}>
          {() => (
            <UserContext.Provider value={state.user}>
              <AppStack />
            </UserContext.Provider>
          )}
        </RootStack.Screen>
      );
    } else {
      return <RootStack.Screen name={'AuthStack'} component={AuthStack} />;
    }
  };

  return (
    <Provider store={store}>
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {_renderScreens()}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
      {_renderModelView()}

      <FlashMessage position="top" />
    </Provider>
  );
};
export default App;
console.disableYellowBox = true;
