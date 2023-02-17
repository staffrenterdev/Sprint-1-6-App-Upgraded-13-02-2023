import {AuthContext} from '../context/AuthContext';
import React, {useEffect} from 'react';
import {Text} from 'react-native';

export default SignItOut = ({navigator, agreeLogout = false}) => {
  const {logout} = React.useContext(AuthContext);

  const onSignOut = () => {
    if (agreeLogout) {
      logout();
    }
  };

  return <Text style={{width: 0, height: 0}} onPress={onSignOut()}></Text>;
};
