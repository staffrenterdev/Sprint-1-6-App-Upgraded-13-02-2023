import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/BackgroundCheckFinalstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import moment from 'moment';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Loader from '../../components/loader';
import Orientation from 'react-native-orientation';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';

const BackgroundCheckFinal = props => {
  const [state, setState] = useState({
    currentDate1: moment(new Date()).format('YYYY-MM-DD'),
  });
  const [remember, setRemember] = useState(false);
  const [remember2, setRemember2] = useState(false);
  const [convict, setConvict] = useState(false);
  const [convict1, setConvict1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [agreeLogout, setAgreeLogout] = React.useState(false);

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {});
    return unsubscribeOnBlur;
  }, []);

  const Submit1 = () => {
    props.navigation.navigate('signature');
  };

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      const initial = Orientation.getInitialOrientation();
      setTimeout(() => {
        Orientation.lockToPortrait();
      }, 600);
    });
    return unsubscribeOnBlur;
  }, []);

  return (
    <View style={styles.container}>
      <NavBar
        lefttext={I18n.t('Back')}
        source={Images.backarrow}
        navigation={() => props.navigation.goBack()}
        rightText={I18n.t('background')}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={loading} />

      <ScrollView style={{paddingHorizontal: width * (5 / 375)}}>
        <View
          style={styles.VerifyTextView}>
          <Image source={Images.backgroundAlert} style={{}} />
          <Text
            style={[
              CommonStyles.SubHeadingText4,
             styles.VerifyText
            ]}>
            {I18n.t('VerifyText')}
          </Text>
        </View>
        <Text
          style={[
            CommonStyles.HeadingText_medium,
            styles.FconsentText,
          ]}>
          {I18n.t('Fconsent')}
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
            source={Images.Ellipse}
            style={styles.ImageBackgroundview}>
            <Text style={{alignSelf: 'center'}}>2</Text>
          </ImageBackground>
          <Image source={Images.line}></Image>
          <ImageBackground
            source={Images.EllipseYellow}
            style={styles.ImageBackgroundview}>
            <Text style={{alignSelf: 'center', color: colors.white}}>3</Text>
          </ImageBackground>
        </View>
        <Text
          style={styles.Makingfalsetext}>
          {I18n.t('Makingfalse')}
        </Text>
        <Text
          style={[
            CommonStyles.HeadingText_medium,
            styles.GeneralnoticeText
          ]}>
          {I18n.t('Generalnotice')}
        </Text>
        <View style={{marginHorizontal: 15, marginTop: 30, marginBottom: 50}}>
          <Image source={Images.Finalnotice} />
        </View>

        <TouchableOpacity
          onPress={() => setRemember(!remember)}
          style={{flexDirection: 'row', marginHorizontal: 15}}>
          <View
            style={
              remember == true
                ? {
                    borderColor: colors.disablecolor,
                    height: width * (20 / 375),
                    width: width * (20 / 375),
                  }
                : {
                    borderColor: colors.disablecolor,
                    height: width * (20 / 375),
                    width: width * (20 / 375),
                    borderWidth: 2,
                    borderRadius: 3,
                  }
            }>
            {remember == true && (
              <Image
                source={Images.Remember}
                style={{height: '100%', width: '100%'}}
              />
            )}
          </View>

          <Text
            style={styles.agreeText}>
            {I18n.t('agree')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRemember2(!remember2)}
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            marginVertical: width * (20 / 375),
          }}>
          <View
            style={
              remember2 == true
                ? {
                    borderColor: colors.disablecolor,
                    height: width * (20 / 375),
                    width: width * (20 / 375),
                  }
                : {
                    borderColor: colors.disablecolor,
                    height: width * (20 / 375),
                    width: width * (20 / 375),
                    borderWidth: 2,
                    borderRadius: 3,
                  }
            }
            onPress={() => setRemember2(!remember2)}>
            {remember2 == true && (
              <Image
                source={Images.Remember}
                style={{height: '100%', width: '100%'}}
              />
            )}
          </View>

          <Text
            style={styles.certifytext}>
            {I18n.t('certify')}
          </Text>
        </TouchableOpacity>
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
          buttonStyle={[styles.Previousbutton,{
            
            backgroundColor: convict == false ? colors.white : colors.yellow,
            borderWidth: convict == false ? width * (1 / 375) : 0,
            borderColor: convict == false ? colors.yellow : colors.white,
          }]}
          label={I18n.t('Previous')}
          onPress={() => {
            setConvict(true);
            setConvict1(false);
            props.navigation.goBack();
          }}
          isLabel={true}
          buttonTextStyle={{
            fontSize: fontsize.Large,
            fontFamily: fonts.Bold,
            color: convict == false ? colors.yellow : colors.white,
          }}
        />
        <Button
          buttonStyle={[styles.Previousbutton,{
           
            backgroundColor:
              remember == false || remember2 == false
                ? colors.disblebutton
                : colors.yellow,
            borderWidth: remember == false || remember2 == false ? 1 : 0,
            borderColor: colors.grayborder,
          }]}
          label={I18n.t('signit')}
          onPress={() => {
            setConvict1(true);
            setConvict(false);
            remember == false || remember2 == false
              ? setState({...state, errorTerms: 'dkkdokok'})
              : Submit1();
          }}
          disabled={remember == false || remember2 == false ? true : false}
          isLabel={true}
          buttonTextStyle={{
            fontSize: fontsize.Large,
            fontFamily: fonts.Bold,
            color:
              remember == false || remember2 == false
                ? colors.disablecolor
                : colors.white,
          }}
        />
      </View>
    </View>
  );
};
export default BackgroundCheckFinal;
