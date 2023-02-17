import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import colors from '../constants/colors';
import Images from '../constants/images';

const AuthLoadingScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.maincontainer}>
        
        <Image source={Images.authLogo} style={styles.image} />
        <Text style={styles.text}>Loading ...</Text>
        <ActivityIndicator size="large" color={colors.yellow} />
        
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.white,
  },
  subcontainer: {flex: 0.4},
  image: {alignSelf: 'center'},
  text: {
    textAlign: 'center',
    color: colors.yellow,

    fontSize: 18,

    marginVertical: 10,
  },
});

export default AuthLoadingScreen;
