//***** import libraries */
import {showMessage} from 'react-native-flash-message';
import colors from '../../constants/colors';
import I18n from '../../constants/i18n';
// import { CommonStyles } from "../assets/css";

//***** Function for showing alert messages for 5 sec in whole app */
export function showToast(message, type = 'success', btnText = '') {
  showMessage({
    position: 'top',
    message: I18n.t('Success') ,
    icon: 'success',
    description: message,
    duration: 5000,
    type: type,
    textStyle: {marginRight: 10},
    backgroundColor: colors.yellow,
    color: '#ffffff',
  });
}

//***** Function for showing alert messages for 5 sec in whole app */
export function showToastModal(message, type = 'success', btnText = '') {
  showMessage({
    position: 'top',
    message: I18n.t('Success') ,
    icon: 'success',
    description: message,
    duration: 5000,
    type: type,
    textStyle: {marginRight: 10},
    backgroundColor: colors.yellow,
    color: '#ffffff',
    zIndex: 9999,
  });
}

//***** Function for showing long alert messages for 10 sec in whole app */
export function showToastLong(message, type = 'success', btnText = '') {
  showMessage({
    position: 'top',
    message: I18n.t('Success') ,
    icon: 'success',
    description: message,
    duration: 10000,
    type: type,
    textStyle: {marginRight: 10},
    backgroundColor: colors.yellow,
    color: '#ffffff',
  });
}

//***** Function for showing danger(red) alert messages in whole app */
export function showDangerToast(message, type = 'danger', btnText = '') {
  showMessage({
    position: 'top',
    message: I18n.t('Alert') ,
    icon: 'danger',
    description: message,
    textStyle: {marginRight: 10},
    duration: 5000,
    type: type,
  });
}

//***** Function for showing long danger(red) alert messages in whole app */
export function showDangerToastLong(message, type = 'danger', btnText = '') {
  showMessage({
    position: 'top',
    message:  I18n.t('Alert'),
    icon: 'danger',
    description: message,
    duration: 20000,
    type: type,
    textStyle: {
      flex: 1,
      paddingRight: 15,
    },
  });
}

// dataMissingToast
export const dataMissingToast = () => {
  return showDangerToast(
    'Data missing or not valid. Please fill all required fields. ',
  );
};
