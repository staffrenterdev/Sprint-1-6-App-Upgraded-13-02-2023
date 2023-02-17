import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import {connect} from 'react-redux';
import loginA from '../../../redux/actions/loginA';
import {width} from '../../../constants/ScreenSize';
import {SUCCESS, ERROR, LOADING} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import ForgotPasswordA from '../../../redux/actions/ForgotPasswordA';
import ResendA from '../../../redux/actions/ResendA';
import VerificationA from '../../../redux/actions/VerificationA';
import validate from '../../../assets/validation/validate_wrapper';
import TextBox from '../../components/TextBox';
import Loader from '../../components/loader';
import Button from '../../components/Button';
import styles from '../../screens/Auth/style/loginStyle';
import {Container, Content} from 'native-base';
import colors from '../../../constants/colors';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../../constants/images';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import I18n from '../../../constants/i18n';

import CommonStyles from '../../../assets/css/commonStyles';
import {handleErrorTwo} from '../../components/ErrorComponent';
import {Bubbles} from 'react-native-loader';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';

var emailReq = '';
var passwordError = '';

export function SignItIn({navigator, data = null}) {
  const {login} = React.useContext(AuthContext);

  const onLogin = () => {
    if (data) {
      login(data);
    }
  };

  return <Text style={{width: 0, height: 0}} onPress={onLogin()}></Text>;
}

