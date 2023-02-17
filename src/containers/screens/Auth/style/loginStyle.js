import {Platform, StyleSheet} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
import {height, width} from '../../../../constants/ScreenSize';

const styles = StyleSheet.create({
  signupTextStyle: {
    color: colors.teal,
  },
  asText: {
    fontSize: fontsize.Extralarge,
    lineHeight: width * (38 / 375),
   
  },
  got_it2button:{
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * (60 / 375),
    marginBottom: '15%',
    width: '50%',
  },
  headingview: {
    
    alignSelf: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: fontsize.Extralarge,
    lineHeight: width * (38 / 375),
  },
  buttonTextStyle: {
    fontSize: 16,

    color: colors.inputTitle,
    fontWeight: 'bold',
  },
  buttonTextStyle1: {
    fontSize: 16,

    color: colors.white,
    fontWeight: 'bold',
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
    width: '90%',

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
   
    alignSelf: 'center',
    marginBottom: width * (30 / 375),
    marginTop: width * (30 / 375),
  },
  buttonStyle4: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    marginTop: width * (50 / 375),

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: width * (15 / 375),
  },
  buttonStyle5: {
    height: width * (50 / 375),
    

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * (30 / 375),
    borderWidth: 1,
  },
  buttonStyle: {
    backgroundColor: colors.yellow,
    height: width * (50 / 375),
    marginTop: width * (20 / 375),

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle1: {
    height: width * (50 / 375),
    marginTop: width * (20 / 375),

    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    
    borderWidth: 1,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: width * (30 / 375),
  },
  rememberView: {flexDirection: 'row', alignItems: 'center'},
  remember: {
    borderColor: 'black',
    height: width * (15 / 375),
    width: width * (15 / 375),
    borderWidth: 1,
  },
  remember1: {
    borderColor: 'black',
    height: width * (15 / 375),
    width: width * (15 / 375),
  },
  remember_img: {
    height: '100%',
    width: '100%',
  },
  remember_text: {
   
    marginLeft: 8,
  },
  forgotPassword: {
    color: colors.yellow,
  },
  forgotPassword1: {
    
    color: colors.yellow,
    alignSelf: 'center',
    marginBottom: width * (20 / 375),
  },
  imageBackground: {width: width, height: height * (70 / 375)},
  text: {alignSelf: 'center', marginTop: height * (30 / 375)},
  buttonContainer: {marginHorizontal: width * (20 / 375)},
  content: {
    backgroundColor: colors.white,
   
    borderTopLeftRadius: width * (20 / 375),
    borderTopRightRadius: width * (20 / 375),
    marginTop: width * (-20 / 375),
  
  },
  conatiner: {flex: 1},
  textboxView: {
    marginHorizontal: width * (20 / 375),
  },
  textboxView1: {
   
  },
  textboxView2: {
    marginHorizontal: width * (20 / 375),
   
  },
  view12: {
   

    alignSelf: 'center',

    justifyContent: 'flex-end',
  },
  text12: {
    alignSelf: 'center',
    color: colors.gray2,
 
    marginTop: hasNotch
      ? width * (20 / 375)
      : Platform.OS == 'ios'
      ? width * (5 / 375)
      : width * (5 / 375),
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
  otp: { height: 80,
    marginTop: width * (20 / 375),
    marginHorizontal: '5%',
    shadowColor: colors.shadowColor,
    shadowOpacity: 10,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },},

  modelview: {
    backgroundColor: colors.white,
 
    flex: 1,
  },

  modelview1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * (25 / 375),
  },

  modelview3: {
    backgroundColor: colors.white,
    borderTopLeftRadius: width * (20 / 375),
    borderTopRightRadius: width * (20 / 375),
    paddingHorizontal: width * (25 / 375),
    paddingTop: width * (25 / 375),
   
  },
  modelviewNew3: {
    backgroundColor: colors.white,
    flex:1
   
  },
  backbutton: {
    flexDirection: 'row',
    height: width * (40 / 375),

    alignItems: 'center',
    width: width * (50 / 375),
    justifyContent: 'space-between',
    marginVertical:'3%',
    marginHorizontal:'3%'
   
  },
  closeIcon:{
    flexDirection: 'row',
    height: width * (40 / 375),

    alignItems: 'center',
    width: width * (50 / 375),
    justifyContent: 'space-between',
    marginVertical: '3%',
    marginHorizontal: '3%',
  },
  backbuttontext: {
    color: colors.yellow,fontSize:fontsize.Regular,marginLeft:2
   
  },
  businessokbutton: {
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * (60 / 375),
    marginBottom: '7%',
    width: '50%',
   
  },
  businessbutton: {
    flexDirection: 'row',
    borderRadius: width * (30 / 375),
    height:width * (40 / 375),
    borderColor: colors.yellow,
    alignSelf:'center',
    marginRight:15,
    borderWidth:
    width * (1 / 375),
    alignItems: 'center',
    
    backgroundColor:colors.transparentwithyellow,
    width: width * (150 / 375),
    justifyContent: 'space-evenly',
  },
  wrongcode: {
    color: 'red',
    alignSelf: 'center',
    paddingHorizontal: width * (10 / 375),
    paddingVertical: width * (3 / 375),
  },
  emailCheck: {
    marginTop: width * (-5 / 375),
    marginBottom: width * (10 / 375),
    fontSize: fontsize.Small,
    color: colors.red,
  },
  resendOtp: {
    fontSize: fontsize.Small,
    fontFamily: fonts.Bold,
    color: colors.yellow,
    alignSelf: 'center',
    marginBottom: 30,
  },
  
});

export default styles;
