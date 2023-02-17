import React, {} from 'react';
import { Platform, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Job from '../containers/screens/app/Job';
import Wallet from '../containers/screens/app/Wallet';
import Notification from '../containers/screens/app/Notification';
import Home from '../containers/screens/app/Home';
import Contacts from '../containers/screens/app/Contacts';
import colors from '../constants/colors';
import I18n from '../constants/i18n';
import Images from '../constants/images';
const Tab = createBottomTabNavigator();

function BottomtabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        headerShown:false,
        tabBarStyle: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
            
            elevation: 12,
        
        },
        tabBarHideOnKeyboard:true,
          tabBarIcon: ({ focused, color, size }) => {
              let image;
              if (route.name == 'Profile') {
                  image = focused ?
                      <Image source={Images.profile1} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
                      : <Image source={Images.profile} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
              } else if (route.name == 'Job') {
                  image = focused ?
                      <Image source={Images.job1} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
                      : <Image source={Images.job} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
              }  else if (route.name == 'Contracts') {
                  image = focused ?
                      <Image source={Images.contacts1} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
                      : <Image source={Images.contacts} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
              }
               else if (route.name == 'Wallet') {
                  image = focused ?
                      <Image source={Images.wallet1} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
                      : <Image source={Images.wallet} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
              }
              else if (route.name == 'Notification') {
                image = focused ?
                    <Image source={Images.notification1} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
                    : <Image source={Images.notification} style={{ width: 30, height: 30, resizeMode: 'cover', marginTop: 5 }} />
            }
            
              return image;
          },
      })}
          tabBarOptions={{
              activeTintColor: colors.yellow, 
              labelStyle: {
                  fontSize: 12,
                  paddingBottom: Platform.OS === 'android' ? 1 : 0,
                
              },
             
            
              allowFontScaling: false
          }}>
      <Tab.Screen name="Profile" component={Home} options={{ title: I18n.t('Profile') }}  />
      <Tab.Screen name="Job" component={Job}  options={{ title: I18n.t('Job') }} />
      <Tab.Screen name="Contracts" component={Contacts} options={{ title: I18n.t('Contracts') }} />
      <Tab.Screen name="Wallet" component={Wallet} options={{ title: I18n.t('Wallet') }} />
      <Tab.Screen name="Notification" component={Notification} options={{ title: I18n.t('Notification') }} />
    </Tab.Navigator>
  );
}

export default BottomtabNavigator;
