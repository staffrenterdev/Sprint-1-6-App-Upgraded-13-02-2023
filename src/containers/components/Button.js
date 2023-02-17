import React from 'react';
import {TouchableOpacity, View, Keyboard, Text, Image} from 'react-native';
import colors from '../../constants/colors';
import { width} from '../../constants/ScreenSize';
import fontsize from '../../constants/i18n/Fontsizes';
export default function Button({
  onPress,
  label = 'CONTINUE',
  buttonStyle,
  buttonTextStyle,
  isleftImage = false,
  isleftImagepath,
  isLabel = false,
  isIcon = false,
  iconSrc,
  borderR = false,
  imageview,
  disabled = false,
  isleftImageStyle
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonContainerStyle, buttonStyle,{justifyContent:'center',alignItems:'center'}]}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}>
         {isleftImage && (
          <View style={{paddingRight:10}}>
            <Image source={isleftImagepath} />
          </View>
         )} 
      <View style={[[styles.viewstyle, imageview,{alignItems:'center',flex:isleftImage == true ?null:0.9}]]}>
        {isLabel && (
          <Text style={[styles.buttonTextDefaultStyle, buttonTextStyle,{alignSelf:'center'}]}>
            {label}
          </Text>
        )}
        {isIcon && (
          <View style={styles.loginIcon}>
            <Image source={iconSrc} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  buttonContainerStyle: {
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.whitebackground,
    borderRadius: 30,
    height: width * (50 / 375),
    borderColor: 'bordercolorButton',
  },

  buttonTextDefaultStyle: {
    color: colors.white,
    fontSize: fontsize.Large,

  },
  label: {
    fontSize: width * (15 / 375),
  },
  gradient: {
    opacity: 1,
    borderRadius: 5,
    elevation: 20,
  },
  Img: {
    marginHorizontal: 10,
  },
  loginIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginIcon2: {
    width: 24,
    height: 24,
    position:'relative',
    left:width*(35/375),
    justifyContent: 'center',
    
    alignItems: 'center',
  },
  viewstyle: {
    flex: 0.9,
    alignItems: 'center',
  },
};
