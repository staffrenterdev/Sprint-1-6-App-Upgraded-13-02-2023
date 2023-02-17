import {StyleSheet} from 'react-native';
import {width} from '../../../../constants/ScreenSize';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.yellow,
    height: width * (36 / 375),
    width: width * (108 / 375),
    borderRadius: width * (18 / 375),
  },
  title: {
    fontFamily: fonts.SemiBold,
    fontSize: width * (16 / 375),
  },

  buttonTextStyle: {
    fontSize: 16,
    color: colors.inputTitle,
  },
  buttonTextStyle12: {
    fontSize: 16,
    color: colors.red,
  },
  add: {flexDirection: 'row', justifyContent: 'center'},

  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: width * (30 / 375),
    marginBottom: width * (7 / 375),
    paddingHorizontal: width * (22 / 375),
    height: width * (50 / 375),
    marginBottom: 15,
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
  buttonStyle1: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    width: width * (150 / 375),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle12: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    width: width * (220 / 375),
    borderRadius: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: width * (20 / 375),
  },
  button_Style: {
    backgroundColor: colors.lightRed,
    height: width * (50 / 375),
    width: width * (220 / 375),
    borderRadius: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.red,
  },
  buttonStyle2: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    width: width * (120 / 375),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  commontext: {textAlign: 'center', marginVertical: 5},
  image1: {position: 'absolute', right: 10, top: 20, zIndex: 9999},
  carrefultext: {
    alignSelf: 'center',
    fontSize: fontsize.Large,
    fontFamily: fonts.Bold,
  },
  profileImage: {
    height: width * (93 / 375),
    width: width * (93 / 375),
    borderRadius: width * (93 / 375),
    alignSelf: 'center',

    backgroundColor: colors.whitebackground,
  },
  headingText: {
    alignSelf: 'center',
    marginBottom: width * (30 / 375),
    fontSize: fontsize.Extralarge,
    lineHeight: width * (44 / 375),
  },
  errorText12: {
    fontSize: fontsize.Regular,

    fontStyle: 'normal',
  },
  Closeaccountbutton: {
    backgroundColor: '#fde5e8',
    borderWidth: 1,
    borderColor: colors.red,

    borderRadius: 30,
    height: width * (40 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * (20 / 375),
    marginBottom: '7%',
    width: '80%',
  },

  pickerview: {
    alignSelf: 'center',
    height: 50,
    borderBottomColor: '#FDBF5A',
    borderBottomWidth: 1,
    width: '83%',
  },
  Systemview: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    paddingBottom: 10,
  },
  Systemtext: {
    fontSize: fontsize.Regular,
    color: 'black',
    fontFamily: fonts.Bold,
    marginHorizontal: width * (20 / 375),
  },
  updatebutton: {
    borderRadius: 30,
    height: width * (45 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
    width: '60%',
  },
  Changepasswordtext: {
    fontSize: fontsize.Regular,
    color: 'black',
    fontFamily: fonts.Bold,
    marginHorizontal: width * (20 / 375),
  },
  Changepasswordview: {
    borderBottomWidth: 1,
            borderBottomColor: '#ececec',
            paddingBottom: 10,
            marginTop: 20,
            marginBottom: 10,
  },
  downArrowimg: {
    marginTop: 20,
    width: 15,
    height: 15,
    marginRight: width * (20 / 375),
    resizeMode: 'contain',
  },
});

export default styles;
