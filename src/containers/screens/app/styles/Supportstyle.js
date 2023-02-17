import {StyleSheet} from 'react-native';
import {width} from '../../../../constants/ScreenSize';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
const styles = StyleSheet.create({
    Supportimage: {
        width:230,
        height:170,
        alignSelf: 'center',
        marginBottom: width * (80 / 375),
        marginTop: width * (50 / 375),
      },
      supportregardingtext: {
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: fonts.Regular,
        fontSize: fontsize.Regular,
  },
  agenttext: {
    textAlign: 'center',
            marginTop: 20,
            fontFamily: fonts.Regular,
            fontSize: fontsize.Regular,
  },
  buttonview: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 10,
  },
  Contactsupportbutton: {
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * (60 / 375),
    marginBottom: '7%',
    width: '90%',
  },
  
  
});

export default styles;
