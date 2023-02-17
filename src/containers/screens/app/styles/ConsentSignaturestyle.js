import {StyleSheet, Platform} from 'react-native';
import {width, height} from '../../../../constants/ScreenSize';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
const styles = StyleSheet.create({
  container: {backgroundColor: colors.whitebackground, flex: 1},
  Pleasesignview: {
    height: width * (600 / 375),
              width: '70%',
              borderWidth: 1,
              borderColor: colors.disablecolor,
              borderRadius: 20,
              marginTop: 30,
              marginLeft: 30,
  },
  Pleasesigntext: {
    alignSelf: 'flex-end',
                  transform: [{rotate: '270deg'}],
                  fontSize: 35,
                  position: 'absolute',
                  top: 285,
                  left: 90,
                  fontFamily: fonts.Regular,
                  color: colors.disablecolor,
  },
  SignaturePadview: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  submitbutton: {
    height: width * (50 / 375),
    position: 'relative',
    right: width * (30 / 375),
    top: width * (20 / 375),
    width: width * (150 / 375),
    borderRadius: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    transform: [{rotate: '270deg'}],
  },
  
});
export default styles;
