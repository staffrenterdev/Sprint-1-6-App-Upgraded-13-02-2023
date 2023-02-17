import React, {useContext, useEffect} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {Body, Button, Header, Icon, Left, Right} from 'native-base';
import colors from '../../constants/colors';


import {width} from '../../constants/ScreenSize';
import CommonStyles from '../../assets/css/commonStyles';
import fontsize from '../../constants/i18n/Fontsizes';
import fonts from '../../constants/fonts';

// Nav bar component
export default function NavBar({
  navigation,
  isRight = false,
  rightText,
  source,
  isLeft,
  lefttext,
  rightPress,
  bigText,
  isTextBlack=false,
  
}) {
  return (
    <View>
      <Header
        hasTabs
        style={[
          style.headerContainer,
          {
            backgroundColor: isTextBlack == false ? colors.white:colors.yellow,
          },
        ]}>
        <View
          style={{
            alignSelf:'center'
          }}>
          <Button style={style.leftBtn} transparent onPress={navigation}>
            <Image
              style={{
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={source}
            />
             <Text
      style={{
         color: isTextBlack==false?colors.yellow:colors.black,
        fontSize: fontsize.Regular,
        marginLeft: 2,
      }}>
      {lefttext}
    </Text>
          </Button>
        </View>
        <Right style={[{}]}>
          <Text style={[CommonStyles.SubHeadingText3,{fontFamily:fonts.Bold,marginRight:10,textAlign:'right'}]} onPress={rightPress}>
            {rightText}
          </Text>
        </Right>
        
      </Header>
    </View>
  );
}

const style = StyleSheet.create({
  backImage: {
    width: '100%',
    height: Platform.OS == 'ios' ? width * (190 / 375) : width * (160 / 375),
  },
  authLogo: {
    width: 90,
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: width * (5 / 375),
    marginTop: Platform.OS == 'ios' ? width * (50 / 375) : width * (60 / 375),
  },
  headerContainer: {
    flexDirection: 'row',
  },
  titleText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  leftBtn: {alignItems: 'center'},
  leftBtnBack: {
    padding: width * (2 / 375),

    marginLeft: 5,
  },
  leftBtnBack1: {
    padding: width * (2 / 375),

    position: 'absolute',
    marginTop: width * (45 / 375),
    marginLeft: width * (15 / 375),
  },
  leftBtnImg: {
    borderRadius: 100,
    resizeMode: 'cover',
  },
  bodyContainer: {
    zIndex: 9999,
    flex: 1,
  },
  rightContainer: {
    flex: 0.85,
    alignItems: 'center',
    paddingRight: 0,
  },
  centerImg: {
    marginLeft:
      Platform.OS == 'android' ? width * (8 / 375) : width * (10 / 375),
    height: width * (24 / 375),
    width: width * (24 / 375),
    resizeMode: 'contain',
  },
  centerImg1: {
    marginLeft: width * (8 / 375),
    height: width * (24 / 375),
    width: width * (24 / 375),
    resizeMode: 'contain',
    marginRight: width * (8 / 375),
  },
  notiContainer: {
    height: 20,
    width: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', 
    top: '-25%',
    left: Platform.OS == 'ios' ? '-27%' : '-5%',
  },
  notiCount: {
    color: '#ffffff', 
    fontSize: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.searchBg,
    height: width * (38 / 375),
    borderRadius: 5,
    alignItems: 'center',
  },

  searchText: {
    fontSize: 13,
    marginStart: width * (14 / 375),
    marginEnd: width * (14 / 375),
    flex: 1,
  },

  searchIcon: {
    marginEnd: 10,
  },
  heading: {
    color: colors.white,
    letterSpacing: 1.4,
    lineHeight: 30,
  },
  backText: {
    fontSize: fontsize.Regular,
    lineHeight: 17,
    letterSpacing: 0.84,
    color: colors.teal,
    alignSelf: 'center',
  },
});


