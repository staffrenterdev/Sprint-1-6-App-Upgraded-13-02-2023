import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Keyboard} from 'react-native';

import {connect} from 'react-redux';
import ResetPasswordA from '../../../redux/actions/ResetPasswordA';
import {
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import validate from '../../../assets/validation/validate_wrapper';
import {showToast} from '../../components/ToastMessage';
import TextBox from '../../components/TextBox';
import Loader from '../../components/loader';
import Button from '../../components/Button';
import styles from '../../screens/Auth/style/resetPasswordStyle';
import colors from '../../../constants/colors';
import Images from '../../../constants/images';
import {Container, Content} from 'native-base';
import {width} from '../../../constants/ScreenSize';
import I18n from '../../../constants/i18n';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import CommonStyles from '../../../assets/css/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AuthContext';

export function SignItIn({navigator, data = null}) {
  const {login} = React.useContext(AuthContext);

  const onLogin = () => {
    if (data) {
      login(data);
    }
  };

  return <Text style={{width: 0, height: 0}} onPress={onLogin()}></Text>;
}

const Resetpassword = props => {
  const [remember, setRemember] = useState(false);
  const [state, setState] = useState({
    NewPassword: '',
    ConfirmPassword: '',
    NewPassword_error: '',
    ConfirmPassword_error: '',
    loading: false,
    password: '',
    passwordError: '',
    data: '',
  });

  useEffect(() => {
    const Resetpassword = props.resetRes.ResetPasswordR;

    if (Resetpassword.status == LOADING) {
      setState({...state, loading: true});
    } else if (Resetpassword.status == SUCCESS) {
      global.apiToken = Resetpassword.value.data.response?.api_token;
      global.quiz_status = Resetpassword.value.data.response?.quiz_status;
      setState({
        ...state,
        loading: false,
        data: Resetpassword.value.data?.response,
      });
      showToast(Resetpassword.value.data.message);
      if (remember == true) {
        AsyncStorage.setItem('RememberMe', JSON.stringify(rememberData));
      } else {
        AsyncStorage.removeItem('RememberMe');
      }
      AsyncStorage.setItem(
        'user',
        JSON.stringify(Resetpassword?.value?.data?.response),
      );
      props.defaultRequest();
    } else if (Resetpassword.status == ERROR) {
      setState({...state, loading: false});

      props.defaultRequest();
    }
  }, [props.resetRes]);

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      setRememberData();
    });
    return unsubscribeOnBlur;
  }, []);
  const rememberData = {
    Email: props?.route?.params?.email,
    Password: state.ConfirmPassword,
    Remember: remember,
  };

  const setRememberData = () => {
    AsyncStorage.getItem('RememberMe').then(lang => {
      var val = JSON.parse(lang);
      if (val != null) {
        setRemember(true);
      } else {
        setRemember(false);
      }
    });
  };

  const onLogin = () => {
    if (!checkValidation()) {
      return;
    }
    let body = new FormData();
    body.append('email', props?.route?.params?.email?.toLowerCase());
    body.append('new_password', state.password);
    body.append('confirm_password', state.ConfirmPassword);
    body.append('role_id', 3);
    body.append('language', global.LanguageSelected);
    props.resetRequest(body);
  };

  // check password validation
  const checkValidation = () => {
    const passwordError = validate('password', state.password);

    const confirmPassword_Error = validate(
      'confirm_password',
      state.password,
      state.ConfirmPassword,
    );
    if (passwordError || confirmPassword_Error) {
      setState({
        ...state,
        passwordError: passwordError,
        ConfirmPassword_error: confirmPassword_Error,
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <Container style={{flex: 1, backgroundColor: colors.white}}>
      <ShowStatusBarWhite />
      <Loader loading={state.loading} />
      <SignItIn navigator={props.navigation} data={state.data} />
      <Content style={{}}>
        <TouchableOpacity
          style={CommonStyles.backbuttonTouchable}
          onPress={() => props.navigation.goBack()}>
          <Image source={Images.backarrow}></Image>
          <Text style={CommonStyles.backbuttonText}>{I18n.t('Back')}</Text>
        </TouchableOpacity>
        <Text style={styles.resetpasswordText}>
          {I18n.t('Reset')}
          <Text style={{color: colors.black}}> {I18n.t('Password')}</Text>
        </Text>

        <TextBox
          inputTitle={I18n.t('Email')}
          rightImage={Images.mail}
          viewStyle={{marginHorizontal: width * (20 / 375)}}
          view1={{
            marginHorizontal: width * (20 / 375),
          }}
          error={state.emailReq}
          isPlaceHolder={true}
          placeholder={I18n.t('email_Address')}
          onSubmitEditing={Keyboard.dismiss}
          value={props?.route?.params?.email}
          editable={false}
        />

        <TextBox
          rightImage2={Images.eyehide}
          rightImage={Images.eyeshow}
          ishideimage={true}
          inputTitle={I18n.t('Newpassword')}
          view1={{
            marginHorizontal: width * (20 / 375),
          }}
          viewStyle={{marginHorizontal: width * (20 / 375)}}
          error={state.passwordError && I18n.t(state.passwordError)}
          isPlaceHolder={true}
          placeholder={I18n.t('Writepassword')}
          secureTextEntry={true}
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
          rightImage2={Images.eyehide}
          rightImage={Images.eyeshow}
          ishideimage={true}
          inputTitle={I18n.t('Confirm_new_password')}
          viewStyle={{
            marginTop: width * (-5 / 375),
            marginHorizontal: width * (20 / 375),
          }}
          view1={{
            marginHorizontal: width * (20 / 375),
          }}
          error={
            state.ConfirmPassword_error && I18n.t(state.ConfirmPassword_error)
          }
          isPlaceHolder={true}
          placeholder={I18n.t('Writepassword')}
          secureTextEntry={true}
          onChangeText={prevState => {
            setState({
              ...state,
              ConfirmPassword: prevState == '' ? prevState : prevState,
              ConfirmPassword_error: validate(
                'confirm_password',
                prevState,
                state.password,
              ),
            });
          }}
          onSubmitEditing={Keyboard.dismiss}
          value={state.ConfirmPassword}
        />

        <View style={[styles.buttonContainer]}>
          <Button
            buttonStyle={styles.buttonStyle}
            label={I18n.t('Login')}
            onPress={() => onLogin()}
            isLabel={true}
            buttonTextStyle={CommonStyles.buttontext}
          />
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    resetRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetRequest: body => {
      dispatch(ResetPasswordA(body));
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resetpassword);
