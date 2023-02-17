import {StyleSheet} from 'react-native';

import {width} from '../../../../constants/ScreenSize';

import colors from '../../../../constants/colors';
import fontsize from '../../../../constants/i18n/Fontsizes';
import fonts from '../../../../constants/fonts';
const styles = StyleSheet.create({
  NormalText: {
    fontSize: fontsize.Regular,
    color: colors.gray,
  },
  titleText: {
    fontSize: fontsize.Large,
    marginBottom: width * (10 / 375),
  },
  itemView: {
    flex: 1,

    marginVertical: 2,
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: colors.yellow,
    height: width * (26 / 375),
    width: width * (58 / 375),

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    alignSelf: 'flex-end',
  },
  buttonTextStyle: {
    fontSize: 16,

    color: colors.inputTitle,
  },
  buttonStyle1: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    width: width * (150 / 375),

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * (20 / 375),
    borderRadius: width * (10 / 375),
    marginBottom: width * (7 / 375),
    marginHorizontal: width * (15 / 375),
  },

  viewstyle1: {
    flex: 0.1,
    alignItems: 'center',
  },
  touchableStyle: {
    height: width * (20 / 375),
    width: width * (20 / 375),
    borderRadius: width * (20 / 375),
    borderColor: colors.checkbox,
    borderWidth: 2,
    padding: 2,
  },
  viewStyle2: {height: '100%', width: '100%', borderRadius: width * (20 / 375)},

  viewstyle3: {
    flex: 0.8,
    alignItems: 'center',
  },

  view1: {
    paddingHorizontal: width * (15 / 375),
    paddingVertical: width * (20 / 375),
    backgroundColor: colors.whitebackground,
    marginTop: 20,
    marginHorizontal: width * (15 / 375),
    borderRadius: width * (15 / 375),
    marginBottom: width * (18 / 375),
  },
  commonview: {
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    height: 75,
  },
  commonopacity: {
    flex: 1,
    marginLeft: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  circleview: {
    height: width * (20 / 375),
    width: width * (20 / 375),
    borderRadius: width * (20 / 375),
    borderColor: colors.checkbox,
    borderWidth: 1,
    padding: 2,
  },
  Thatittext: {
    color: colors.yellow,
    fontSize: fontsize.Large,
    alignSelf: 'center',
    marginTop: 30,
    fontFamily: fonts.Bold,
  },
  fullaccess: {
    fontSize: fontsize.Regular,
    alignSelf: 'center',
    marginVertical: 30,
    textAlign: 'center',
  },
  PAIDview: {
    backgroundColor: colors.blurgreen,
    borderRadius: 30,
    marginRight: 7,
    borderColor: colors.green,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  PAIDtext: {
    color: colors.green,
    fontFamily: fonts.Bold,
  },
  Referraltext: {
    fontSize: fontsize.Medium,
    fontFamily: fonts.Bold,
    marginLeft: width * (20 / 375),
  },
  Discovertext: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: fonts.Regular,
    fontSize: fontsize.Regular,
  },
  neverhavetext: {
    textAlign: 'center',
    fontSize: fontsize.Regular,
    fontFamily: fonts.Regular,
    lineHeight: 24,
  },
  Everypersontext: {
    textAlign: 'center',
    marginHorizontal: width * (17 / 375),
    fontSize: fontsize.Regular,
    fontFamily: fonts.Regular,
    marginVertical: width * (30 / 375),
  },
  Yourcodetext: {
    textAlign: 'center',
    fontSize: fontsize.Regular,
    fontFamily: fonts.Bold,
  },
  referalCodetext: {
    textAlign: 'center',
    fontSize: fontsize.Extralarge,
    marginTop: 4,
    marginBottom: width * (14 / 375),
  },
  Referralstatusview: {
    flexDirection: 'row',
    marginHorizontal: width * (20 / 375),
    justifyContent: 'space-between',
  },
  earnedview: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  Referralstatustext: {
    fontSize: fontsize.Medium,
    fontFamily: fonts.Bold,
    alignSelf: 'center',
  },
  Invoicedview: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  Invoicedtext1: {
    fontFamily: fonts.Bold, fontSize: fontsize.Small
  },
  Invoicedtext2: {
    fontFamily: fonts.Bold, fontSize: fontsize.Regular
  },
  Invoicedtext3: {
    fontFamily: fonts.Regular, fontSize: fontsize.Small
  },
  sharebutton: {
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: width * (50 / 375),
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: width * (20 / 375),
    marginBottom: '7%',
    width: '80%',
  },
});

export default styles;
