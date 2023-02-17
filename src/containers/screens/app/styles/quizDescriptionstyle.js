import {StyleSheet, Platform} from 'react-native';
import {width, height} from '../../../../constants/ScreenSize';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
const styles = StyleSheet.create({
  container: {backgroundColor: colors.whitebackground, flex: 1},
  NormalText: {
    fontSize: fontsize.Regular,
    color: colors.gray,
    fontFamily: fonts.Regular,
  },
  titleText: {
    fontSize: fontsize.Large,
    fontFamily: fonts.Medium,
    marginBottom: width * (10 / 375),
  },
  itemView: {
    flex: 1,
    backgroundColor: '#FFF3DF',
    // height:width*(80/375),
    marginVertical: 2,
    padding: 10,
    paddingLeft: width * (35 / 375),
  },
  view4: {
    paddingHorizontal: width * (15 / 375),
    paddingVertical: width * (10 / 375),
    backgroundColor: colors.whitebackground,
    marginTop: width * (20 / 375),
    marginHorizontal: width * (15 / 375),
    borderRadius: width * (15 / 375),
  },
  buttonStyle2: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    width: width * (120 / 375),
    borderRadius: width * (25 / 375),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontSize: fontsize.Large,

    color: colors.white,
  },
  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: width * (30 / 375),
    marginBottom: width * (7 / 375),
    paddingHorizontal: width * (22 / 375),
    height: width * (50 / 375),
    marginBottom: width * (15 / 375),
  },
  Pre_quizText: {
    alignSelf: 'center',
    fontSize: fontsize.Regular,
    margin: 10,
    textAlign: 'center',
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
    borderWidth: width * (2 / 375),
    padding: width * (2 / 375),
  },
  viewStyle2: {height: '100%', width: '100%', borderRadius: width * (20 / 375)},

  viewstyle3: {
    flex: 0.8,
    alignItems: 'center',
  },
  text1: {
    textAlign: 'center',
    marginVertical: width * (10 / 375),
    fontSize: width * (10 / 375),
    fontFamily: fonts.Regular,
  },
  Touch1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: width * (30 / 375),
    borderWidth: width * (0.5 / 375),
    height: width * (36 / 375),
    width: width * (200 / 375),
    borderColor: colors.gray3,
  },
  view84: {
    height: width * (30 / 375),
    width: width * (30 / 375),
    alignSelf: 'flex-end',
    marginBottom: width * (10 / 375),
  },
  backarroview: {
    flexDirection: 'row',
    height: width * (40 / 375),

    alignItems: 'center',
    width: width * (50 / 375),
    justifyContent: 'space-between',
    marginVertical: '3%',
    marginHorizontal: '3%',
    marginTop: width * (40 / 375),
  },
  Guidetext: {
    fontFamily: fonts.Bold,
    fontSize: fontsize.Extralarge,
    alignSelf: 'center',
    marginVertical: 20,
  },
  Guideview: {
    alignItems: 'center',
    marginHorizontal: width * (20 / 375),
    marginBottom: 20,
  },
  MUSTtext: {
    textAlign: 'center',
    fontSize: fontsize.Regular,
    marginVertical: width * (5 / 375),
  },
  Pleasereadcarefullytext: {
    fontSize: fontsize.Regular,
    marginVertical: width * (5 / 375),
  },

  takeQuizbutton: {
    height: width * (50 / 375),
    width: '90%',
    borderRadius: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: width * (20 / 375),
    marginBottom: width * (30 / 375),
  },
  view88: {
    color: colors.yellow,
    textAlign: 'center',
    marginVertical: width * (8 / 375),
  },
  view89: {
    paddingHorizontal: width * (75 / 375),
    paddingVertical: width * (20 / 375),
    backgroundColor: colors.whitebackground,
    marginTop: 20,
    marginHorizontal: width * (15 / 375),
    borderRadius: width * (25 / 375),
    marginBottom: width * (18 / 375),
  },
  view90: {
    marginTop: width * (2 / 375),
    color: 'red',
    fontSize: fontsize.Small,
  },
  view91: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: width * (30 / 375),
    borderWidth: 0.5,
    height: width * (36 / 375),
    width: width - 80,
    marginTop: width * (30 / 375),
    borderColor: colors.gray3,
  },
  view92: {
    alignSelf: 'flex-start',
    marginTop: width * (5 / 375),
    marginLeft: width * (10 / 375),
  },
  view93: {
    backgroundColor: colors.white,
    padding: width * (15 / 375),
    borderRadius: width * (30 / 375),
    alignItems: 'center',
  },
  view94: {
    backgroundColor: 'rgba(255,255,355,0.6)',

    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: width * (15 / 375),
    paddingBottom: 80,
  },
  view95: {
    position: 'absolute',
    top: width * (18 / 375),
    zIndex: 999,
  },
  view96: {
    flex: 0.8,
    backgroundColor: colors.whitebackground,
    borderRadius: 30,
    paddingTop: width * (28 / 375),
  },
});
export default styles;
