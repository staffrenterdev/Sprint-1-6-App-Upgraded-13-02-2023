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
    height: 70,
  },
  commonopacity: {
    flex: 1,
    // marginLeft: 30,
    paddingLeft:30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  circleview: {
    height: width * (20 / 375),
                  width: width * (20 / 375),
                  borderRadius: width * (20 / 375),
                 
                  // padding: 2,
  },
  Thatittext: {
    color: colors.yellow,
    fontSize: fontsize.Large,
    alignSelf: 'center',
    marginTop: 30,
    fontFamily: fonts.Bold,
  },
  fullaccess: {
    // fontSize: fontsize.Small,
    marginHorizontal:25,
    alignSelf: 'center',
    marginVertical:10,
    textAlign: 'center',
    lineHeight:25
  },
});

export default styles;
