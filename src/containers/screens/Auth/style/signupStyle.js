import {StyleSheet, Platform} from 'react-native';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
import {height, width} from '../../../../constants/ScreenSize';

const styles = StyleSheet.create({
  signupTextStyle: {
    color: colors.teal,
  },
  buttonTextStyle: {
    fontSize: 16,

    color: colors.inputTitle,
    fontWeight: 'bold',
  },
  buttonTextStyle1: {
    fontSize: fontsize.Large,

    color: colors.white,
    fontFamily: fonts.Bold,
  },
  buttonTextRedirect: {
    fontSize: fontsize.Small,

    color: colors.yellow,
  },
  resendbutton: {
    fontSize: fontsize.Small,
    color: colors.yellow,
    alignSelf: 'center',
    fontFamily: fonts.Bold,
    marginBottom: 30,
  },
  wrongcode: {
    color: 'red',
    alignSelf: 'center',
    paddingHorizontal: width * (10 / 375),
    paddingVertical: width * (3 / 375),
  },
  wrongcodeview: {
    flexDirection: 'row',
    borderRadius: width * (25 / 375),
    alignSelf: 'center',
    marginVertical: width * (20 / 375),
  },
  checkboxview: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.7,
    borderTopColor: colors.gray,
    padding: width * (7 / 375),
  },
  Choose_dateText: {
    fontSize: fontsize.Regular,
    marginLeft: 20,
    fontStyle: 'normal',
    marginTop: 13,
  },
  bussiness_button: {
    flexDirection: 'row',
    borderRadius: width * (30 / 375),
    height: width * (40 / 375),
    borderColor: colors.yellow,
    alignSelf: 'center',
    marginRight: 15,
    borderWidth: width * (1 / 375),
    alignItems: 'center',

    backgroundColor: colors.transparentwithyellow,

    width: width * (150 / 375),
    justifyContent: 'space-evenly',
  },
  labelTextStyle: {
    fontSize: 15,

    color: colors.inputTitle,
    fontWeight: 'bold',
  },
  buttonStyle3: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    marginTop: width * (20 / 375),
    width: width * (150 / 375),

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
    alignSelf: 'center',
    marginBottom: width * (30 / 375),
  },
  buttonStyle: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    marginTop: width * (20 / 375),
    marginHorizontal: width * (20 / 375),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  buttonStyleRedirect: {
    height: width * (40 / 375),

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: width * (100 / 375),
  },

  buttonStyle1: {
    height: width * (50 / 375),
    marginTop: width * (20 / 375),

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
    borderWidth: 1,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberView: {flexDirection: 'row', alignItems: 'center'},

  remember: {
    borderColor: 'black',
    height: width * (20 / 375),
    width: width * (20 / 375),
    borderWidth: 1,
    marginLeft: width * (10 / 375),
  },
  remember1: {
    borderColor: 'black',
    height: width * (20 / 375),
    width: width * (20 / 375),
    marginLeft: width * (10 / 375),
  },
  remember_img: {
    height: '100%',
    width: '100%',
  },
  remember_text: {
    fontSize: 12,
    marginLeft: 8,
  },
  forgotPassword: {fontSize: 13, color: colors.yellow},
  forgotPassword1: {
    fontSize: 13,
    color: colors.yellow,
    alignSelf: 'center',
    marginBottom: width * (20 / 375),
  },
  loginText: {color: colors.yellow, alignSelf: 'center'},

  already: {alignSelf: 'center', color: colors.gray2},

  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * (50 / 375),
    justifyContent: 'center',
  },

  viewTextBox1: {
    marginHorizontal: width * (20 / 375),
    marginTop:
      Platform.OS == 'android' ? width * (-5 / 375) : width * (-2 / 375),
  },

  viewTextBox: {
    marginHorizontal: width * (20 / 375),
  },
  asText: {
    fontSize: fontsize.Extralarge,
    lineHeight: width * (38 / 375),
  },

  registerText: {
    fontSize: fontsize.Extralarge,
    lineHeight: width * (38 / 375),
  },

  headingview: {
    alignSelf: 'center',
    alignItems: 'center',
  },

  container: {flex: 1, backgroundColor: colors.white},
  dobText: {
    fontSize: width * (16 / 375),
    marginLeft: width * (20 / 375),
    marginRight: width * (10 / 375),
    color: colors.inputTitle,

    paddingBottom: width * (10 / 375),
  },
  pickerView: {
    flex: 1,
    marginHorizontal: width * (22 / 375),
    fontSize: fontsize.Regular,
    color: colors.textinputColor,
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#FDBF5A',

    flexDirection: 'row',
    alignItems: 'center',
  },
  modelview: {
    backgroundColor: colors.white,

    flex: 1,
  },

  modelview1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * (25 / 375),
  },
  otp: {
    height: 80,
    marginTop: width * (20 / 375),
    marginHorizontal: '5%',
    shadowColor: colors.shadowColor,
    shadowOpacity: 10,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },

    borderWidth: Platform.OS == 'android' ? 2 : 0,
    borderColor: 'rgba(253, 191, 90, 0.35)',
  },
  codeInput: {
    width: width * (75 / 375),
    height: width * (60 / 375),
    borderWidth: 1,
    borderRadius: width * (20 / 375),
    backgroundColor: colors.white,
    fontSize: width * (24 / 375),
    textAlign: 'center',
    color: 'black',
    borderColor: colors.yellow,
  },
  codeInput2: {
    width: width * (75 / 375),
    height: width * (60 / 375),
    borderWidth: 1,
    borderRadius: width * (20 / 375),
    backgroundColor: colors.white,
    fontSize: fontsize.Large,
    textAlign: 'center',
    color: colors.red,
    borderColor: colors.red,
  },
  dobIconModalview: {
    backgroundColor: colors.white,
    borderTopLeftRadius: width * (20 / 375),
    borderTopRightRadius: width * (20 / 375),
    paddingHorizontal: width * (25 / 375),
    paddingTop: width * (10 / 375),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  legalageText: {
    alignSelf: 'center',
    fontSize: fontsize.Large,
    fontFamily: fonts.Bold,
  },
  legalmodaltext: {
    marginVertical: 15,
    textAlign: 'center',
  },
});

export default styles;
