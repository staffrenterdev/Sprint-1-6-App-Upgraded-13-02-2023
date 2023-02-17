import {Platform} from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  ios: `${RNFS.LibraryDirectoryPath}/StaffRenter`,
  android: `${RNFS.ExternalStorageDirectoryPath}/StaffRenter`,
});
export const dirHome1 = Platform.select({
  ios: `${RNFS.LibraryDirectoryPath}`,
  android: `${RNFS.ExternalStorageDirectoryPath}`,
});

export const dirPicutures = `${dirHome}/Pictures`;
export const dirVideos = `${dirHome}/Videos`;
export const dirAudio = `${dirHome}/Audio`;
export const dirTxt = `${dirHome}/Txt`;

export const dirPicutures1 = `${dirHome1}/Pictures`;
export const dirVideos1 = `${dirHome1}/Videos`;
export const dirAudio1 = `${dirHome1}/Audio`;
export const dirTxt1 = `${dirHome1}/Txt`;
