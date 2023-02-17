import { PermissionsAndroid} from 'react-native';

export const checkLocationPermissionAndroid = async () => {
  let isAllowed = await requestLocationPermissionAndroid();
  return new Promise(function (res, rej) {
    if (isAllowed) {
      res(true);
    } else {
      rej(false);
    }
  });
};
export const requestLocationPermissionAndroid = async () => {
  let status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (status === 'denied' || status === 'never_ask_again') {
    return false;
  } else {
    return true;
  }
};
