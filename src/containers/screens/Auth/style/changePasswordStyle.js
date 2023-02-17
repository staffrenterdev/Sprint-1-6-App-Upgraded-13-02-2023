import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';
import {sHeight, sWidth} from '../../../../constants/screenHeightWidth';


const styles = StyleSheet.create({
    backTop:{
      height: 172,
      width: '100%',
      
      zIndex: 0,

    }, 
    backButtonContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingLeft:Platform.OS === 'ios' ? sWidth * (10 / 375) :sWidth * (10 / 375),width:50,
    },
    logoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop:'8%',
    left: -8
    },
    textContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headingStyle: {
      lineHeight: 24,
      paddingBottom: '2%',
      color: colors.white
    },
    subHeadingStyle: {
      lineHeight: 18,
    },  
    inputBoxContainer: {
    },
    buttonTextView: {flex: 1, flexDirection: 'row', justifyContent: 'center'},
    buttonTextStyle: {
        fontSize: sWidth * (16 / 375),
        lineHeight: 19,
        color: colors.white,
    },
    buttonStyle:{backgroundColor: colors.darkBlueGreen},
    changePassCon: {
    paddingBottom: 30,
    flexDirection: 'column',
    backgroundColor: colors.white,
    flex: 1,
    
    },
    changePassContent: {
   
    },

    changePassContainer: {
      marginHorizontal: '5%',
      
      
    },
    buttonContainer: {
        flex: 0.6,
        flexDirection: 'column',
        marginTop: 15
      },
  });
  

export default styles;
