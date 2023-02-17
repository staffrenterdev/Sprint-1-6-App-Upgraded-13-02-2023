import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/quizstyle';

import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {connect} from 'react-redux';
import quizA from '../../../redux/actions/quizA';
import {handleErrorTwo} from '../../components/ErrorComponent';
import SignItOut from '../../components/SignItOut';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../../../redux/constants/reduxConstant';

import {Container, Content} from 'native-base';

import moment from 'moment';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import LogoutA from '../../../redux/actions/LogoutA';
import fonts from '../../../constants/fonts';
import {useFocusEffect} from '@react-navigation/native';

const quiz = props => {
  const [state, setState] = useState({
    email: '',
    content: '',
    loading: true,
  });
  const [date, setDate] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [exitApp, SETexitApp] = React.useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  React.useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('user').then(lang => {
        var val = JSON.parse(lang);

        global.apiToken = val.api_token;
        global.quiz_status = val.quiz_status;
      });
    });
    return unsubscribeOnBlur;
  }, []);

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      terms_condition();
    });
    return unsubscribeOnBlur;
  }, []);
  const terms_condition = () => {
    let body = new FormData();
    body.append('slug', 'quiz-home');
    setTimeout(() => {
      props.quizRequest(body);
    }, 200);
  };
  useEffect(() => {
    const quiz = props.quizRes.quizR;

    if (quiz.status == LOADING) {
      state.loading = true;
    } else if (quiz.status == SUCCESS) {
      (state.loading = false),
        setState({
          ...state,
          content: quiz.value.data.response.content,
        });
      props.defaultRequest();
    } else if (quiz.status == ERROR) {
      (state.loading = false), setAgreeLogout(handleErrorTwo(quiz));
      props.defaultRequest();
    }
  }, [props.quizRes]);

  React.useEffect(() => {
    setDate(moment(new Date()).format('dddd MMMM '));
    setDate2(moment(new Date()).format('DD'));
    setDate1(moment(new Date()).format(' YYYY'));
    if (date2 == 1) {
      setDate3('st');
    } else if (date2 == 2) {
      setDate3('nd');
    } else if (date2 == 3) {
      setDate3('rd');
    } else setDate3('th');

    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = e => {
    setMBottom(e.endCoordinates.height);
    setKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    setMBottom('100%');
    setKeyboardVisible(false);
  };
  const logout = () => {
    Alert.alert(
      I18n.t('Logout'),
      I18n.t('aresure'),
      [
        {
          text: I18n.t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: I18n.t('OK'),
          onPress: () => {
            let body = new FormData();
            body.append('token', global.apiToken);
            props.logoutRequest(body);
            setAgreeLogout(true);
          },
        },
      ],
      {cancelable: false},
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (exitApp == false) {
          SETexitApp(true);
          Alert.alert(
            I18n.t('backHandler'),
            '',
            [
              {
                text: I18n.t('No'),
                onPress: () => {
                  SETexitApp(false);
                },
                style: 'cancel',
              },
              {text: I18n.t('yes'), onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false},
          );
          return true;
        } else if (exitApp == true) {
          BackHandler.exitApp();
        }

        setTimeout(() => {
          SETexitApp(false);
        }, 1500);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => {
          logout();
        }}>
        <Text
          style={[styles.Logoutbutton,{
            
            marginVertical: Platform.OS == 'android' ? 15 : 30,
          }]}>
          {I18n.t('Logout')}
        </Text>
      </TouchableOpacity>
      <NavBar></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />

      <Content style={{}}>
        <Image
          source={Images.quiz1}
          style={{
            alignSelf: 'center',
            marginVertical: width * (10 / 375),
          }}></Image>

        <Text
          style={[
            CommonStyles.Heading_text,
            {alignSelf: 'center', marginBottom: 10},
          ]}>
          {I18n.t('Pre_quiz')}
        </Text>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={styles.Pre_quizText}>{I18n.t('Pre_quizText1')}</Text>
          <Text style={styles.Pre_quizText}>{I18n.t('Pre_quizText2')}</Text>
          <Text style={styles.Pre_quizText}>{I18n.t('Pre_quizText3')}</Text>
        </View>
      </Content>
      <View style={{position: 'absolute', width: '100%', bottom: 0}}>
        <Button
          buttonStyle={styles.Nextbutton}
          label={I18n.t('Next')}
          onPress={() => props.navigation.navigate('quizDescription')}
          isLabel={true}
          buttonTextStyle={[styles.buttonTextStyle, {fontFamily: fonts.Bold}]}
        />
      </View>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    quizRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    quizRequest: body => {
      dispatch(quizA(body));
    },
    logoutRequest: body => {
      dispatch(LogoutA(body));
    },

    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(quiz);
