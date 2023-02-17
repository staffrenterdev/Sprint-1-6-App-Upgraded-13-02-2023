import {StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';
import {height, width} from '../../../../constants/ScreenSize';

const styles = StyleSheet.create({
  labelList: {
    margin: 15,
    height: 50,
    borderRadius:25,
    backgroundColor:colors.darSkyBlue,
    justifyContent:'center',
    alignItems:'center',
  },
  labelText: {
    fontSize: 20,
    color:'white',
    fontWeight:'bold',
  },
});

export default styles;
