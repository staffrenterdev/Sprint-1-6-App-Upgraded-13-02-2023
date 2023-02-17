import {height, width} from '../ScreenSize';
import { Platform } from 'react-native';
const fontsize = {
    Small:Platform.OS == 'ios'? width * (12/375): width * (12/375),
    Regular:Platform.OS == 'ios'? width * (15/375): width * (15/375),
    Medium:Platform.OS == 'ios'? width * (17/375):width * (17/375),
    Large:Platform.OS == 'ios'? width * (20/375):width * (20/375),
    Extralarge:Platform.OS == 'ios'? width * (32/375):width * (32/375)
   }
   export default fontsize;