import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Label = ({text, roll, ...restProps}) => {
  return (
    <View style={styles.root} {...restProps}>
      {roll == 'createJob' ? (
        <Text style={styles.text}>{text + ' km'}</Text>
      ) : (
        <Text style={styles.text}>{'$' + text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: 'rgba(79, 79, 79, 1)',
  },
});

export default memo(Label);
