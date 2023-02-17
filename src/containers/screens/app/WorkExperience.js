import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import NavBar from '../../components/NavBar';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import styles from '../../screens/app/styles/WorkExperiencestyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container, Content} from 'native-base';
import SignItOut from '../../components/SignItOut';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
const WorkExperience = props => {
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [profile_info, setProfileInfo] = React.useState(true);
  const [experience, setExperience] = React.useState(true);
  const [backGroundCheck, setBackGroundCheck] = React.useState(true);
  const [skills, setSkills] = React.useState(true);
  const [interview, setInterview] = React.useState(true);

  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Professionsection')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Content>
        <View style={styles.maintouchview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Presentation')}
            style={[styles.viewstyle, styles.Presentationview]}>
            <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {
                    fontFamily: fonts.Regular,
                    fontSize: fontsize.Regular,
                    color:
                      profile_info == false ? colors.changeText : colors.black,
                  },
                ]}>
                {I18n.t('Presentation')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {flex: 0}]}>
              <Image
                style={{resizeMode: 'contain'}}
                source={Images.LeftarrowIcon}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('experience')}
            style={[
              styles.viewstyle,
              styles.Presentationview,
              {
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
                    fontSize: fontsize.Regular,
                    color: experience == false ? colors.black : colors.black,
                  },
                ]}>
                {I18n.t('Workexperience')}
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
          style={[
            styles.maintouchview,
            {
              borderTopWidth: 1,
            },
          ]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('skills')}
            style={[
              styles.viewstyle,
              styles.Presentationview,
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
                      backGroundCheck == false
                        ? colors.changeText
                        : colors.black,
                    fontSize: fontsize.Regular,
                  },
                ]}>
                {I18n.t('Skills')}
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
            onPress={() =>
              props.navigation.navigate('EducationandCertification')
            }
            style={[
              styles.viewstyle,
              styles.Presentationview,
              {
                backgroundColor:
                  skills == false ? colors.lightYellow : colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,

                  {
                    fontFamily: fonts.Regular,
                    fontSize: fontsize.Regular,
                    color: skills == false ? colors.black : colors.black,
                  },
                ]}>
                {I18n.t('Educationcertification')}
              </Text>
            </View>
            <View
              style={[styles.viewstyle1, {flex: 0, alignItems: 'baseline'}]}>
              <Image
                style={{resizeMode: 'contain'}}
                source={Images.LeftarrowIcon}></Image>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('References')}
          style={[
            styles.viewstyle,
            styles.lastviewtouch,
            {
              backgroundColor:
                interview == false
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
                  color: interview == false ? colors.changeText : colors.black,
                  fontSize: fontsize.Regular,
                },
              ]}>
              {I18n.t('References')}
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
export default WorkExperience;
