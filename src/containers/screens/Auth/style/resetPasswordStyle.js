import {StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';
import fontsize from '../../../../constants/i18n/Fontsizes';
import {height, width} from '../../../../constants/ScreenSize';

const styles = StyleSheet.create({
  signupTextStyle: {
    color: colors.teal,
  },
  buttonTextStyle: {
    fontSize:fontsize.Regular,
 
    color: colors.white,
    fontWeight:'bold',
    
  },
  buttonTextStyle1: {
    fontSize: 16,
 
    color: colors.inputTitle,
    fontWeight:'bold',
    
  },
  labelTextStyle: {
    fontSize: 15,
   
    color: colors.inputTitle,
    fontWeight:'bold',

  },
  buttonStyle3: {
    backgroundColor: colors.yellow,
     height: width * (50 / 375),
    marginTop: width * (20 / 375),
    width:width*(150/375),
  
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '5%',
    alignSelf:'center',
    marginBottom:width*(30/375)
  },
  buttonStyle: {
    backgroundColor: colors.yellow,
     height: width * (50 / 375),
    marginTop: width * (90 / 375),
  width:'90%',
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '5%',
    alignSelf:'center'
  },
  buttonStyle1: {
     height: width * (50 / 375),
    marginTop: width * (20 / 375),
   
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '5%'
    , borderWidth: 1
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberView: {flexDirection: 'row', alignItems: 'center'},
  remember: {
    borderColor: 'black',
    height: width * (20 / 375),
    width: width * (20 / 375),
    borderWidth: 1,
   
  },
  remember1: {
    borderColor: 'black',
    height: width * (20 / 375),
    width: width * (20 / 375),
   
  },
  remember_img: {
    height: '100%',
    width: '100%',
  },
  remember_text: {
    fontSize: 12,
    marginLeft: 8,
   
  },
  forgotPassword: {fontSize: 13,
    color:colors.yellow,
  },
  resetpasswordText:{
    fontSize: fontsize.Extralarge,
    marginBottom: width * (40 / 375),
    paddingHorizontal: width * (20 / 375),
    alignSelf:"center",
    color:colors.yellow
  }
});

export default styles;
