import React, {memo} from 'react';
import { View} from 'react-native';

const RailSelected = ({text, ...restProps}) => {
  return <View style={{height: 2, backgroundColor: text, borderRadius: 2}} />;
};

export default memo(RailSelected);
