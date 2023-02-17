import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container, Content} from 'native-base';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
import Loader from '../../components/loader';
import apiName from '../../../constants/apiName';
import {getService} from '../../../services/getServices';
import Map from './map';
const AboutUs = props => {
  const [facebooklink, setFacebooklink] = useState();
  const [linkedinlink, setLinkedinlink] = useState();
  const [instagramlink, setInstagramlink] = useState();
  const [twitterlink, setTwitterlink] = useState();
  const [emaillink, setEmaillink] = useState();
  const [address, setAddress] = useState();
  const [contectnumber, setContectnumber] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      getAnalytics();
    });
    return unsubscribeOnBlur;
  }, []);
  const getAnalytics = () => {
    getService(apiName.Aboutus)
      .then(async res => {
        setLoading(true);
        if (res.status == 200) {
          setLoading(false);

          setFacebooklink(res.data.response.facebook_link);
          setLinkedinlink(res.data.response.linkedin_link);
          setInstagramlink(res.data.response.instagram_link);
          setTwitterlink(res.data.response.twitter_link);
          setEmaillink(res.data.response.AdminEmail);
          setAddress(res.data.response.address);
          setContectnumber(res.data.response.contact_no);
          setLatitude(res.data.response.latitude);
          setLongitude(res.data.response.longitude);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error for profile  api =====================>>', error);
      });
  };
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${latitude},${longitude}`;
  const label = 'Staff Renter';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Aboutus')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <Loader loading={loading} />

      <Content>
        <Text
          style={{
            marginLeft: width * (20 / 375),
            fontSize: fontsize.Medium,
            fontFamily: fonts.Bold,
          }}>
          {I18n.t('Location')}
        </Text>
        <View style={{marginTop: width * (10 / 375)}}>
          <Text style={{marginLeft: width * (40 / 375)}}>Staff Renter</Text>
          <Text style={{marginLeft: width * (40 / 375), width: '40%'}}>
            {address}
          </Text>
        </View>

        <View>
          <Map navigation={props.navigation} />
        </View>
        <View style={{marginTop: 20}}>
          <View style={{alignItems: 'center'}}>
            <Button
              isleftImage={true}
              isleftImagepath={Images.BoldMapIcon}
              isleftImageStyle={{left: width * (60 / 375)}}
              buttonStyle={{
                backgroundColor: colors.white,

                borderRadius: 30,
                borderColor: colors.yellow,
                borderWidth: 1,
                height: width * (50 / 375),
                justifyContent: 'center',
                alignItems: 'center',

                marginBottom: '3%',
                width: '90%',
              }}
              label={I18n.t('Navigate')}
              onPress={() => {
                Linking.openURL(url);
              }}
              isLabel={true}
              buttonTextStyle={[
                CommonStyles.buttontext,
                {color: colors.yellow, marginTop: 4},
              ]}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              isleftImage={true}
              isleftImageStyle={{}}
              isleftImagepath={Images.BoldMailIcon}
              buttonStyle={{
                backgroundColor: colors.white,
                flexDirection: 'row',

                borderRadius: 30,
                borderColor: colors.yellow,
                borderWidth: 1,
                height: width * (50 / 375),
                justifyContent: 'center',
                alignItems: 'center',

                marginBottom: '3%',
                width: '90%',
              }}
              label={I18n.t('Emailus')}
              onPress={() => {
                Linking.openURL(`mailto:${emaillink}`);
              }}
              isLabel={true}
              buttonTextStyle={[
                CommonStyles.buttontext,
                {color: colors.yellow, marginTop: 4},
              ]}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              isleftImage={true}
              isleftImagepath={Images.BoldPhoneIcon}
              isleftImageStyle={{left: width * (60 / 375)}}
              buttonStyle={{
                backgroundColor: colors.white,

                borderRadius: 30,
                borderColor: colors.yellow,
                borderWidth: 1,
                height: width * (50 / 375),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '7%',
                width: '90%',
              }}
              label={contectnumber}
              onPress={() => {
                Linking.openURL(`tel:${contectnumber}`);
              }}
              isLabel={true}
              buttonTextStyle={[
                CommonStyles.buttontext,
                {color: colors.yellow, marginTop: 4},
              ]}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {facebooklink ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(facebooklink);
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: 45, height: 45}}
                  source={Images.facebooklogo}
                />
              </TouchableOpacity>
            ) : null}

            {linkedinlink ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(linkedinlink);
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: 45, height: 45}}
                  source={Images.linkedinlogo}
                />
              </TouchableOpacity>
            ) : null}

            {instagramlink ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(instagramlink);
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: 45, height: 45}}
                  source={Images.instagramlogo}
                />
              </TouchableOpacity>
            ) : null}

            {twitterlink ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(twitterlink);
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: 45, height: 45}}
                  source={Images.twitterlogo}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default AboutUs;
