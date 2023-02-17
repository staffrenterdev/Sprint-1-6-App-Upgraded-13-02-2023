import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AboutUs from '../containers/screens/app/AboutUs';
import PrivacyPolicy from '../containers/screens/app/privacyPolicy';
import completeProfile from '../containers/screens/app/completeProfile';
import ProfileInformation from '../containers/screens/app/ProfileInformation';
import LocationPicker from '../containers/components/LocationPicker';
import experience from '../containers/screens/app/experience';
import BackgroundCheck from '../containers/screens/app/BackgroundCheck2';
import quiz from '../containers/screens/app/quiz';
import quizDescription from '../containers/screens/app/quizDescription';
import Game from '../containers/screens/app/Game';
import signature from '../containers/screens/app/signature';
import skills from '../containers/screens/app/skills';
import BottomtabNavigator from './BottomtabNavigator';
import BackgroundCheckNo from '../containers/screens/app/BackgroundCheckNo';
import BackgroundCheckYes from '../containers/screens/app/BackgroundCheckYes';
import BackgroundCheckFinal from '../containers/screens/app/BackgroundCheckFinal';
import BackgroundCheckStatus from '../containers/screens/app/BackgroundCheckStatus';
import BackgroundCheckStatusRevision from '../containers/screens/app/BackgroundCheckRevision';
import Jobfilter from '../containers/components/Jobfilter';
import Jobdetails from '../containers/screens/app/Jobdetails';
import WalletMain from '../containers/screens/app/WalletMain';
import Invoicesettings from '../containers/screens/app/InvoiceSetting';
import WorkExperience from '../containers/screens/app/WorkExperience';
import Profile_settings from '../containers/screens/app/Profile_settings';
import InviteFriends from '../containers/screens/app/InviteFriends';
import Help from '../containers/screens/app/Help';
import Support from '../containers/screens/app/Support';
import FAQ from '../containers/screens/app/FAQ';
import Term_conditions from '../containers/screens/app/Term_conditions';
import Preferences from '../containers/screens/app/Preferences';
import Presentation from '../containers/screens/app/Presentation';
import EducationandCertification from '../containers/screens/app/EducationandCertification';
import Messenger from '../containers/screens/app/Messenger';
import document from '../containers/screens/app/document';
import Chat from '../containers/screens/app/Chat';
import Communication from '../containers/screens/app/Communication';
import References from '../containers/screens/app/References';
import Consentreference from '../containers/screens/app/Consentreference';
import ConsentSignature from '../containers/screens/app/ConsentSignature';

const Stack = createStackNavigator();

function AppStack() {
  AsyncStorage.getItem('user').then(lang => {
    var val = JSON.parse(lang);
    global.apiToken = val.api_token;
    global.quiz_status = val.quiz_status;
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        global.quiz_status == null || global.quiz_status == 1 || global.quiz_status == undefined || !global.quiz_status
          ? 'quiz'
          : 'Home'
      }>
      <Stack.Screen name="quiz" component={quiz} />
      <Stack.Screen
        name="Home"
        component={BottomtabNavigator}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="completeProfile" component={completeProfile} />
      <Stack.Screen name="ProfileInformation" component={ProfileInformation} />
      <Stack.Screen name="Presentation" component={Presentation} />
      <Stack.Screen name="WorkExperience" component={WorkExperience} />
      <Stack.Screen name="Profile_settings" component={Profile_settings} />
      <Stack.Screen name="InviteFriends" component={InviteFriends} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Term_conditions" component={Term_conditions} />
      <Stack.Screen name="LocationPicker" component={LocationPicker} />
      <Stack.Screen name="experience" component={experience} />
      <Stack.Screen name="BackgroundCheck" component={BackgroundCheck} />
      <Stack.Screen name="BackgroundCheckNo" component={BackgroundCheckNo} />
      <Stack.Screen name="BackgroundCheckYes" component={BackgroundCheckYes} />
      <Stack.Screen name="BackgroundCheckFinal" component={BackgroundCheckFinal} />
      <Stack.Screen name="BackgroundCheckStatus" component={BackgroundCheckStatus} />
      <Stack.Screen name="BackgroundCheckStatusRevision" component={BackgroundCheckStatusRevision} />
      <Stack.Screen name="Communication" component={Communication} />
      <Stack.Screen name="Consentreference" component={Consentreference} />
  
      <Stack.Screen name="document" component={document} />
      <Stack.Screen name="Invoicesettings" component={Invoicesettings} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="References" component={References} />
      <Stack.Screen name="ConsentSignature" component={ConsentSignature} />
      <Stack.Screen name="quizDescription" component={quizDescription} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="signature" component={signature} />
      <Stack.Screen name="Jobfilter" component={Jobfilter} />
      <Stack.Screen name="WalletMain" component={WalletMain} />
      <Stack.Screen name="Jobdetails" component={Jobdetails} />
      <Stack.Screen name="skills" component={skills} />
      <Stack.Screen name="EducationandCertification" component={EducationandCertification} />
    </Stack.Navigator>
  );
}

export default AppStack;
