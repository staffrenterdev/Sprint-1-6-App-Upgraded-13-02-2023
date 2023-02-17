import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Modal,
  Linking,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import SignupA from '../../../redux/actions/SignupA';
import VerificationA from '../../../redux/actions/VerificationA';
import ResendA from '../../../redux/actions/ResendA';
import cmsLoginA from '../../../redux/actions/cmsLoginA';
import passcodeA from '../../../redux/actions/passcodeA';
import {DatePicker} from 'react-native-common-date-picker';
import {SUCCESS, ERROR, LOADING} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import checkDataA from '../../../redux/actions/checkDataA';
import TextBox from '../../components/TextBox';
import validate from '../../../assets/validation/validate_wrapper';
import {showToast, showDangerToast} from '../../components/ToastMessage';
import Loader from '../../components/loader';
import Button from '../../components/Button';
import styles from '../../screens/Auth/style/signupStyle';
import colors from '../../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import Picker from 'react-native-picker';
import I18n from '../../../constants/i18n';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Bubbles} from 'react-native-loader';

import CommonStyles from '../../../assets/css/commonStyles';
import {handleErrorTwo} from '../../components/ErrorComponent';
import HTML from 'react-native-render-html';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import moment from 'moment';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
import {AuthContext} from '../../context/AuthContext';
import {postService} from '../../../services/postServices';
import apiName from '../../../constants/apiName';

export function SignItIn({navigator, data = null}) {
  const {login} = React.useContext(AuthContext);

  const onLogin = () => {
    if (data) {
      login(data);
    }
  };

  return <Text style={{width: 0, height: 0}} onPress={onLogin()}></Text>;
}

