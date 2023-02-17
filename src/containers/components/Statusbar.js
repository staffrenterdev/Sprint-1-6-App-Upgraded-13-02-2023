import React from 'react';
import {
  StatusBar,
} from 'react-native';
import colors from '../../constants/colors';
export function HideStatusBar() {
  return <StatusBar hidden={true} />;
}

export function ShowStatusBarYellow() {
  return (
    <StatusBar
      backgroundColor={colors.yellow}
      barStyle="light-content"
      hidden={false}
    />
  );
}

export function ShowStatusBarOrangeIos() {
  return (
    <StatusBar
      backgroundColor={'#FD5943'}
      barStyle="dark-content"
      hidden={false}
    />
  );
}

export function ShowStatusBarWhite() {
  return (
    <StatusBar
      backgroundColor={colors.white}
      barStyle="dark-content"
      hidden={false}
    />
  );
}

export function ShowStatusBarBlack() {
  return (
    <StatusBar
      backgroundColor={colors.black}
      barStyle="dark-content"
      hidden={false}
    />
  );
}
