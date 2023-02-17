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
    
    marginTop: '8%'
    },
    headingStyle: {
      lineHeight: 24,
      letterSpacing: 1.32,
      paddingBottom: '2%'
    },
    subHeadingStyle: {
      lineHeight: 18,
      letterSpacing: 0.78
    },  
    inputBoxContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    buttonTextView: {flex: 1, flexDirection: 'row', justifyContent: 'center'},
    buttonTextStyle: {
        fontSize: sWidth * (16 / 375),
        lineHeight: 19,
        color: colors.white,
        letterSpacing: 1.06
    },
    buttonStyle:{backgroundColor: colors.darkBlueGreen},
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
      marginTop: '3%'
    },
    buttonContainer: {
        flex: 0.6,
        flexDirection: 'column',
        marginTop: 15
      },
  });
  

export default styles;
