import {StyleSheet} from 'react-native';
import {width} from '../../../../constants/ScreenSize';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
const styles = StyleSheet.create({
  searchview: {
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  mainview: {
    alignSelf: 'center', marginTop: 15, width: '90%'
  },
  question: {
    fontSize: fontsize.Regular, fontFamily: fonts.Bold
  },
  _rendernotiListsview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 25,
  },
  
  
});

export default styles;
