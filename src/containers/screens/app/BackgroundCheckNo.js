import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/BackgroundCheckNostyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Loader from '../../components/loader';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';

const BackgroundCheckNo = props => {
  const [convict, setConvict] = useState(false);
  const [convict1, setConvict1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const [checkstatus, setCheckstatus] = useState(true);

  return (
    <Container style={styles.container}>
      <NavBar
        lefttext={I18n.t('Back')}
        source={Images.backarrow}
        navigation={() => props.navigation.goBack()}
        rightText={I18n.t('background')}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={loading} />

      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setCheckstatus(false);
          }
        }}
        style={{paddingHorizontal: width * (5 / 375)}}>
        <View style={styles.VerifyTextView}>
          <Image source={Images.backgroundAlert} style={{}} />
          <Text style={[CommonStyles.SubHeadingText4, styles.VerifyText]}>
            {I18n.t('VerifyText')}
          </Text>
        </View>
        <Text
          style={[CommonStyles.HeadingText_medium, styles.JUDICIAL_HISTORY]}>
          {I18n.t('JUDICIAL_HISTORY')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <ImageBackground
            source={Images.Ellipse}
            style={styles.ImageBackgroundview}>
            <Text style={{alignSelf: 'center'}}>1</Text>
          </ImageBackground>
          <Image source={Images.line}></Image>
          <ImageBackground
            source={Images.EllipseYellow}
            style={styles.ImageBackgroundview}>
            <Text style={{alignSelf: 'center', color: colors.white}}>2</Text>
          </ImageBackground>
          <Image source={Images.line}></Image>
          <ImageBackground
            source={Images.Ellipse}
            style={styles.ImageBackgroundview}>
            <Text style={{alignSelf: 'center'}}>3</Text>
          </ImageBackground>
        </View>

        <Text style={[CommonStyles.HeadingText_medium, styles.statementtext]}>
          {I18n.t('statement')}
        </Text>

        <View style={styles.cnameview}>
          <Text
            style={[
              CommonStyles.SubHeadingText4,
              {
                marginLeft: width * (15 / 375),
                fontFamily: fonts.Bold,
                color: '#505050',
              },
            ]}>
            {I18n.t('i')},{' '}
            <Text style={{color: colors.yellow}}>
              {global.userName.toUpperCase()}
            </Text>{' '}
            {I18n.t('Cname')}:
          </Text>
          <View
           style={styles.criminal2View}>
            <Image source={Images.yellowCircle} style={{marginTop: 2}}></Image>
            <Text
              style={styles.criminaltext}>
              {I18n.t('i')}{' '}
              <Text style={{fontFamily: fonts.Bold}}>{I18n.t('havenot')}</Text>{' '}
              {I18n.t('criminal')}
            </Text>
          </View>
          <View
           style={styles.criminal2View}>
            <Image source={Images.yellowCircle} style={{marginTop: 2}}></Image>
            <Text
              style={styles.criminal2text}>
              {I18n.t('criminal1')}
            </Text>
          </View>
          <View
            style={styles.criminal2View}>
            <Image source={Images.yellowCircle} style={{marginTop: 2}}></Image>
            <Text
              style={styles.criminal2text}>
              {I18n.t('criminal2')}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: width * (40 / 375),
          marginBottom:
            Platform.OS == 'android' ? width * (30 / 375) : width * (50 / 375),
        }}>
        <Button
          buttonStyle={[
            styles.Smallbutton,
            {
              backgroundColor: convict == false ? colors.white : colors.yellow,
              borderWidth: convict == false ? width * (1 / 375) : 0,
              borderColor: convict == false ? colors.yellow : colors.white,
            },
          ]}
          label={I18n.t('Previous')}
          onPress={() => {
            props.navigation.goBack();
            setConvict(true);
            setConvict1(false);
          }}
          isLabel={true}
          buttonTextStyle={{
            color: convict == false ? colors.yellow : colors.white,
            fontSize: fontsize.Large,

            fontFamily: fonts.Bold,
          }}
        />
        <Button
          buttonStyle={[
            styles.Smallbutton,
            {
              backgroundColor:
                checkstatus == true ? colors.disblebutton : colors.yellow,
              borderWidth: checkstatus == true ? width * (1 / 375) : 0,
              borderColor:
                checkstatus == true ? colors.disablecolor : colors.yellow,
            },
          ]}
          label={I18n.t('Next')}
          disabled={checkstatus}
          onPress={() => {
            props.navigation.navigate('BackgroundCheckFinal');
            setConvict1(true);
            setConvict(false);
          }}
          isLabel={true}
          buttonTextStyle={{
            fontSize: fontsize.Large,

            fontFamily: fonts.Bold,
            color: checkstatus == true ? colors.disablecolor : colors.white,
          }}
        />
      </View>
    </Container>
  );
};
export default BackgroundCheckNo;
