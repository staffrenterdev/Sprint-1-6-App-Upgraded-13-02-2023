import {StyleSheet, Platform} from 'react-native';
import {width, height} from '../../../../constants/ScreenSize';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
const styles = StyleSheet.create({
  container: {backgroundColor: colors.whitebackground, flex: 1},
  SwitchSelectorview: {
    flexDirection: 'row',
    marginTop: 60,
    justifyContent: 'space-between',
    marginHorizontal: width * (15 / 375),
  },
  SwitchSelector: {
    width: '55%',
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: width * (30 / 375),
  },
  SwitchSelector2: {
    width: '33%',
            borderColor: colors.lightGray,
            borderWidth: 1,
            borderRadius: width * (30 / 375),
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            elevation: 5,
            shadowRadius: 3,
            borderWidth: 0.17,
            borderColor: 'gray',
  },
  SearchBarview: {
    backgroundColor: colors.white,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    elevation: 5,
    shadowRadius: 3,
    borderWidth: 0.17,
    borderColor: 'gray',
  },
  Beforebeingtext: {
    fontSize: fontsize.Regular,
                textAlign: 'center',
                fontWeight: '500',
                marginHorizontal: 20,
  },
  Complete_profiletext: {
    fontSize: 12, color: colors.gray
  },
  completeProfiletouch: {
    borderRadius: width * (30 / 375),
    height: width * (30 / 375),
    borderColor: colors.yellow,
    width: width * (80 / 375),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
export default styles;
