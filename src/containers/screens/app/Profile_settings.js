import React, {useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, Keyboard} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import styles from '../../screens/app/styles/Profile_settingsstyles';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container, Content} from 'native-base';
import {connect} from 'react-redux';
import {handleErrorTwo} from '../../components/ErrorComponent';
import {SUCCESS, ERROR, LOADING} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import SignItOut from '../../components/SignItOut';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
import homeA from '../../../redux/actions/homeA';

const Profile_settings = props => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);

  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [profile_info, setProfileInfo] = React.useState(true);
  const [experience, setExperience] = React.useState(true);
  const [backGroundCheck, setBackGroundCheck] = React.useState(true);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      setTimeout(() => {
        props.homeRequest();
      }, 100);
    });
    return unsubscribeOnBlur;
  }, []);

  useEffect(() => {
    const homeRes = props.homeRes.homeR;

    if (homeRes.status == LOADING) {
    } else if (homeRes.status == SUCCESS) {
      props.defaultRequest();
    } else if (homeRes.status == ERROR) {
      setAgreeLogout(handleErrorTwo(homeRes));
      props.defaultRequest();
    }
  }, [props.homeRes]);

  const _keyboardDidShow = e => {
    setMBottom(e.endCoordinates.height);
    setKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    setMBottom('100%');
    setKeyboardVisible(false);
  };

  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Profilesettings')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />

      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Content>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('BackgroundCheck')}
            style={[
              styles.viewstyle,
              {
                padding: width * (15 / 375),
                justifyContent: 'space-between',
                backgroundColor:
                  profile_info == false
                    ? colors.lightYellow
                    : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {
                    fontFamily: fonts.Regular,
                    color:
                      profile_info == false ? colors.changeText : colors.black,
                    fontSize: fontsize.Regular,
                  },
                ]}>
                {I18n.t('background')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {flex: 0}]}>
              <Image
                style={{resizeMode: 'contain'}}
                source={Images.LeftarrowIcon}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.maintouchview,{
            
            borderTopWidth: 1,
           
          }]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Preferences')}
            style={[
              styles.viewstyle,
              {
                justifyContent: 'space-between',
                padding: width * (15 / 375),
                backgroundColor:
                  experience == false
                    ? colors.lightYellow
                    : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,

                  {
                    fontFamily: fonts.Regular,
                    color: experience == false ? colors.black : colors.black,
                    fontSize: fontsize.Regular,
                  },
                ]}>
                {I18n.t('Preferences')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {flex: 0}]}>
              <Image
                style={{resizeMode: 'contain'}}
                source={Images.LeftarrowIcon}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.maintouchview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Communication')}
            style={[
              styles.viewstyle,
              {
                padding: width * (15 / 375),
                justifyContent: 'space-between',
                backgroundColor:
                  backGroundCheck == false
                    ? colors.lightYellow
                    : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {
                    fontFamily: fonts.Regular,
                    color:
                      backGroundCheck == false
                        ? colors.changeText
                        : colors.black,
                    fontSize: fontsize.Regular,
                  },
                ]}>
                {I18n.t('Communications')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {flex: 0}]}>
              <Image
                style={{resizeMode: 'contain'}}
                source={Images.LeftarrowIcon}></Image>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('document')}
          style={[
            styles.viewstyle,
            styles.lastviewtouch,
            {
              
              backgroundColor:
                backGroundCheck == false
                  ? colors.lightYellow
                  : colors.whitebackground,
            },
          ]}>
          <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
            <Text
              style={[
                CommonStyles.HeadingText3,
                {
                  fontFamily: fonts.Regular,
                  color:
                    backGroundCheck == false ? colors.changeText : colors.black,
                  fontSize: fontsize.Regular,
                },
              ]}>
              {I18n.t('Documents')}
            </Text>
          </View>
          <View style={[styles.viewstyle1, {flex: 0}]}>
            <Image
              style={{resizeMode: 'contain'}}
              source={Images.LeftarrowIcon}></Image>
          </View>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    homeRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    homeRequest: () => {
      dispatch(homeA());
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile_settings);
