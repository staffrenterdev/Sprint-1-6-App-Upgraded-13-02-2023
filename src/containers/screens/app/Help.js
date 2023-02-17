import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import styles from '../../screens/app/styles/Helpstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container, Content} from 'native-base';
import SignItOut from '../../components/SignItOut';
import {ShowStatusBarWhite} from '../../components/Statusbar';
const Help = props => {
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [profile_info, setProfileInfo] = React.useState(true);
  const [experience, setExperience] = React.useState(true);
  const [backGroundCheck, setBackGroundCheck] = React.useState(true);
  const [interview, setInterview] = React.useState(true);

  return (
    <Container style={styles.Container}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Help')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />

      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Content>
        <View
          style={styles.mainview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('FAQ')}
            style={[
              styles.viewstyle,
              {
                padding: width * (15 / 375),
                justifyContent: 'space-between',
                backgroundColor: colors.whitebackground,
              },
            ]}>
            <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  styles.textnormal,
                  {
                    color:
                      profile_info == false ? colors.changeText : colors.black,
                  },
                ]}>
                {I18n.t('Frequently')}
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
           style={styles.mainview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Support')}
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
                  styles.textnormal,
                  {
                    
                    color: experience == false ? colors.black : colors.black,
                  },
                ]}>
                {I18n.t('Support')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {flex: 0}]}>
              <Image
                style={{resizeMode: 'contain'}}
                source={Images.LeftarrowIcon}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View  style={styles.mainview}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Term_conditions')}
            s
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
                  styles.textnormal,
                  {
                    color:
                      backGroundCheck == false
                        ? colors.changeText
                        : colors.black,
                   
                  },
                ]}>
                {I18n.t('Generalterms')}
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
          onPress={() => props.navigation.navigate('PrivacyPolicy')}
          style={[
            styles.viewstyle,
            styles.lastview
          ]}>
          <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
            <Text
              style={[
                CommonStyles.HeadingText3,
styles.textnormal,
                {
                
                  color: interview == false ? colors.changeText : colors.black,
                },
              ]}>
              {I18n.t('Privacy_policy')}
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

export default Help;