const login = props => {
  const [state, setState] = useState({
    email: '',
    password: '',
    emailReq: '',
    passwordError: '',
    loading: false,
    data: '',
    otp: '',
    otpError: '',
    email1: '',
    emailReq1: '',
    resendOtp: '',
  });
  const [businessModal, setBusinessModal] = useState(false);
  const [remember, setRemember] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible1, setModalVisible1] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [error, setError] = React.useState(false);
  const [otpValidate, setOtpValidate] = React.useState(false);
  const [otpValidate1, setOtpValidate1] = React.useState(false);
  const [emailCheck, setEmailCheck] = React.useState('');
  const [emailinvalide, setEmailinvalide] = useState('');
  const [forgotButton, setForgotButton] = React.useState(false);
  const [passcodeValidate, setPassCodeError] = React.useState(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    AsyncStorage.getItem('appLanguage').then(lang => {
      var val = JSON.parse(lang);

      if (val) {
        global.language = val;
      }
      I18n.locale = val == 'en' || val == null ? 'en' : 'fr';
    });
  });

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      setRememberData();
    });
    return unsubscribeOnBlur;
  }, []);

  useEffect(() => {
    const loginRes = props.loginRes.loginR;

    if (loginRes.status == LOADING) {
      setState({...state, loading: true});
    } else if (loginRes.status == SUCCESS) {
      setState({...state, loading: false, data: loginRes.value.data?.response});

      global.apiToken = loginRes.value.data.response?.api_token;
      global.quiz_status = loginRes.value.data.response?.quiz_status;
      AsyncStorage.setItem(
        'quiz_Status',
        JSON.stringify(loginRes.value.data.response?.quiz_status),
      );
      AsyncStorage.setItem(
        'user',
        JSON.stringify(loginRes?.value?.data?.response),
      );
      if (remember == true) {
        AsyncStorage.setItem('RememberMe', JSON.stringify(rememberData));
      } else {
        AsyncStorage.removeItem('RememberMe');
      }
      let response =
        loginRes.value && loginRes.value.data && loginRes.value.data?.response;

      props.defaultRequest();
    } else if (loginRes.status == ERROR) {
      setState({...state, loading: false});

      if (loginRes?.error?.response?.data?.status == 1) {
        state.resendOtp = '';
        setModalVisible2(true);
      } else handleErrorTwo(loginRes);
      props.defaultRequest();
    }
  }, [props.loginRes]);

  useEffect(() => {
    const ForgotPassword = props.forgotRes.ForgotPasswordR;
    if (ForgotPassword.status == LOADING) {
      setForgotButton(true);
    } else if (ForgotPassword.status == SUCCESS) {
      setForgotButton(false);
      state.otp = '';
      state.resendOtp = '';
      setModalVisible(false);
      setEmailinvalide('');
      setModalVisible2(true);
      setError(false);

      props.defaultRequest();
    } else if (ForgotPassword.status == ERROR) {
      setForgotButton(false);
      if (ForgotPassword.error.response.status == 401) {
        setEmailCheck(ForgotPassword?.error?.response?.data?.errors?.email);
        setEmailinvalide(ForgotPassword?.error?.response?.data?.message);
      } else {
        setModalVisible(false);
        setEmailinvalide('');
      }
      props.defaultRequest();
    }
  }, [props.forgotRes]);

  useEffect(() => {
    const verification = props.verificationRes.VerificationR;

    if (verification.status == LOADING) {
      setOtpValidate(true);
    } else if (verification.status == SUCCESS) {
      setOtpValidate(false);
      setError(false);
      setModalVisible2(false);

      if (state.email != '') {
        props.navigation.navigate('ResetPassword', {
          email: state.email,
        });
      } else {
        AsyncStorage.setItem(
          'quiz_Status',
          JSON.stringify(verification.value.data.response.quiz_status),
        );
        global.apiToken = verification.value.data.response.api_token;
        global.quiz_status = verification.value.data.response.quiz_status;
        setPassCodeError(false);
        setState({
          ...state,
          loading: false,
          data: verification.value.data.response,
        });
      }
      props.defaultRequest();
    } else if (verification.status == ERROR) {
      setOtpValidate(false);
      setError(true);

      props.defaultRequest();
    }
  }, [props.verificationRes]);

  useEffect(() => {
    const Resend = props.ResendRes.ResendOtpR;

    if (Resend.status == LOADING) {
      setOtpValidate1(true);
    } else if (Resend.status == SUCCESS) {
      state.resendOtp = Resend.value.data.message;

      setOtpValidate1(false);
      props.defaultRequest();
    } else if (Resend.status == ERROR) {
      setOtpValidate1(false);

      props.defaultRequest();
    }
  }, [props.ResendRes]);
  useEffect(() => {
    const passcode = props.passcodeRes.passcodeR;
    if (passcode.status == LOADING) {
      setPassCodeError(true);
    } else if (passcode.status == SUCCESS) {
      AsyncStorage.setItem(
        'quiz_Status',
        JSON.stringify(passcode.value.data.response.quiz_status),
      );
      global.apiToken = passcode.value.data.response.api_token;
      global.quiz_status = passcode.value.data.response.quiz_status;
      setPassCodeError(false);
      setState({...state, loading: false, data: passcode.value.data.response});
      setModalVisible1(false);

      props.defaultRequest();
    } else if (passcode.status == ERROR) {
      setPassCodeError(false);
      setState({...state, loading: false});
      handleErrorTwo(passcode);
      props.defaultRequest();
    }
  }, [props.passcodeRes]);

  //login api call

  const onLogin = () => {
    if (!checkValidation()) {
      return;
    }

    let body = new FormData();
    body.append('email', state.email1.toLowerCase());
    body.append('password', state.password);
    body.append('role_id', 3);
    body.append('language', global.language);
    props.loginRequest(body);
  };

  // forgot password api call
  const onSend = () => {
    if (!checkValidation1()) {
      return;
    }
    setState({...state, otp: ''});
    let body = new FormData();
    body.append('email', state.email.toLowerCase());
    body.append('role_id', 3);
    body.append('language', global.language);
    props.forgotRequest(body);
  };

  // check email and password is correct when login
  const checkValidation = () => {
    emailReq = validate('email', state.email1);
    passwordError = validate('Login_password', state.password);

    if (emailReq || passwordError) {
      setState({
        ...state,
        emailReq1: emailReq,
        passwordError: passwordError,
      });
      return false;
    } else {
      return true;
    }
  };
  // check email is valide or not
  const checkValidation1 = () => {
    emailReq = validate('email', state.email);
    if (emailReq) {
      setState({
        ...state,
        emailReq: emailReq,
      });
      return false;
    } else {
      return true;
    }
  };

  // check otp is valide or not
  const checkValidation2 = () => {
    const otpError = validate('otp', state.otp);

    if (otpError) {
      setState({
        ...state,
        otpError: otpError,
      });
      return false;
    } else {
      setState({
        ...state,
        otpError: '',
      });
      return true;
    }
  };
  const verificationOtp = () => {
    state.resendOtp = '';
    if (!checkValidation2()) {
      return;
    }
    let body = new FormData();
    {
      state.email != ''
        ? body.append('email', state.email.toLowerCase())
        : body.append('email', state.email1.toLowerCase());
    }
    body.append('otp', state.otp);
    body.append('role_id', 3);
    body.append('language', global.language);
    props.verificationRequest(body);
  };

  const resendOtp = () => {
    state.otp = '';
    state.otpError = '';
    (state.resendOtp = ''), setError(false);
    let body = new FormData();
    {
      state.email != '' && body.append('email', state.email.toLowerCase());
    }
    {
      state.email1 != '' && body.append('email', state.email1.toLowerCase());
    }
    body.append('role_id', 3);
    body.append('language', global.language);
    props.resendRequest(body);
  };

  const rememberData = {
    Email: state.email1,
    Password: state.password,
    Remember: remember,
  };

  const setRememberData = () => {
    AsyncStorage.getItem('RememberMe').then(lang => {
      var val = JSON.parse(lang);

      setState({...state, email1: val.Email, password: val.Password});
      setRemember(val.Remember);
    });
  };

  return (
    <Container style={{flex: 1, backgroundColor: colors.white}}>
      <ShowStatusBarWhite />

      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.conatiner}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.backbutton}
              onPress={() => props.navigation.goBack()}>
              <Image source={Images.backarrow}></Image>
              <Text style={styles.backbuttontext}>{I18n.t('Back')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBusinessModal(true);
              }}
              style={styles.businessbutton}>
              <Text style={{color: colors.yellow, fontSize: fontsize.Regular}}>
                {I18n.t('As_business')}
              </Text>
            </TouchableOpacity>
          </View>

          <Loader loading={state.loading} />
          <SignItIn navigator={props.navigation} data={state.data} />
          <ImageBackground style={styles.imageBackground}>
            <Text style={[CommonStyles.HeadingText2, styles.text]}>
              {I18n.t('Login')}
            </Text>
          </ImageBackground>
          <Content keyboardShouldPersistTaps={'handled'} style={styles.content}>
            <TextBox
              secureTextEntry={false}
              rightImage={Images.emailRightarrow}
              viewStyle={styles.textboxView}
              inputTitle={I18n.t('Email')}
              view1={[
                styles.textboxView1,
                {
                  marginTop: width * (10 / 375),
                  marginHorizontal: width * (20 / 375),
                },
              ]}
              textStyle={{padding: 0}}
              error={state.emailReq1 && I18n.t(state.emailReq1)}
              isPlaceHolder={true}
              placeholder={I18n.t('Writeemail')}
              onChangeText={prevState => {
                setState({
                  ...state,
                  email1: prevState == '' ? prevState : prevState.trimLeft(),
                  emailReq1: validate('emailReq', prevState),
                });
              }}
              onSubmitEditing={Keyboard.dismiss}
              keyboardType={'email-address'}
              value={state.email1}
              autoCapitalize={'none'}
            />

            <TextBox
              rightImage2={Images.eyehide}
              rightImage={Images.eyeshow}
              ishideimage={true}
              viewStyle={styles.textboxView2}
              inputTitle={I18n.t('Password')}
              view1={{marginHorizontal: width * (20 / 375)}}
              error={state.passwordError && I18n.t(state.passwordError)}
              isPlaceHolder={true}
              placeholder={I18n.t('Writepassword')}
              secureTextEntry={true}
              onChangeText={prevState => {
                setState({
                  ...state,
                  password: prevState == '' ? prevState : prevState,
                  passwordError: validate('Login_password', prevState),
                });
              }}
              onSubmitEditing={Keyboard.dismiss}
              value={state.password}
            />

            <View style={[styles.view]}>
              <View style={styles.rememberView}>
                <TouchableOpacity
                  style={[
                    remember == true ? styles.remember1 : styles.remember,
                    {borderRadius: 4},
                  ]}
                  onPress={() => setRemember(!remember)}>
                  {remember == true && (
                    <Image
                      source={Images.Remember}
                      style={styles.remember_img}
                    />
                  )}
                </TouchableOpacity>

                <Text
                  style={[styles.remember_text, CommonStyles.SubHeadingText2]}>
                  {I18n.t('RememberMe')}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setState({...state, email: state.email1});
                  }}>
                  <Text
                    style={[
                      CommonStyles.SubHeadingText2,
                      {color: colors.yellow, fontFamily: fonts.Bold},
                    ]}>
                    {I18n.t('Forgot_password')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.buttonContainer,
                {marginVertical: width * (35 / 375)},
              ]}>
              <Button
                buttonStyle={styles.buttonStyle}
                label={I18n.t('Login')}
                onPress={() => onLogin()}
                isLabel={true}
                buttonTextStyle={CommonStyles.buttontext}
              />
            </View>

            <Text style={[CommonStyles.SubHeadingText2, styles.text12]}>
              {I18n.t('have_an_account')}

              <Text
                style={{color: colors.yellow, fontFamily: fonts.Bold}}
                onPress={() => {
                  props.navigation.navigate('SignUp'), Keyboard.dismiss;
                }}>
                {' '}
                {I18n.t('Register')}
              </Text>
            </Text>
          </Content>
          {/* model for business */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={businessModal}
            onRequestClose={() => setBusinessModal(false)}>
            <TouchableWithoutFeedback
              onPressOut={() => {
                setBusinessModal(false);
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.modelBackground,
                  justifyContent: 'center',
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setBusinessModal(true);
                  }}>
                  <View style={CommonStyles.CenterModalView}>
                    <TouchableOpacity
                      style={CommonStyles.backbuttonTouchable}
                      onPress={() => setBusinessModal(false)}>
                      <Image source={Images.close}></Image>
                    </TouchableOpacity>
                    <View
                      style={{
                        marginTop: 15,
                      }}>
                      <View style={{alignSelf: 'center'}}>
                        <Text
                          style={{
                            fontSize: fontsize.Extralarge,
                            fontFamily: fonts.Medium,
                          }}>
                          {I18n.t('Loginas')}
                        </Text>
                        <Text
                          style={[
                            CommonStyles.SubHeadingText1,
                            styles.asText,
                            {color: colors.yellow, alignSelf: 'center'},
                          ]}>
                          {I18n.t('Business')}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.titleText,
                          {
                            alignSelf: 'center',
                            marginVertical: 20,
                            textAlign: 'center',
                            marginHorizontal: 40,
                          },
                        ]}>
                        {I18n.t('redirectedweb')}
                      </Text>

                      <View style={{alignItems: 'center', marginVertical: 20}}>
                        <Button
                          buttonStyle={[styles.got_it2button]}
                          label={I18n.t('got_it2')}
                          onPress={() => {
                            Linking.openURL(
                              'https://stagingstaffrenter.devtechnosys.tech/stagingstaffrenter/admin',
                            ),
                              setBusinessModal(false);
                          }}
                          isLabel={true}
                          buttonTextStyle={[
                            CommonStyles.buttontext,
                            {
                              fontsize: fontsize.Regular,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* model for forgot password */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false), setEmailinvalide('');
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{
                flex: 1,
                justifyContent: 'flex-end',

                backgroundColor: colors.white,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',

                  backgroundColor: colors.white,
                }}>
                <TouchableOpacity
                  style={[
                    styles.backbutton,
                    {marginTop: Platform.OS == 'ios' ? 40 : 0},
                  ]}
                  onPress={() => {
                    setModalVisible(false), setEmailinvalide('');
                  }}>
                  <Image source={Images.backarrow}></Image>
                  <Text style={styles.backbuttontext}>{I18n.t('Back')}</Text>
                </TouchableOpacity>
                <ScrollView
                  keyboardShouldPersistTaps={'handled'}
                  contentContainerStyle={{}}
                  showsVerticalScrollIndicator={false}
                  style={styles.modelviewNew3}>
                  <View
                    style={[
                      styles.headingview,
                      {
                        marginTop: width * (60 / 375),
                        marginBottom: width * (60 / 375),
                        flexDirection: 'row',
                      },
                    ]}>
                    <Text
                      style={[
                        CommonStyles.SubHeadingText1,
                        styles.registerText,
                        {color: colors.yellow},
                      ]}>
                      {I18n.t('FORGOT')}
                    </Text>
                    <Text style={[CommonStyles.SubHeadingText1, styles.asText]}>
                      <Text style={{color: colors.black}}>
                        {' '}
                        {I18n.t('PASSWORD')}
                      </Text>
                    </Text>
                  </View>
                  <Text
                    style={[
                      CommonStyles.NormalText,
                      {
                        alignSelf: 'center',
                        marginTop: width * (8 / 375),
                        marginBottom: width * (60 / 375),
                      },
                    ]}>
                    {I18n.t('email_to_reset_password')}
                  </Text>
                  <TextBox
                    secureTextEntry={false}
                    rightImage={Images.mail}
                    inputTitle={I18n.t('Email')}
                    view1={[
                      styles.textboxView1,
                      {marginTop: width * (10 / 375)},
                    ]}
                    error={
                      (state.emailReq && I18n.t(state.emailReq)) ||
                      emailinvalide
                    }
                    errorStyle={{marginHorizontal: width * (0 / 375)}}
                    isPlaceHolder={true}
                    placeholder={I18n.t('Writeyouremail')}
                    onChangeText={prevState => {
                      setState({
                        ...state,
                        email:
                          prevState == '' ? prevState : prevState.trimLeft(),
                        emailReq: validate('emailReq', prevState),
                      });
                      setEmailCheck('');
                    }}
                    onSubmitEditing={Keyboard.dismiss}
                    keyboardType={'email-address'}
                    value={state.email}
                    autoCapitalize={'none'}
                  />

                  {emailCheck != '' && (
                    <Text
                      style={styles.emailCheck}>
                      {emailCheck}
                    </Text>
                  )}
                  {forgotButton == true && (
                    <View style={{height: width * (70 / 375)}}></View>
                  )}
                  {forgotButton == true && (
                    <View
                      style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        bottom: width * (20 / 375),
                        zIndex: 1,
                        width: width,
                        right: 0,
                        alignItems: 'center',
                        height: width * (50 / 375),
                      }}>
                      <Bubbles size={10} color="rgba(253, 191, 90, 1)" />
                    </View>
                  )}
                  {forgotButton == false && (
                    <Button
                      buttonStyle={[
                        styles.buttonStyle3,
                        {marginTop: width * (100 / 375)},
                      ]}
                      label={I18n.t('Send')}
                      onPress={() => onSend()}
                      isLabel={true}
                      buttonTextStyle={[
                        styles.buttonTextStyle1,
                        {fontSize: fontsize.Large},
                      ]}
                    />
                  )}
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </Modal>

          {/* model for verification */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}>
            <KeyboardAvoidingView
              keyboardShouldPersistTaps={'handled'}
              style={{flex: 1}}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',

                  backgroundColor: colors.modelBackground,
                }}>
                <View style={styles.modelview}>
                  <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.modelview1}>
                      <TouchableOpacity
                        style={styles.backbutton}
                        onPress={() => setModalVisible2(false)}>
                        <Image source={Images.backarrow}></Image>
                        <Text style={styles.backbuttontext}>
                          {I18n.t('Back')}
                        </Text>
                      </TouchableOpacity>

                      {otpValidate == true && (
                        <View
                          style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            zIndex: 1,
                            right: 0,
                            alignItems: 'center',
                            height: width * (50 / 375),
                          }}>
                          <Bubbles size={10} color="rgba(253, 191, 90, 1)" />
                        </View>
                      )}
                      {otpValidate == false && (
                        <TouchableOpacity onPress={() => verificationOtp()}>
                          <Text
                            style={[
                              CommonStyles.HeadingText3,
                              {
                                color: colors.yellow,
                                fontSize: fontsize.Regular,
                                marginTop: 20,
                                marginRight: 20,
                              },
                            ]}>
                            {I18n.t('Confirm')}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 1}}>
                        <View
                          style={[
                            styles.headingview,
                            {
                              marginTop: width * (40 / 375),
                              marginBottom: width * (60 / 375),
                            },
                          ]}>
                          <Text
                            style={[
                              CommonStyles.SubHeadingText1,
                              styles.registerText,
                              {alignSelf: 'center'},
                            ]}>
                            {I18n.t('Validate_your')}
                          </Text>
                          <Text
                            style={[
                              CommonStyles.SubHeadingText1,
                              styles.asText,
                            ]}>
                            <Text style={{color: colors.yellow}}>
                              {' '}
                              {I18n.t('account')}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text
                      style={[
                        CommonStyles.RegularText4,
                        {alignSelf: 'center', marginTop: width * (20 / 375)},
                      ]}>
                      {I18n.t('digit_code')}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.RegularText4,
                        {textAlign: 'center', width: '100%'},
                      ]}>
                      {I18n.t('code_send')}
                      <Text
                        style={{color: colors.black, fontFamily: fonts.Bold}}>
                        {' '}
                        {state.email ? state.email : state.email1}
                      </Text>
                    </Text>

                    <OTPInputView
                      style={[
                        styles.otp,

                        {
                          borderWidth: 0,
                        },
                      ]}
                      pinCount={4}
                      code={state.otp}
                      onCodeChanged={code => {
                        setError(false);
                        setState({
                          ...state,
                          otp: code == '' ? code : code,
                          otpStatus: false,
                          resendOtp: '',
                        });
                      }}
                      codeInputHighlightStyle={{
                        borderColor: colors.yellow,
                        borderWidth: 3,
                      }}
                      autoFocusOnLoad={false}
                      placeholderTextColor={colors.darkBlueGreen}
                      keyboardType="phone-pad"
                      codeInputFieldStyle={[
                        styles.codeInput,
                        {
                          borderColor:
                            error == true ? colors.red : colors.yellow,
                          color: error == true ? colors.red : colors.black,
                          backgroundColor:
                            error == true ? colors.otperrorback : colors.white,
                        },
                      ]}
                      onCodeFilled={otp => {
                        setState({
                          ...state,
                          otp: otp,
                          otpStatus: false,
                          resendOtp: '',
                        });
                      }}
                    />
                    {error == true && (
                      <View
                        style={{
                          paddingTop: 20,
                          flexDirection: 'row',
                          borderRadius: width * (25 / 375),
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{alignSelf: 'center'}}
                          source={Images.Rederror}
                        />
                        <Text
                          style={[styles.wrongcode]}>
                          {I18n.t('Wrongcode')}
                        </Text>
                      </View>
                    )}
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: fontsize.Small,
                        color: colors.red,
                        marginTop: 10,
                        marginBottom:
                          otpValidate1 == true ? width * (140 / 375) : 0,
                      }}>
                      {state.otpError && I18n.t(state.otpError)}
                    </Text>
                    {state.resendOtp != '' ? (
                      <Text style={{textAlign: 'center'}}>
                        {state.resendOtp}
                      </Text>
                    ) : null}
                    {otpValidate1 == true && (
                      <View
                        style={{
                          position: 'absolute',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          bottom: width * (30 / 375),
                          zIndex: 1,
                          width: width,

                          alignItems: 'center',

                          height: width * (50 / 375),
                        }}>
                        <Bubbles size={10} color="rgba(253, 191, 90, 1)" />
                      </View>
                    )}
                    {otpValidate1 == false && (
                      <Text
                        style={[styles.resendOtp,{
                         
                          marginTop: error == true ? 0 : width * (50 / 375),
                        }]}
                        onPress={() => resendOtp()}>
                        {I18n.t('Resend')}
                      </Text>
                    )}
                  </ScrollView>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </SafeAreaView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    loginRes: state,
    forgotRes: state,
    verificationRes: state,
    ResendRes: state,
    passcodeRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: body => {
      dispatch(loginA(body));
    },
    forgotRequest: body => {
      dispatch(ForgotPasswordA(body));
    },
    verificationRequest: body => {
      dispatch(VerificationA(body));
    },
    resendRequest: body => {
      dispatch(ResendA(body));
    },

    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
