import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import NavBar from '../../components/NavBar';
import { width } from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import styles from '../../screens/app/styles/completeProfile';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import SignItOut from '../../components/SignItOut';
import { ShowStatusBarWhite } from '../../components/Statusbar';
import { Container, Content } from 'native-base';
import { getService } from '../../../services/getServices';
import apiName from '../../../constants/apiName';
import Loader from '../../components/loader';
import fonts from '../../../constants/fonts';
import fontsize from '../../../constants/i18n/Fontsizes';
const completeProfile = props => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [loading, setLoading] = useState(true)
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [profilestatus, setprofilestatus] = useState()
  const [workstatus, setWorkstatus] = useState()
  const [backgroundstatus, setBackgroundstatus] = useState()
  const [skillstatus, setSkillstatus] = useState()
  const [presentationstatus, setPresentationstatus] = useState()
  const [totalcompletecount, setTotalcompletecount] = useState(1)
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
        getUserProfile()
      }, 500);
    });
    return unsubscribeOnBlur;
  }, []);
  const _keyboardDidShow = e => {
    setMBottom(e.endCoordinates.height);
    setKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    setMBottom('100%');
    setKeyboardVisible(false);
  };
  const getUserProfile = () => {
    getService(apiName.homePage)
      .then(async res => {
        if (res.status == 200) {
          console.log('bbbkbkkbvkvkb', res)
          setprofilestatus(res.data.response.profile_information)
          setWorkstatus(res.data.response.work_experience)
          setBackgroundstatus(res.data.response.background_check)
          setSkillstatus(res.data.response.skill)
          setPresentationstatus(res.data.response.presentation)
          setTotalcompletecount(res.data.response.complete_count)
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getSkillList  api =====================>>',
          error,
        );
      });
  };

  return (
    <Container style={{ backgroundColor: colors.whitebackground, flex: 1 }}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Profilecompletion')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={loading} />
      <Content>
        <View style={styles.commonview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileInformation')}
            style={[
              styles.commonopacity,
              {
                backgroundColor:
                  profilestatus == 1
                    ? colors.lightYellow
                    : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle1, {}]}>
              <View style={[styles.circleview, {
                borderColor: profilestatus == 0 ? colors.disablecolor : colors.black,
                borderWidth: 1,
              }]}>
                <View
                  style={[
                    styles.viewStyle2,
                    {
                      backgroundColor:
                        profilestatus == 1
                          ? colors.yellow
                          : colors.whitebackground,
                    },
                  ]}></View>
              </View>
            </View>
            <View
              style={[
                styles.viewstyle3,
                { alignItems: 'flex-start', marginLeft: width * (15 / 375) },
              ]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {fontSize:fontsize.Medium,
                    fontFamily: fonts.Bold,
                    color:
                      profilestatus == 1 ? colors.black : profilestatus == 2 ? colors.black : colors.disablecolor,
                  },
                ]}>
                {I18n.t('Profile_Information')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {}]}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.commonview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('experience')}
            style={[
              styles.commonopacity,
              {
                backgroundColor:
                  workstatus == 1
                    ? colors.lightYellow
                    : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle1, {}]}>
              <View style={[styles.circleview, {
                borderColor: workstatus == 0 ? colors.disablecolor : colors.black,
                borderWidth: 1,
              }]}>
                <View
                  style={[
                    styles.viewStyle2,
                    {
                      backgroundColor:
                        workstatus == 1
                          ? colors.yellow
                          : colors.whitebackground,
                    },
                  ]}></View>
              </View>
            </View>
            <View
              style={[
                styles.viewstyle3,
                { alignItems: 'flex-start', marginLeft: width * (15 / 375) },
              ]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,

                  {fontSize:fontsize.Medium,
                    fontFamily: fonts.Bold,
                    color:
                      workstatus == 1 ? colors.black : workstatus == 2 ? colors.black : colors.disablecolor,
                  },
                ]}>
                {I18n.t('Workexperience')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {}]}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.commonview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('BackgroundCheck')}
            style={[
              styles.commonopacity,
              {
                backgroundColor:
                  backgroundstatus == 1
                    ? colors.lightYellow
                    : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle1, {}]}>
              <View style={[styles.circleview, {
                borderColor: backgroundstatus == 0 ? colors.disablecolor : colors.black,
                borderWidth: 1,
              }]}>
                <View
                  style={[
                    styles.viewStyle2,
                    {
                      backgroundColor:
                        backgroundstatus == 1
                          ? colors.yellow
                          : colors.whitebackground,
                    },
                  ]}></View>
              </View>
            </View>
            <View
              style={[
                styles.viewstyle3,
                { alignItems: 'flex-start', marginLeft: width * (15 / 375) },
              ]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {fontSize:fontsize.Medium,
                    fontFamily: fonts.Bold,
                    color:
                      backgroundstatus == 1 ? colors.black : backgroundstatus == 2 ? colors.black : colors.disablecolor,
                  },
                ]}>
                {I18n.t('background')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {}]}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.commonview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('skills')}
            style={[
              styles.commonopacity,
              {
                backgroundColor:
                  skillstatus == 1 ? colors.lightYellow : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle1, {}]}>
              <View style={[styles.circleview, {
                borderColor: skillstatus == 0 ? colors.disablecolor : colors.black,
                borderWidth: 1,
              }]}>
                <View
                  style={[
                    styles.viewStyle2,
                    {
                      backgroundColor:
                        skillstatus == 1
                          ? colors.yellow
                          : colors.whitebackground,
                    },
                  ]}></View>
              </View>
            </View>
            <View
              style={[
                styles.viewstyle3,
                { alignItems: 'flex-start', marginLeft: width * (15 / 375) },
              ]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {fontSize:fontsize.Medium,
                    fontFamily: fonts.Bold,
                    color:
                      skillstatus == 1 ? colors.black : skillstatus == 2 ? colors.black : colors.disablecolor,
                  },
                ]}>
                {I18n.t('Skills')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {}]}></View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.commonview,
            { borderBottomWidth: 1, borderBottomColor: '#ececec' },
          ]}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Presentation');
            }}
            style={[
              styles.commonopacity,
              {

                backgroundColor:
                  presentationstatus == 1
                    ? colors.lightYellow
                    : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle1, {}]}>
              <View style={[styles.circleview, {
                borderColor: presentationstatus == 0 ? colors.disablecolor : colors.black,
                borderWidth: 1,
              }]}>
                <View
                  style={[
                    styles.viewStyle2,
                    {
                      backgroundColor:
                        presentationstatus == 1
                          ? colors.yellow
                          : colors.whitebackground,
                    },
                  ]}></View>
              </View>
            </View>
            <View
              style={[
                styles.viewstyle3,
                { alignItems: 'flex-start', marginLeft: width * (15 / 375) },
              ]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {fontSize:fontsize.Medium,
                    fontFamily: fonts.Bold,
                    color:
                      presentationstatus == 1 ? colors.black : presentationstatus == 2 ? colors.black : colors.disablecolor,
                  },
                ]}>
                {I18n.t('Presentation')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {}]}></View>
          </TouchableOpacity>
        </View>
        {
          totalcompletecount < 3
            ?

            <View>
              <Image
                source={Images.rightCheck}
                resizeMode={'contain'}
                style={{ alignSelf: 'center', marginTop: width * (50 / 375) }}></Image>
            </View>
            :
            totalcompletecount == 3 || totalcompletecount < 5 ?
              <View>

                <Text
                  style={
                    styles.Thatittext}>
                  {I18n.t('Goodnews2')}
                </Text>
                <Text
                  style={styles.fullaccess}>
                  {I18n.t('access')}
                </Text>

                <Image
                  source={Images.rightCheck}
                  resizeMode={'contain'}
                  style={{ alignSelf: 'center', marginTop: width * (10 / 375) }}></Image>
              </View>
              :

              <View>

                <Text
                  style={
                    styles.Thatittext}>
                  {I18n.t('Thatit')}
                </Text>
                <Text
                  style={styles.fullaccess}>
                  {I18n.t('fullaccess')}
                </Text>

                <Image
                  source={Images.rightCheck}
                  resizeMode={'contain'}
                  style={{ alignSelf: 'center', marginTop: width * (10 / 375) }}></Image>
              </View>
        }
      </Content>
    </Container>
  );
};


export default completeProfile;
