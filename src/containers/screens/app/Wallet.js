import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './styles/Walletstyle';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import AppIntroSlider from 'react-native-app-intro-slider';
import Images from '../../../constants/images';
import I18n from '../../../constants/i18n';
import CommonStyles from '../../../assets/css/commonStyles';
import fontsize from '../../../constants/i18n/Fontsizes';
import {width} from '../../../constants/ScreenSize';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
const Wallet = props => {
  const slides = [
    {
      key: 'k1',
      title: I18n.t('Welcomeyour'),
      title2: I18n.t('invoicesystem'),
      text: I18n.t('independentworker'),
      text2: I18n.t('accessinvoice'),
      text3: I18n.t('Pleasewatch'),
      image: Images.walletintro1,
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#FF1744',
    },
    {
      key: 'k2',
      title: I18n.t('Itemscontracts'),
      title2: I18n.t('invoicable'),
      text: I18n.t('previsoulydone'),
      text2: I18n.t('Pendingmeans'),
      text3: I18n.t('otheritems'),
      image: Images.walletintro2,
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#D500F9',
    },
    {
      key: 'k3',
      title: I18n.t('Invoice'),
      title2: I18n.t('verification'),
      text: I18n.t('verifysome'),
      text2: I18n.t('somepoints'),
      point1: I18n.t('point1'),
      point2: I18n.t('point2'),
      point3: I18n.t('point3'),
      point4: I18n.t('point4'),
      image: Images.walletintro3,
      image2: Images.Pointer,
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#2979FF',
    },
    {
      key: 'k4',
      title: I18n.t('Preview'),
      title2: I18n.t('invoice'),
      text: I18n.t('Makesure'),
      text2: I18n.t('seemistake'),
      text3: I18n.t('Youcan'),
      image: Images.walletintro4,
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#2979FF',
    },
    {
      key: 'k5',
      title: I18n.t('Senddelay'),
      title2: I18n.t('payment'),
      text: I18n.t('Aftersending'),
      text2: I18n.t('willtry'),
      text2: I18n.t('average'),
      image: Images.walletintro5,
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#2979FF',
    },
    {
      key: 'k6',
      title3: I18n.t('ready'),
      title4: I18n.t('invoice'),

      image: Images.walletintro6,
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#2979FF',
    },
  ];
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image source={Images.right} />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('WalletMain');
        }}
        style={styles.got_it}>
        <Text style={{color: colors.white, fontWeight: '500'}}>
          {I18n.t('got_it')}
        </Text>
      </TouchableOpacity>
    );
  };
  const _renderPrevButton = () => {
    return null;
  };
  const _renderItem = ({item}) => {
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          source={Images.walletintroback}
          resizeMode="cover"
          style={styles.image}>
          <Image source={item.image} style={styles.image} />
        </ImageBackground>
        {item.title4 && item.title3 ? (
          <View style={{width: '50%', marginTop: width * (50 / 375)}}>
            <Text
              style={styles._renderItemtitle}>
              {item.title3}
            </Text>
            <Text
               style={styles._renderItemtitle}>
              {item.title4} !
            </Text>
          </View>
        ) : null}
        <View style={styles.titleView}>
          <Text
            style={[
              CommonStyles.SubHeadingText3,
              styles.title,
              {alignSelf: 'center'},
            ]}>
            {item.title}
          </Text>
          <Text style={[CommonStyles.SubHeadingTextnew3, styles.title2]}>
            {item.title2}
          </Text>
        </View>
        <View>
          <Text style={[styles.text]}>{item.text}</Text>
          <Text style={[styles.text]}>{item.text2}</Text>
          {item.point1 ? (
            <View>
              <View
                style={styles._renderItemsubtitle}>
                <Image source={item.image2} />
                <Text style={{width: '95%', marginLeft: 10}}>
                  {item.point1}
                </Text>
              </View>
              <View
                style={styles._renderItemsubtitle}>
                <Image source={item.image2} />
                <Text style={{width: '95%', marginLeft: 10}}>
                  {item.point2}
                </Text>
              </View>
              <View
               style={styles._renderItemsubtitle}>
                <Image source={item.image2} />
                <Text style={{width: '95%', marginLeft: 10}}>
                  {item.point3}
                </Text>
              </View>
              <View
               style={styles._renderItemsubtitle}>
                <Image source={item.image2} />
                <Text style={{width: '95%', marginLeft: 10}}>
                  {item.point4}
                </Text>
              </View>
            </View>
          ) : null}

          <Text style={[styles.text]}>{item.text3}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safearea}>
      <ShowStatusBarWhite />
      <View style={{flex: 1}}>
        <AppIntroSlider
          data={slides}
          renderDoneButton={renderDoneButton}
          renderItem={_renderItem}
          renderNextButton={_renderNextButton}
          renderPrevButton={_renderPrevButton}
          activeDotStyle={styles.Activepagination}
          dotStyle={styles.Inactivepagination}
          showPrevButton={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
