import React, {memo} from 'react';
import {View} from 'react-native';

const Rail = ({text, ...restProps}) => {
  return (
    <View
      style={{flex: 1, height: 2, borderRadius: 2, backgroundColor: text}}
    />
  );
};

export default memo(Rail);