const Signup = props => {
  const [businessModal, setBusinessModal] = useState(false);
  const [state, setState] = useState({
    loading: false,
    otp: '',
    data: '',
    otpError: '',
    otp1: '',
    otpError1: '',
    day1: [],
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    emailReq: '',
    passwordError: '',
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    confirmEmailError: '',
    confirmPasswordError: '',
    referalCode: '',
    referalCodeError: '',
    day: '',
    dayError: '',
    month: '',
    monthError: '',
    year: '',
    yearError: '',
    dob: '',
    role_id: 3,
    term_and_condition: 1,
    content: '',
    resendOtp: '',
    checkStatus: true,
    currentDate1: new Date(
      new Date().setFullYear(new Date().getFullYear() - 18),
    ),
  });
  const [checkactive, setCheckactive] = useState(false);
  const [messenger, setMessenger] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible1, setModalVisible1] = React.useState(false);
  const [PrivacyModal, setPrivacyModal] = useState(false);
  const [modalVisible3, setModalVisible3] = React.useState(false);
  const [datepic12, setDatepic12] = React.useState(false);
  const [DobIconModal, setDobIconModal] = useState(false);
  const [legalAgeModal, setLegalAgeModal] = useState(false);
  const [TnC, setTnC] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [TermsRespose, setTermsRespose] = useState();
  const [active, setActive] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [signup, setSignUp] = React.useState(false);
  const [otpConfirm, setOtpConfirm] = React.useState(false);
  const [ResendOtpConfirm, setResendOtpConfirm] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [showalertemail, setShowalertemail] = useState(false);
  const [alertmailtext, setAlertmailtext] = useState('');
  const [showtoastyesorno, setShowtoastyesorno] = useState(false);
  const clearState = () => {
    setState({
      ...state,
      loading: false,
      otp: '',
      otpError: '',
      otp1: '',
      otpError1: '',
      day1: [],
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      emailReq: '',
      passwordError: '',
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      confirmEmailError: '',
      confirmPasswordError: '',
      referalCode: '',
      referalCodeError: '',
      day: '',
      dayError: '',
      month: '',
      monthError: '',
      year: '',
      yearError: '',
      dob: '',
      role_id: 3,
      term_and_condition: 1,
      content: '',
      otpStatus: false,
      otpMessage: '',
      resendOtp: '',
      checkStatus: true,
    });
    setCheckactive(false);
    setMessenger('');
   
    setCheck(false);
    setActive(false);
    setTnC(false);
  };
  const [newView, setNew] = useState(false);
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
    Picker.hide();
  };

  const _keyboardDidHide = () => {
    setMBottom('100%');
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      terms_condition();
      clearState();
      Picker.hide();
    });
    return unsubscribeOnBlur;
  }, []);

  useEffect(() => {
    const cms = props.cmsRes.cmsLoginR;

    if (cms.status == LOADING) {
    } else if (cms.status == SUCCESS) {
      setTermsRespose(cms.value.data.response);
      setState({
        ...state,
        content: cms.value.data.response.content,
      });
      props.defaultRequest();
    } else if (cms.status == ERROR) {
      handleErrorTwo(cms);
      props.defaultRequest();
    }
  }, [props.cmsRes]);
  useEffect(() => {
    const signup = props.signupres.signupR;

    if (signup.status == LOADING) {
      setState({
        ...state,
        loading: false,
      });
      setSignUp(true);
    } else if (signup.status == SUCCESS) {
      setState({
        ...state,
        loading: false,
      });
      state.otp1 = '';
      state.resendOtp = '';
      setTimeout(() => {}, 1000);
      setModalVisible3(true);
      setModalVisible1(false);
      setSignUp(false);

      props.defaultRequest();
    } else if (signup.status == ERROR) {
      setSignUp(false);
      setState({
        ...state,
        loading: false,
      });
      if (showtoastyesorno == false) {
        handleErrorTwo(signup);
      }
      props.defaultRequest();
      if (
        signup.error.response.data.message ==
          'The email has already been taken.' ||
        'La email a déjà été pris.'
      ) {
        setShowalertemail(true);
        setAlertmailtext(signup.error.response.data.message);
      }
    }
  }, [props.signupres]);

  useEffect(() => {
    const signup = props.checkDataRes.checkDataR;

    if (signup.status == LOADING) {
      setLoading(true);
    } else if (signup.status == SUCCESS) {
      setLoading(false);
      setModalVisible(true);

      props.defaultRequest();
    } else if (signup.status == ERROR) {
      setLoading(false);
      showDangerToast(signup?.error?.response?.data?.message);
    }
  }, [props.checkDataRes]);

  useEffect(() => {
    const verification = props.verificationRes.VerificationR;
    if (verification.status == LOADING) {
      setError(false);

      setOtpConfirm(true);
    } else if (verification.status == SUCCESS) {
      setOtpConfirm(false);
      setError(false);
      setModalVisible3(false);
      setState({
        ...state,
        loading: false,
        data: verification.value.data?.response,
      });
      AsyncStorage.setItem(
        'user',
        JSON.stringify(verification?.value?.data?.response),
      );
      setTimeout(() => {
        showToast(verification.value.data.message);
      }, 200);

      props.defaultRequest();
    } else if (verification.status == ERROR) {
      setOtpConfirm(false);
      setState({...state, loading: false});
      setError(true);
      props.defaultRequest();
    }
  }, [props.verificationRes]);
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
    const Resend = props.ResendRes.ResendOtpR;

    if (Resend.status == LOADING) {
      setResendOtpConfirm(true);
    } else if (Resend.status == SUCCESS) {
      state.otpStatus = true;
      state.resendOtp = Resend.value.data.message;
      setResendOtpConfirm(false);

      props.defaultRequest();
    } else if (Resend.status == ERROR) {
      setResendOtpConfirm(false);

      handleErrorTwo(Resend);
      props.defaultRequest();
    }
  }, [props.ResendRes]);
  useEffect(() => {
    if (global.language == null) {
      global.language = 'en';
    }
  }, []);

  const terms_condition = () => {
    let body = new FormData();
    body.append('slug', 'terms-and-conditions');
    body.append('role_id', 3);
    body.append('language', global.language);

    props.cmsRequest(body);
  };
  const Privacy_policy = () => {
    let body = new FormData();
    body.append('slug', 'privacy-policy');
    body.append('role_id', 3);
    body.append('language', global.language);

    props.cmsRequest(body);
  };
  const onSignup = () => {
    terms_condition();
    if (!checkValidation()) {
      return;
    }
    let body = new FormData();
    body.append('referrel_code', state.referalCode);
    body.append('email', state.email.toLowerCase());
    body.append('role_id', 3);
    body.append('language', global.language);

    setLoading(true);
    postService(apiName.checkData, body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          setModalVisible(true);
        }
      })
      .catch(error => {
        console.log(
          'error for ask revision  api =====================>>',
          error?.response?.data?.message,
        );
        showDangerToast(error?.response?.data?.message);
        setLoading(false);
      });
  };
  const verificationCode = () => {
    setShowtoastyesorno(true);
    if (!checkValidation1()) {
      return;
    }
    let body = new FormData();
    body.append('first_name', state.firstName);
    body.append('last_name', state.lastName);
    body.append('DOB', messenger);
    body.append('email', state.email.toLowerCase());

    body.append('password', state.password);

    body.append('referrel_code', state.referalCode);
    body.append('term_and_condition', state.term_and_condition);
    body.append('role_id', 3);
    body.append('language', global.language);

    props.signupRequest(body);
  };

  const checkValidation = () => {
    const FirstName_Error = validate('first_name', state.firstName);
    const LastName_Error = validate('last_name', state.lastName);
    const emailReq = validate('email', state.email.toLowerCase());

    const passwordError = validate('password', state.password);

    const yearError = validate('dob', messenger);

    if (
      FirstName_Error ||
      emailReq ||
      LastName_Error ||
      passwordError ||
      yearError
    ) {
      setState({
        ...state,
        firstNameError: FirstName_Error,
        emailReq: emailReq,
        passwordError: passwordError,
        lastNameError: LastName_Error,
        dayError: yearError,
      });
      return false;
    } else {
      setState({
        ...state,
        firstNameError: '',
        emailReq: '',
        passwordError: '',
        lastNameError: '',
        yearError: '',
        monthError: '',
        dayError: '',
      });
      return true;
    }
  };
  const checkValidation1 = () => {
    const emailReq = validate('email', state.email.toLowerCase());
    if (emailReq) {
      setState({
        ...state,
        emailReq: emailReq,
      });
      return false;
    } else {
      setState({
        ...state,
        emailReq: '',
      });
      return true;
    }
  };
  const checkValidation2 = () => {
    const otpError = validate('otp', state.otp1);

    if (otpError) {
      setState({
        ...state,
        otpError1: otpError,
      });
      return false;
    } else {
      setState({
        ...state,
        otpError1: '',
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
    body.append('email', state.email.toLowerCase());
    body.append('otp', state.otp1);
    body.append('role_id', 3);
    body.append('language', global.language);

    props.verificationRequest(body);
  };
  const resendOtp = () => {
    state.resendOtp = '';
    state.otp1 = '';
    state.otpStatus = false;
    state.otpError1 = '';
    setError(false);
    let body = new FormData();
    body.append('email', state.email.toLowerCase());
    body.append('role_id', 3);
    body.append('language', global.language);

    props.resendRequest(body);
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const renderTerms = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontFamily: fonts.Bold}}>{item.question}</Text>
        <HTML source={{html: item.answer}} />
      </View>
     
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : ''}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS == 'android' ? 30 : 0}>
      <ShowStatusBarWhite />
      <View style={styles.container}>
        <SignItIn navigator={props.navigation} data={state.data} />
        <Loader loading={loading} />

        <View
          style={{marginTop: Platform.OS == 'ios' ? width * (40 / 375) : 0}}>
          <View style={CommonStyles.backbuttonView}>
            <TouchableOpacity
              style={CommonStyles.backbuttonTouchable}
              onPress={() => props.navigation.goBack()}>
              <Image source={Images.backarrow}></Image>
              <Text style={CommonStyles.backbuttonText}>{I18n.t('Back')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setBusinessModal(true);
              }}
              style={styles.bussiness_button}>
              <Text style={{color: colors.yellow, fontSize: fontsize.Regular}}>
                {I18n.t('As_business')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.headingview, {marginVertical: 20}]}>
            <Text
              style={[
                CommonStyles.SubHeadingText1,
                styles.registerText,
                {alignSelf: 'center'},
              ]}>
              {I18n.t('Register')} {I18n.t('as')}
            </Text>
            <Text style={[CommonStyles.SubHeadingText1, styles.asText]}>
              <Text style={{color: colors.yellow}}> {I18n.t('candidate')}</Text>
            </Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <TextBox
            secureTextEntry={false}
            inputTitle={I18n.t('First_name')}
            viewStyle={styles.viewTextBox}
            view1={{
              marginTop: width * (10 / 375),
              marginHorizontal: width * (20 / 375),
            }}
            error={state.firstNameError && I18n.t(state.firstNameError)}
            isPlaceHolder={true}
            placeholder={I18n.t('fname1')}
            onChangeText={prevState => {
              setState({
                ...state,
                firstName: prevState == '' ? prevState : prevState.trimLeft(),
                firstNameError: validate('first_name', prevState),
              });
            }}
            onSubmitEditing={Keyboard.dismiss}
            value={state.firstName}
          />
          <TextBox
            secureTextEntry={false}
            inputTitle={I18n.t('Last_name')}
            viewStyle={styles.viewTextBox}
            view1={styles.viewTextBox1}
            error={state.lastNameError && I18n.t(state.lastNameError)}
            isPlaceHolder={true}
            placeholder={I18n.t('Lname1')}
            onChangeText={prevState => {
              setState({
                ...state,
                lastName: prevState == '' ? prevState : prevState.trimLeft(),
                lastNameError: validate('last_name', prevState),
              });
            }}
            onSubmitEditing={Keyboard.dismiss}
            value={state.lastName}
          />
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: messenger ? 'rgb(0,0,0)' : colors.inputTitle,
                marginLeft: width * (32 / 375),
                marginRight: width * (10 / 375),
                fontSize: fontsize.Large,
                lineHeight: width * (23 / 375),
                color: 'black',
                marginTop: 2,

                fontFamily: fonts.Bold,
              }}>
              {I18n.t('Date_of_birth')}
            </Text>
            <TouchableOpacity
              style={{marginBottom: 5}}
              onPress={() => {
                setDobIconModal(true), setNew(true), Privacy_policy();
              }}>
              <Image
                style={{width: 25, height: 25}}
                resizeMode="contain"
                source={Images.Dobicon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: width * (10 / 375),
            }}>
            <TouchableOpacity
              style={[styles.pickerView, {}]}
              onPress={() => {
                setDatepic12(true), Keyboard.dismiss(), setNew(true);
              }}>
              <Text
                editable={false}
                pointerEvents="none"
                style={[
                  styles.Choose_dateText,
                  {color: messenger ? colors.textinputColor : colors.greyish},
                ]}>{`${
                messenger
                  ? moment(messenger).format('DD-MM-YYYY')
                  : I18n.t('Choose_date')
              }`}</Text>
              <Image
                style={{
                  marginRight: width * (20 / 375),
                  marginTop: width * (10 / 375),
                }}
                source={Images.downArrow}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginHorizontal: width * (33 / 375),
              marginVertical: 10,
              color: colors.red,
              fontSize: fontsize.Small,
            }}>
            {`${
              messenger == '' ? state.dayError && I18n.t(state.dayError) : ' '
            }`}
          </Text>

          <TextBox
            secureTextEntry={false}
            rightImage={Images.emailRightarrow}
            inputTitle={I18n.t('Email')}
            viewStyle={{marginHorizontal: width * (20 / 375)}}
            view1={{marginHorizontal: width * (20 / 375)}}
            error={state.emailReq && I18n.t(state.emailReq)}
            isPlaceHolder={true}
            placeholder={I18n.t('Writeemail')}
            onChangeText={prevState => {
              setState({
                ...state,
                email: prevState == '' ? prevState : prevState.trimLeft(),
                emailReq: validate('emailReq', prevState),
              });
            }}
            onSubmitEditing={Keyboard.dismiss}
            keyboardType={'email-address'}
            value={state.email}
            autoCapitalize={'none'}
          />

          <TextBox
            rightImage={Images.eyeshow}
            rightImage2={Images.eyehide}
            ishideimage={true}
            secureTextEntry={true}
            inputTitle={I18n.t('Password')}
            viewStyle={styles.viewTextBox}
            view1={{
              marginTop: width * (10 / 375),
              marginHorizontal: width * (20 / 375),
            }}
            error={state.passwordError && I18n.t(state.passwordError)}
            isPlaceHolder={true}
            placeholder={I18n.t('Writepassword')}
            onChangeText={prevState => {
              setState({
                ...state,
                password: prevState == '' ? prevState : prevState,
                passwordError: validate('password', prevState),
              });
            }}
            onSubmitEditing={Keyboard.dismiss}
            value={state.password}
          />

          <TextBox
            inputTitle={I18n.t('Referal_code')}
            viewStyle={styles.viewTextBox}
            view1={styles.viewTextBox1}
            isPlaceHolder={true}
            placeholder={I18n.t('Writereferal')}
            secureTextEntry={false}
            onChangeText={prevState => {
              setState({
                ...state,
                referalCode: prevState == '' ? prevState : prevState,
              });
            }}
            onSubmitEditing={Keyboard.dismiss}
            value={state.referalCode}
          />
          <Button
            buttonStyle={[styles.buttonStyle, {marginTop: 10}]}
            label={I18n.t('SignUp')}
            onPress={() => {
              onSignup();
            }}
            isLabel={true}
            buttonTextStyle={[styles.buttonTextStyle1, {}]}
          />
          <View
            style={[
              styles.bottomView,
              {marginTop: 10, marginBottom: Platform.OS == 'ios' ? 30 : 0},
            ]}>
            <Text style={[CommonStyles.SubHeadingText2, styles.already]}>
              {I18n.t('Already_have_an_account')}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('login')}>
              <Text
                style={[
                  CommonStyles.SubHeadingText2,
                  styles.loginText,
                  {fontFamily: fonts.Bold},
                ]}>
                {' '}
                {I18n.t('Login')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={DobIconModal}
          onRequestClose={() => {
            setDobIconModal(false), setNew(false);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setDobIconModal(false), setNew(false);
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginBottom: 0,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setDobIconModal(true);
                }}>
                <View style={styles.dobIconModalview}>
                  <TouchableOpacity
                    style={[
                      CommonStyles.backbuttonTouchable,
                      {marginVertical: 0},
                    ]}
                    onPress={() => {
                      setDobIconModal(false), setNew(false);
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text style={CommonStyles.backbuttonText}>
                      {I18n.t('Back')}
                    </Text>
                  </TouchableOpacity>

                  <View>
                    <Text style={styles.legalageText}>
                      {I18n.t('Legalage')}
                    </Text>
                    <Image
                      source={Images.DateImage}
                      style={{
                        alignSelf: 'center',
                        marginVertical: 30,
                      }}></Image>
                    <View>
                      <Text style={styles.legalmodaltext}>
                        {I18n.t('askingyour')}
                      </Text>
                      <Text style={styles.legalmodaltext}>
                        {I18n.t('informationshare')}
                      </Text>
                      <Text
                        style={[
                          styles.legalmodaltext,
                          {
                            marginVertical: 15,
                            marginBottom: 50,
                            textAlign: 'center',
                          },
                        ]}>
                        {I18n.t('Pleaserefer')}
                        <Text
                          onPress={() => {
                            setPrivacyModal(true),
                              setDobIconModal(false),
                              setNew(false);
                          }}
                          style={{color: colors.yellow}}>
                          {' '}
                          {I18n.t('Privacy_policy')}
                        </Text>{' '}
                        {I18n.t('moredetails')}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {/* terms and condition model */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: colors.white,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.white,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.white,
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                  style={[
                    CommonStyles.backbuttonTouchable,
                    {
                      marginTop: Platform.OS == 'ios' ? width * (40 / 375) : 0,
                    },
                  ]}
                  onPress={() => {
                    setModalVisible(false),
                      setCheckactive(false),
                      setTnC(false);
                  }}>
                  <Image source={Images.backarrow}></Image>
                  <Text style={CommonStyles.backbuttonText}>
                    {I18n.t('Back')}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={[
                    CommonStyles.SubHeadingText3,
                    {
                      alignSelf: 'center',
                      marginTop: width * (5 / 375),
                      fontFamily: fonts.Bold,
                      marginBottom: 15,
                    },
                  ]}>
                  {I18n.t('Terms_conditions')}
                </Text>

                <View
                  style={{
                    marginTop: 10,
                    flex: 1,
                  }}>
                  <FlatList
                  
                    onEndReachedThreshold={0.5}
                    onEndReached={nativeEvent => {
                      setState({...state, checkStatus: false});
                      setCheckactive(true);
                    }}
                    data={TermsRespose}
                    renderItem={renderTerms}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
              <View style={{height: 180}}>
                <TouchableOpacity
                  onPress={() => {
                    setTnC(!TnC);
                  }}
                  disabled={checkactive == false}
                  style={[styles.checkboxview]}>
                  <View
                    style={[
                      TnC == true ? styles.remember1 : styles.remember,
                      {borderRadius: 5},
                    ]}
                    disabled={!checkactive}
                    onPress={() => {
                      setTnC(!TnC);
                    }}>
                    {TnC == true && (
                      <Image
                        source={Images.Remember}
                        style={styles.remember_img}
                      />
                    )}
                  </View>
                  <Text style={{marginLeft: width * (10 / 375)}}>
                    {I18n.t('acceptTandC')}
                  </Text>
                </TouchableOpacity>
                {check == true && TnC == false && (
                  <Text
                    style={{
                      fontSize: fontsize.Small,
                      color: colors.red,
                      marginHorizontal: width * (30 / 375),
                    }}>
                    {I18n.t('errorTAndC')}
                  </Text>
                )}

                <View style={{alignItems: 'center'}}>
                  <Button
                    buttonStyle={{
                      backgroundColor: TnC == true ? colors.yellow : '#CCCCCC',
                      borderRadius: 30,
                      height: width * (50 / 375),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: width * (20 / 375),
                      marginBottom: '7%',
                      width: '90%',
                    }}
                    label={I18n.t('start')}
                    onPress={() => {
                      TnC == false
                        ? setCheck(true)
                        : (setModalVisible(false), setModalVisible1(true));
                    }}
                    isLabel={true}
                    disabled={!TnC}
                    buttonTextStyle={[CommonStyles.buttontext]}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Privacy policy Model */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={PrivacyModal}
          onRequestClose={() => setPrivacyModal(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: colors.white,
            }}>
            <View style={{flex: 1, backgroundColor: colors.white}}>
              <TouchableOpacity
                style={[
                  CommonStyles.backbuttonTouchable,
                  {
                    marginTop: Platform.OS == 'ios' ? width * (40 / 375) : 0,
                  },
                ]}
                onPress={() => setPrivacyModal(false)}>
                <Image source={Images.backarrow}></Image>
                <Text style={CommonStyles.backbuttonText}>
                  {I18n.t('Back')}
                </Text>
              </TouchableOpacity>

              <Text
                style={[
                  CommonStyles.SubHeadingText3,
                  {
                    alignSelf: 'center',
                    marginTop: width * (5 / 375),
                    fontWeight: 'bold',
                  },
                ]}>
                {I18n.t('Privacy_policy')}
              </Text>

              <View
                style={{
                  marginTop: 10,
                  marginBottom: 30,
                  flex: 1,
                }}>
                <ScrollView
                  style={{padding: 15}}
                  onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                      setState({...state, checkStatus: false});
                    }
                  }}
                  scrollEventThrottle={400}>
                  <View style={{paddingBottom: 20}}>
                    <HTML source={{html: state.content}} />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={legalAgeModal}
          onRequestClose={() => setLegalAgeModal(false)}>
          <TouchableWithoutFeedback
            onPressOut={() => {
              setLegalAgeModal(false);
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.modelBackground,
                justifyContent: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setLegalAgeModal(true);
                }}>
                <View style={[styles.dobIconModalview, {borderRadius: 20}]}>
                  <TouchableOpacity
                    style={[CommonStyles.backbuttonTouchable]}
                    onPress={() => setLegalAgeModal(false)}>
                    <Image source={Images.close}></Image>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    <Text style={styles.legalageText}>
                      {I18n.t('Legalage')}
                    </Text>
                    <Image
                      source={Images.AgeLockicon}
                      style={{
                        alignSelf: 'center',
                        marginVertical: 20,
                      }}></Image>

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
                      {I18n.t('Unfortunately')}
                    </Text>
                    <Text
                      style={[
                        styles.titleText,
                        {alignSelf: 'center', marginVertical: 20},
                      ]}>
                      {I18n.t('Seesoon')}
                    </Text>

                    <View style={{alignItems: 'center'}}>
                      <Button
                        buttonStyle={{
                          backgroundColor: colors.yellow,
                          borderRadius: 30,
                          height: width * (45 / 375),
                          marginTop: width * (30 / 375),
                          marginBottom: '10%',
                          width: '55%',
                        }}
                        label={I18n.t('got_it2')}
                        onPress={() => {
                          setLegalAgeModal(false);
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
                    <Text
                      style={{
                        color: colors.yellow,
                        fontSize: fontsize.Regular,
                        marginLeft: 2,
                      }}></Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginTop: 15,
                    }}>
                    <View style={{alignSelf: 'center'}}>
                      <Text
                        style={[
                          CommonStyles.SubHeadingText1,
                          styles.registerText,
                          {alignSelf: 'center'},
                        ]}>
                        {I18n.t('Register')} {I18n.t('as')}
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
                        buttonStyle={CommonStyles.HalfButton}
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

        {/* modal for email change */}
        <Modal
          animationType="slide"
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible1(false), setShowalertemail(false), setActive(false);
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: colors.white,
            }}>
            <View style={{flex: 1, backgroundColor: colors.white}}>
              <TouchableOpacity
                style={[
                  CommonStyles.backbuttonTouchable,
                  {
                    marginTop: Platform.OS == 'ios' ? width * (40 / 375) : 0,
                  },
                ]}
                onPress={() => {
                  setModalVisible1(false),
                    setShowalertemail(false),
                    setActive(false);
                }}>
                <Image source={Images.backarrow}></Image>
                <Text style={CommonStyles.backbuttonText}>
                  {I18n.t('Back')}
                </Text>
              </TouchableOpacity>

              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      setModalVisible1(false), setActive(false);
                    }}
                    disabled={signup}></TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.headingview,
                    {
                      marginTop: width * (60 / 375),
                      marginBottom: width * (60 / 375),
                    },
                  ]}>
                  <Text
                    style={[CommonStyles.SubHeadingText1, styles.registerText]}>
                    {I18n.t('Validate_your')}
                  </Text>
                  <Text style={[CommonStyles.SubHeadingText1, styles.asText]}>
                    <Text style={{color: colors.yellow}}>
                      {' '}
                      {I18n.t('account')}
                    </Text>
                  </Text>
                </View>

                <View style={{alignItems: 'center', marginTop: 15}}>
                  <Text style={CommonStyles.SubHeadingText4}>
                    {I18n.t('Validation_guide')}
                  </Text>
                  <Text
                    style={[
                      CommonStyles.RegularText,
                      {fontWeight: 'bold', marginVertical: '5%'},
                    ]}>
                    {state.email}
                  </Text>

                  <Text
                    style={[
                      CommonStyles.SubHeadingText4,
                      {
                        color: colors.yellow,
                        marginTop: width * (40 / 375),
                        marginBottom: width * (40 / 375),
                        bottom: isKeyboardVisible ? 30 : 0,
                      },
                    ]}
                    onPress={() => setActive(true)}>
                    {I18n.t('changeAddress')}
                  </Text>
                </View>
                <View style={{bottom: isKeyboardVisible ? 30 : 0}}>
                  {active == true && (
                    <TextBox
                      secureTextEntry={false}
                      rightImage={Images.emailRightarrow}
                      inputTitle={I18n.t('Email')}
                      viewStyle={{marginHorizontal: width * (20 / 375)}}
                      view1={{marginHorizontal: width * (20 / 375)}}
                      error={state.emailReq && I18n.t(state.emailReq)}
                      isPlaceHolder={true}
                      placeholder={I18n.t('enter_email')}
                      onChangeText={prevState => {
                        setState({
                          ...state,
                          email:
                            prevState == '' ? prevState : prevState.trimLeft(),
                          emailReq: validate('emailReq', prevState),
                        });
                        setShowalertemail(false);
                      }}
                      onSubmitEditing={Keyboard.dismiss}
                      keyboardType={'email-address'}
                      value={state.email}
                      autoCapitalize={'none'}
                    />
                  )}

                  {showalertemail == true && (
                    <Text
                      style={{
                        color: colors.red,
                        marginHorizontal: width * (30 / 375),
                        position: 'relative',
                        bottom: 20,
                      }}>
                      {alertmailtext}
                    </Text>
                  )}
                  {signup == true && (
                    <View
                      style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                        bottom: width * (20 / 375),
                        zIndex: 1,
                        width: width,
                        alignItems: 'center',
                        height: width * (50 / 375),
                      }}>
                      <Bubbles size={10} color="#FFF" />
                    </View>
                  )}
                  <View style={{alignItems: 'center'}}>
                    <Button
                      buttonStyle={[CommonStyles.FullButton]}
                      label={I18n.t('Send_validation_code')}
                      onPress={() => verificationCode()}
                      isLabel={true}
                      disabled={!TnC}
                      buttonTextStyle={CommonStyles.buttontext}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        {/* Modal for validate account otp modal-3 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          statusBarTranslucent={true}
          onRequestClose={() => setModalVisible3(false)}>
          <View
            style={{
              flex: 1,
            }}>
            <View style={[styles.modelview]}>
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}>
                <View style={[styles.modelview1]}>
                  <TouchableOpacity
                    style={[CommonStyles.backbuttonTouchable]}
                    onPress={() => setModalVisible3(false)}>
                    <Image source={Images.backarrow}></Image>
                    <Text style={CommonStyles.backbuttonText}>
                      {I18n.t('Back')}
                    </Text>
                  </TouchableOpacity>

                  {otpConfirm == true && (
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
                  {otpConfirm == false && (
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
                        {marginVertical: width * (10 / 375)},
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
                          {alignSelf: 'center'},
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

                  <Text style={{color: colors.black, fontFamily: fonts.Bold}}>
                    {' '}
                    {state.email}
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
                  code={state.otp1}
                  onCodeChanged={code => {
                    setError(false);
                    setState({
                      ...state,
                      otp1: code == '' ? code : code,
                      otpStatus: false,
                      resendOtp: '',
                    });
                  }}
                  autoFocusOnLoad={false}
                  placeholderTextColor={colors.darkBlueGreen}
                  codeInputHighlightStyle={{
                    borderColor: colors.yellow,
                    borderWidth: 3,
                  }}
                  keyboardType="phone-pad"
                  codeInputFieldStyle={[
                    styles.codeInput,
                    {
                      borderColor: error == true ? colors.red : colors.yellow,
                      color: error == true ? colors.red : colors.black,
                      backgroundColor:
                        error == true ? colors.otperrorback : colors.white,
                    },
                  ]}
                  onCodeFilled={otp => {
                    setState({
                      ...state,
                      otp1: otp,
                      otpStatus: false,
                      resendOtp: '',
                    });
                  }}
                />
                {error == true && (
                  <View
                    style={[styles.wrongcodeview]}>
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
                      ResendOtpConfirm == true ? width * (140 / 375) : 0,
                  }}>
                  {state.otpError1 && I18n.t(state.otpError1)}
                </Text>
                {state.resendOtp != '' ? (
                  <Text style={{textAlign: 'center'}}>{state.resendOtp}</Text>
                ) : null}
                {ResendOtpConfirm == true && (
                  <View
                    style={[CommonStyles.Bubblesview]}>
                    <Bubbles size={10} color="rgba(253, 191, 90, 1)" />
                  </View>
                )}
                {ResendOtpConfirm == false && (
                  <Text
                    style={[styles.resendbutton,{
                     
                      marginTop: error == true ? 0 : width * (50 / 375),
                    }]}
                    onPress={() => resendOtp()}>
                    {I18n.t('Resend')}
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={datepic12}
          onRequestClose={() => {
            setDatepic12(false), setNew(false);
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255)',

                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <DatePicker
                monthDisplayMode={'en-long'}
                type="MM-DD-YYYY"
                defaultDate={messenger?messenger:state.currentDate1}
                minDate={new Date('1950-01-01')}
                maxDate={new Date()}
                confirm={selectedDate => {
                  setDatepic12(false);
                  setNew(false);
                  let pickYear = moment(state.currentDate1).format('YYYY');
                  let PresentYear = moment(new Date()).format('YYYY');
                  let agevalue = PresentYear - pickYear;
                  if (agevalue < 18) {
                    if (Platform.OS == 'android') {
                      setTimeout(() => {
                        setLegalAgeModal(true);
                      }, 500);
                    } else {
                      setLegalAgeModal(true);
                    }
                  } else {
                    setMessenger(
                      moment(selectedDate).format('YYYY-MM-DD'),
                    );
                  }
                }}
                cancel={() => {
                  setNew(false);
                  setDatepic12(false);
                }}
                confirmText="Confirm"
                cancelText="Cancel"
                rowHeight={50}
                toolBarCancelStyle={{color: 'white'}}
                toolBarConfirmStyle={{color: 'white'}}
                selectedRowBackgroundColor={'#fef2de'}
                textMarginHorizontal={10}
                selectedTextStyle={{
                  marginHorizontal: 10,
                  fontFamily: fonts.Bold,
                }}
                selectedBorderLineColor="white"
                listItemStyle={{fontSize: 10}}
                selectedBorderLineMarginHorizontal={10}
                selectedTextFontSize={18}
                toolBarStyle={{backgroundColor: colors.yellow, color: 'fff'}}
                onValueChange={selectedDate => {
                
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => {
  return {
    cmsRes: state,
    signupres: state,
    verificationRes: state,
    ResendRes: state,
    passcodeRes: state,
    checkDataRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cmsRequest: body => {
      dispatch(cmsLoginA(body));
    },
    signupRequest: body => {
      dispatch(SignupA(body));
    },
    verificationRequest: body => {
      dispatch(VerificationA(body));
    },
    resendRequest: body => {
      dispatch(ResendA(body));
    },
    passcodeRequest: body => {
      dispatch(passcodeA(body));
    },
    checkDataRequest: body => {
      dispatch(checkDataA(body));
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
