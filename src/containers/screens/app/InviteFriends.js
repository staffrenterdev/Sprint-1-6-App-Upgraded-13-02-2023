import React, {useEffect} from 'react';
import {Text, Share, View, FlatList} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/InviteFriendsstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import SignItOut from '../../components/SignItOut';
import Loader from '../../components/loader';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getService} from '../../../services/getServices';
import apiName from '../../../constants/apiName';

const InviteFriends = props => {
  const [loading, setLoading] = React.useState(false);
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [referalList, setReferalList] = React.useState([]);
  const [referalCode, setReferalCode] = React.useState();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          global.language == 'en'
            ? `Download the Staff Renter app and use my code when registering! Code: ${referalCode}`
            : `Télécharge l’application Staff Renter et utilise mon code lors de ton inscription ! Code: ${referalCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('user').then(lang => {
        var val = JSON.parse(lang);

        setReferalCode(val.referrel_code);
        apiData();
      });
    });
    return unsubscribeOnBlur;
  }, []);

  const apiData = () => {
    setLoading(true);
    getService(apiName.referralList)
      .then(async res => {
        if (res.status == 200) {
          setReferalList(res.data.response);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(
          'error for ask revision  api =====================>>',
          error?.response?.data?.message,
        );

        setLoading(false);
      });
  };

  const _rendernotiLists = (item, index) => {
    return (
      <View
        style={[
          styles.itemView,
          {
            borderBottomWidth: 1,

            borderBottomColor: '#ececec',
          },
        ]}>
        <View style={styles.Invoicedview}>
          <Text style={styles.Invoicedtext1}>
            {I18n.t('Mode')}: {'Invoiced'}
          </Text>
          <Text style={styles.Invoicedtext2}>
            {I18n.t('Amount')} : {'$25'}
          </Text>
        </View>
        <View
          style={[styles.Invoicedview,{
           
            marginTop: 10,
          }]}>
          <View>
            <Text style={styles.Invoicedtext1}>
              {I18n.t('Activated')} :{' '}
            </Text>
            <Text style={styles.Invoicedtext3}>
              {'2021-03-21'}
            </Text>
          </View>
          <View>
            <Text style={styles.Invoicedtext1}>
              {I18n.t('By')} :
            </Text>
            <Text style={styles.Invoicedtext3}>
              {item?.name}
            </Text>
          </View>

          <View
            style={[
              styles.PAIDview,
              {
                borderWidth: item.status == '' ? 0 : 1,
              },
            ]}>
            <Text style={styles.PAIDtext}>{'PAID'}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Invite')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <Loader loading={loading} />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <View>
        <Text style={styles.Referraltext}>{I18n.t('Referral')}</Text>
        <Text style={styles.Discovertext}>{I18n.t('Discover')}</Text>
        <Text style={styles.neverhavetext}>{I18n.t('neverhave')}</Text>
        <Text style={styles.Everypersontext}>{I18n.t('Everyperson')}</Text>
        <Text style={styles.Yourcodetext}>{I18n.t('Yourcode')}</Text>
        <Text style={styles.referalCodetext}>{referalCode}</Text>
        <View style={{alignItems: 'center'}}>
          <Button
            isleftImagepath={Images.uploadicon}
            isleftImage={true}
            buttonStyle={styles.sharebutton}
            label={I18n.t('Sharecode')}
            onPress={() => {
              onShare();
            }}
            isLabel={true}
            buttonTextStyle={[
              CommonStyles.buttontext,
              {fontSize: fontsize.Medium},
            ]}
          />
        </View>
      </View>

      <View style={styles.Referralstatusview}>
        <Text style={styles.Referralstatustext}>
          {I18n.t('Referralstatus')}
        </Text>
        <View style={styles.earnedview}>
          <Text style={{fontFamily: fonts.Bold}}>
            {I18n.t('earned')}
            {'    '}
            <Text style={{color: colors.yellow, fontFamily: fonts.Bold}}>
              ${referalList?.length * 25}
            </Text>
          </Text>
        </View>
      </View>
      <FlatList
        data={referalList}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}) => _rendernotiLists(item, index)}
        keyExtractor={(item, index) => String(index)}
      />
    </Container>
  );
};

export default InviteFriends;
