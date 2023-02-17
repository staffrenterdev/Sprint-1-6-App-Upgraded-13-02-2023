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

  language: {
    flex: 1,

    paddingHorizontal: width * (15 / 375),
    fontSize: fontsize.Regular,
    color: colors.textinputColor,

    backgroundColor: colors.white,
    borderRadius: 30,
    width: width * (300 / 375),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image1: {position: 'absolute', right: 10, top: 20, zIndex: 9999},
  errorText: {
    marginTop: width * (10 / 375),

    color: colors.red,
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
  backgroundVideo: {
    height: width * (300 / 375),
  },
  renderitem1: {
    borderRadius: width * (10 / 375),
    padding: width * (15 / 375),
    backgroundColor: colors.whitebackground,
    marginTop: width * (20 / 375),
    marginHorizontal: width * (15 / 375),
  },

  style11: {
    alignSelf: 'flex-start',
    marginTop: width * (25 / 375),
    marginLeft: width * (10 / 375),
  },
  style12: {
    backgroundColor: colors.whitebackground,
    padding: width * (20 / 375),
    borderRadius: width * (30 / 375),
    alignItems: 'center',
  },
  style13: {
    backgroundColor: colors.whitebackground,

    marginHorizontal: width * (15 / 375),
    borderRadius: width * (15 / 375),

    marginTop: width * (5 / 375),
    width: '95%',
  },
  style14: {
    alignSelf: 'flex-start',
    marginTop: width * (25 / 375),
    marginLeft: width * (10 / 375),
  },
  style15: {
    backgroundColor: colors.whitebackground,
    padding: width * (15 / 375),
    borderRadius: width * (30 / 375),
  },
  style16: {
    borderWidth: 1,
    height: width * (28 / 375),
    width: width * (70 / 375),
    borderRadius: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
  },
  previousexperiences: {
    textAlign: 'center',
    fontFamily: fonts.Regular,
    fontSize: fontsize.Regular,
  },
  Addexperiencebuttonview: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 100,
    backgroundColor: colors.white,
  },
  Addexperiencebutton: {
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
    width: '95%',
  },
  addexpheading: {
    fontSize: fontsize.Large,
    fontFamily: fonts.Bold,
    alignSelf: 'center',

    marginBottom: width * (10 / 375),
  },
  pickerview: {
    borderBottomColor: colors.yellow,
    borderBottomWidth: 1,
    flex: 1,

    justifyContent: 'center',
    fontSize: fontsize.Regular,
    color: colors.textinputColor,
    marginHorizontal: 15,
    marginBottom: 8,
  },
  downArrowimg: {
    position: 'absolute',
    right: 15,
    bottom: 17,
    alignSelf: 'flex-end',
  },
  TPositionview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginHorizontal: 15,
  },
  Fromview: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginTop: 20,
    borderBottomColor: colors.yellow,
    justifyContent: 'space-between',
  },
  Rememberview: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: width * (7 / 375),
  },
  timeskills: {
    fontFamily: fonts.Bold,
    alignSelf: 'center',
    fontSize: fontsize.Regular,
  },
  Skills: {
    textAlign: 'center',
    fontFamily: fonts.Regular,
    fontSize: fontsize.Regular,
  },
  Skillsbutton: {
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
    width: '95%',
  },
  addskilltext: {
    fontSize: fontsize.Large,
    fontFamily: fonts.Bold,
    alignSelf: 'center',
    marginBottom: width * (10 / 375),
  },
  addskillbuttonview: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 100,
    backgroundColor: colors.white,
  },
  Skillsclosely: {
    textAlign: 'center',
    fontFamily: fonts.Regular,
    fontSize: fontsize.Regular,
    marginVertical: width * (20 / 375),
  },
  pickerview: {
    borderBottomColor: colors.yellow,
    borderBottomWidth: 1,
    justifyContent: 'center',
    fontSize: fontsize.Regular,
    color: colors.textinputColor,
    marginHorizontal: 15,
    marginBottom: 8,
  },
  downArrowimg: {
    position: 'absolute',
    right: 15,
    bottom: 17,
    alignSelf: 'flex-end',
  },
  errrortext: {
    marginTop: width * (8 / 375),
    fontSize: fontsize.Small,
    paddingLeft: width * (18 / 375),
  },
  Confirmview: {
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.white,
    width: '100%',
  },
  Confirmbutton: {
    position: 'absolute',
    bottom: 10,
    marginTop: width * (18 / 375),
    width: '100%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  expfield: {
    width: '80%',
    marginLeft: 20,
    fontFamily: fonts.Regular,
    marginBottom: 12,
  },
  experiencefieldmodalview: {
    backgroundColor: 'white',
    height: 300,
    borderTopLeftRadius: width * (10 / 375),
    borderTopRightRadius: width * (10 / 375),
  },
  availableexperiencetext: {
    textAlign: 'center',
    fontFamily: fonts.Regular,
    fontWeight: '500',
    fontSize: fontsize.Medium,
    marginTop: 40,
    marginBottom: 20,
  },
  pleaseupdatetext: {
    textAlign: 'center',
    marginHorizontal: 10,
    fontFamily: fonts.Regular,
    fontSize: fontsize.Small,
  },
  cancelview: {
    backgroundColor: colors.yellow,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 14,
    borderTopLeftRadius: width * (10 / 375),
    borderTopRightRadius: width * (10 / 375),
  },
  canceltext: {
    color: colors.white,
    fontSize: fontsize.Regular,
  },
  expfieldview: {
    backgroundColor: 'white',
    height: 400,
    borderTopLeftRadius: width * (10 / 375),
    borderTopRightRadius: width * (10 / 375),
  },
  Experiencestext: {
    margin: 10,
    marginLeft: 15,
    fontFamily: fonts.Bold,
    fontSize: fontsize.Regular,
  },
  onSelectDataview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 25,
  },
  Chooseindustrytext: {
    width: '80%',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 20,
    fontFamily: fonts.Regular,
  },
});

export default styles;
