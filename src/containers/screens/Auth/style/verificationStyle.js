import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';
import {sHeight, sWidth} from '../../../../constants/screenHeightWidth';

const styles = StyleSheet.create({
  backTop: {
    height: 172,
    width: '100%',
   
    zIndex: 0,

    
  },
  backButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft:
      Platform.OS === 'ios' ? sWidth * (10 / 375) : sWidth * (10 / 375),
    width: 50,
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '8%',
    left: -8,
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: '8%',
  },
  headingStyle: {

    letterSpacing: 1.32,
    paddingBottom: '2%',
  },
  subHeadingStyle: {
  
    letterSpacing: 0.78,
  },
  inputBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
    marginHorizontal: '10%',
  },
  buttonTextView: {flex: 1, flexDirection: 'row', justifyContent: 'center'},
  buttonTextStyle: {
    fontSize: sWidth * (16 / 375),

    color: colors.white,
    letterSpacing: 1.06,
  },
  buttonStyle: {backgroundColor: colors.darkBlueGreen},
  forPassCon: {
    paddingBottom: 30,
    flexDirection: 'column',
    backgroundColor: colors.white,
    flex: 1,
  },
  forPassContent: {
  },
  forPassContainer: {
    paddingHorizontal: '8%',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '3%',
  },
  buttonContainer: {
    flex: 0.6,
    flexDirection: 'column',
    marginTop: '10%',
  },

  lastTextStyle: {margin: 5},
  loginText: {
    color: colors.greyblue,
    fontSize: sWidth * (14 / 375),
    
    textAlign: 'center',
    letterSpacing: 0.78,
  },
  loginTextStyle: {
    color: colors.teal,
  },
  loginContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: '20%',
    marginHorizontal: '8%',
  },

  Otpheight: {height: 80},
  underlineStyleBase: {
    width: sWidth * (66 / 375),
    height: sWidth * (50 / 375),
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: colors.whiteFour,
    marginHorizontal: 10,
    fontSize: sWidth * (24 / 375),
    textAlign: 'center',
    color: 'black',
  },
});

export default styles;
