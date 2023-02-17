import {width} from '../../constants/ScreenSize';

import {StyleSheet, Platform} from 'react-native';

import colors, {Color} from '../../constants/colors';
import fonts from '../../constants/fonts';
import fontsize from '../../constants/i18n/Fontsizes';
const CommonStyles = StyleSheet.create({
  HeadingText: {
    fontSize: width * (18 / 375),
    lineHeight: width * (25 / 375),
    color: 'black',
    fontFamily: fonts.Bold,
  },
  Heading_text: {
    fontSize: width * (26 / 375),
    lineHeight: width * (28 / 375),
    color: 'black',
    fontFamily: fonts.Bold,
  },
  Heading_text1: {
    fontSize: width * (24 / 375),
    lineHeight: width * (28 / 375),
    color: 'black',
    fontFamily: fonts.Medium,
  },
  SubHeadingText: {
    fontSize: fontsize.Large,
    lineHeight: width * (23 / 375),
    color: '#fff',
    fontFamily: fonts.Bold,
  },
  HeadingText1: {
    fontSize: width * (18 / 375),
    lineHeight: width * (25 / 375),
    color: 'black',
    fontFamily: fonts.Medium,
  },
  HeadingText2: {
    fontSize: fontsize.Extralarge,
    fontWeight: '600',
    lineHeight: width * (44 / 375),
    color: 'black',
    fontFamily: fonts.Medium,
    marginBottom: width * (15 / 375),
  },
  HeadingText12: {
    fontSize: fontsize.Extralarge,
    lineHeight: width * (44 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  smallText12: {
    fontSize: width * (8 / 375),
    lineHeight: width * (15 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },

  HeadingText3: {
    fontSize: fontsize.Large,
    lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Bold,
  },
  buttontext: {
    fontSize: fontsize.Large,
    lineHeight: width * (23 / 375),
    color: '#fff',
    fontFamily: fonts.Bold,
  },
  renderHiddenItemview: {
    alignItems: 'center',
    backgroundColor: '#FFF7EB',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  HeadingText31: {
    fontSize: width * (16 / 375),
    lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  HeadingTextMedium: {
    fontSize: width * (16 / 375),
    lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  HeadingText_medium: {
    fontSize: fontsize.Regular,
    lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Medium,
  },
  HeadingText19: {
    fontSize: width * (16 / 375),
    lineHeight: width * (19 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  SubHeadingText1: {
    fontSize: fontsize.Regular,
    lineHeight: width * (19 / 375),
    color: 'black',
    fontFamily: fonts.Medium,
  },
  drawerText: {
    fontSize: fontsize.Regular,
    lineHeight: width * (19 / 375),
    color: 'black',
    fontFamily: fonts.Bold,
  },

  SubHeadingText3: {
    fontSize: fontsize.Large,
    lineHeight: width * (27 / 375),
    color: 'black',
    fontFamily: fonts.Medium,
  },
  SubHeadingTextnew3: {
    fontSize: fontsize.Large,
    lineHeight: width * (27 / 375),
    color: '#FDBF5A',
    fontFamily: fonts.Medium,
  },
  SubHeadingText2: {
    fontSize: fontsize.Regular,
    lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  SubHeadingConfirm: {
    fontSize: fontsize.Small,
    lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Bold,
  },
  SubHeadingText12: {
    fontSize: fontsize.Small,
    lineHeight: width * (18 / 375),
    color: 'black',
    fontFamily: fonts.Bold,
  },
  AccomodationText12: {
    fontSize: fontsize.Small,
    lineHeight: width * (15 / 375),
    color: 'black',
    fontFamily: fonts.Bold,
  },
  SubHeadingText13: {
    fontSize: fontsize.Small,
    lineHeight: width * (18 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  SubHeadingText31: {
    fontSize: width * (11 / 375),
    lineHeight: width * (15 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  RegularText2: {
    fontSize: width * (10 / 375),
    lineHeight: width * (14 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  SubHeadingText4: {
    fontSize: fontsize.Regular,
    lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  SubHeadingText41: {
    fontSize: fontsize.Regular,
    // lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  SubHeadingText14: {
    fontSize: fontsize.Regular,
    lineHeight: width * (23 / 375),
    color: 'black',
    fontFamily: fonts.Medium,
  },
  RegularText4: {
    fontSize: fontsize.Regular,
    lineHeight: width * (19 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  SubHeadingText5: {
    fontSize: width * (18 / 375),
    lineHeight: width * (24 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  NormalText3: {
    fontSize: width * (20 / 375),
    lineHeight: width * (27 / 375),
    color: 'black',
    fontFamily: fonts.Regular,
  },
  NormalText: {
    fontSize: fontsize.Regular,
    lineHeight: width * (22 / 375),
    fontFamily: fonts.Regular,
  },
  RegularText: {
    fontSize: fontsize.Regular,
    lineHeight: width * (18 / 375),
  },
  yellowText: {
    color: colors.yellow,
    fontSize: width * (18 / 375),
    lineHeight: width * (25 / 375),
  },

  shadowStyle: {
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
  backbuttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backbuttonTouchable: {
    flexDirection: 'row',
    height: width * (40 / 375),

    alignItems: 'center',
    width: width * (50 / 375),
    justifyContent: 'space-between',
    marginVertical: '3%',
    marginHorizontal: '3%',
  },
  backbuttonText: {
    color: colors.yellow,
    fontSize: fontsize.Regular,
    marginLeft: 2,
  },
  shadowStyle1: {
    shadowColor: colors.shadowColor1,
    shadowOpacity: 10,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 5,
  },
  shadowStyle12: {
    shadowColor: colors.shadowColor1,
    shadowOpacity: 5,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 5,
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
  backbutton: {
    flexDirection: 'row',
    height: width * (40 / 375),

    alignItems: 'center',
    width: width * (50 / 375),
    justifyContent: 'space-between',
    marginVertical: '3%',
    marginHorizontal: '3%',
  },
  backbuttontext: {
    color: colors.yellow,
    fontSize: fontsize.Regular,
    marginLeft: 2,
  },
  BottomModalView: {
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
  CenterModalView: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,

    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  HalfButton: {
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * (60 / 375),
    marginBottom: '15%',
    width: '50%',
  },
  FullButton: {
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: width * (45 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * (20 / 375),
    marginBottom: width * (20 / 375),
  },
  modalbackview: {
    backgroundColor: colors.modelBackground,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  Bubblesview: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: width * (30 / 375),
    zIndex: 1,
    width: width,
    alignItems: 'center',
    height: width * (50 / 375),
  },
  backarrowview: {
    flexDirection: 'row',
    height: width * (40 / 375),

    alignItems: 'center',
    width: width * (50 / 375),
    justifyContent: 'space-between',

    marginHorizontal: '3%',
  },
  Backtext: {
    color: colors.yellow,
    fontSize: fontsize.Regular,
    marginLeft: 2,
  },
  endmodalmainview: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.modelBackground,
    marginBottom: 0,
  },
  endmodalinnerview: {
    backgroundColor: colors.white,
    borderTopLeftRadius: width * (20 / 375),
    borderTopRightRadius: width * (20 / 375),
    paddingHorizontal: width * (25 / 375),
    paddingTop: width * (20 / 375),
  },
  Editimage: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 75,
  },
  Deleteimage: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 0,
  },
});

export default CommonStyles;
