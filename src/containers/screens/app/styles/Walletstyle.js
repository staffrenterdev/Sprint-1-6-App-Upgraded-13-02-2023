import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';
import {height, width} from '../../../../constants/ScreenSize';
import fonts from '../../../../constants/fonts';
import hasNotch from '../../../components/Deviceinfo';
import fontsize from '../../../../constants/i18n/Fontsizes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#fff',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    justifyContent: 'center',
    height: 115,
  },

  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF7EB',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    marginTop: hasNotch
      ? width * (30 / 375)
      : Platform.OS == 'android'
      ? 35
      : 10,

    paddingRight: width * (5 / 375),
  },
  title2: {
    textAlign: 'left',
    marginTop: hasNotch
      ? width * (30 / 375)
      : Platform.OS == 'android'
      ? 35
      : 10,
  },
  titleView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: fontsize.Regular,

    color: 'black',
    textAlign: 'center',
    fontFamily: fonts.Regular,

    marginTop: width * (10 / 375),
    paddingLeft: width * (35 / 375),
    paddingRight: width * (35 / 375),
  },
  text2: {
    fontSize: fontsize.Regular,

    color: 'black',
    fontFamily: fonts.Bold,

    marginTop: width * (10 / 375),
    paddingLeft: width * (35 / 375),
    paddingRight: width * (35 / 375),
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    height: hasNotch
      ? width * (280 / 375)
      : Platform.OS == 'ios'
      ? width * (280 / 375)
      : width * (280 / 375),
  },
  buttonCircle: {
    width: width * (40 / 375),
    height: width * (50 / 375),
    marginRight: width * (18 / 375),
    marginBottom: width * (40 / 375),
    position: 'relative',
    bottom: 4,
  },
  buttonCircle2: {
    width: width * (40 / 375),
    height: width * (40 / 375),
    marginLeft: width * (40 / 375),
    marginBottom: width * (40 / 375),
    marginTop: width * (7 / 375),
  },
  DonebuttonCircle: {
    width: width * (190 / 375),
    height: width * (50 / 375),
    borderRadius: 25,
    marginBottom: width * (20 / 375),
    justifyContent: 'center',
    backgroundColor: 'rgb(155,173,85)',
    marginRight: width * (80 / 375),
  },
  SkipButton: {
    width: width * (50 / 375),
    height: width * (20 / 375),
    marginTop: width * (10 / 375),
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: 'center',
    right: width * (10 / 375),
  },
  remember: {
    borderColor: 'black',
    height: width * (20 / 375),
    width: width * (20 / 375),
    borderWidth: 0.3,
    borderRadius: 30,
  },
  remember1: {
    height: width * (25 / 375),
    width: width * (23 / 375),
    borderRadius: 30,
  },
  remember_img: {
    height: '100%',
    width: '100%',
  },
  remember_text: {
    marginLeft: 8,
  },
  buttonStyle: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),

    width: '88%',

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    alignSelf: 'center',
  },
  buttonStyle1: {
    height: width * (50 / 375),

    width: '88%',
    borderColor: colors.yellow,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    alignSelf: 'center',

    borderWidth: 1,
    marginTop: width * (25 / 375),
  },
  _renderItemtitle: {
    fontSize: fontsize.Extralarge,
    color: 'black',
    fontFamily: fonts.Medium,
    textAlign: 'center',
  },
  _renderItemsubtitle: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 7,
  },
  got_it: {
    width: width * (120 / 375),
    height: width * (40 / 375),
    marginRight: 20,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.yellow,
  },
  buttonTextStyle1: {
    fontSize: 16,
    color: colors.yellow,
    fontWeight: 'bold',
  },
  Activepagination: {
    width: width * (30 / 375),
    marginLeft: 5,
    height: width * (12 / 375),
    borderRadius: width * (8 / 375),
    backgroundColor: colors.yellow,
    marginTop: width * (-15 / 375),
  },
  Inactivepagination: {
    width: width * (8 / 375),
    height: width * (8 / 375),
    marginTop: width * (-15 / 375),
    backgroundColor: '#e5e5e5',
  },

  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',

    position: 'absolute',
    bottom: width * (50 / 375),
    alignSelf: 'center',
  },
  textstyle1: {
    alignSelf: 'center',
    color: colors.gray2,
    marginTop: 50,
  },

  langTextView: {
    width: '30%',
    alignItems: 'center',
    alignSelf: 'center',
    height: 35,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    zIndex: 1000,
  },
  text12: {
    alignSelf: 'center',
    marginBottom: width * (10 / 375),
  },
  safearea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  view12: {
    paddingHorizontal: width * (15 / 375),
    marginTop: hasNotch
      ? width * (15 / 375)
      : Platform.OS == 'ios'
      ? width * (-10 / 375)
      : width * (10 / 375),
  },
  view_style: {
    justifyContent: 'space-between',
    marginBottom: hasNotch
      ? width * (90 / 375)
      : Platform.OS == 'ios'
      ? width * (90 / 375)
      : width * (90 / 375),
  },
});

export default styles;
