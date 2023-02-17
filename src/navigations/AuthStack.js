import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../containers/screens/Auth/SignUp';
import Welcome from '../containers/screens/Auth/Welcome';
import login from '../containers/screens/Auth/login';
import ForgotPassword from '../containers/screens/Auth/ForgotPassword';
import verification from '../containers/screens/Auth/Verification';
import ResetPassword from '../containers/screens/Auth/ResetPassword';
import AppStack from './AppStack';


const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="login" component={login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={verification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="quiz" component={AppStack} />
    </Stack.Navigator>
  );
}

export default AuthStack;
