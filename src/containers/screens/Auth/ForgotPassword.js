import React, {useEffect, useState} from 'react';
import {SafeAreaView, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import ForgotPasswordA from '../../../redux/actions/ForgotPasswordA';
import {SUCCESS, ERROR, LOADING} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import NavBar from '../../components/NavBar';
import validate from '../../../assets/validation/validate_wrapper';
import {showToast, showDangerToast} from '../../components/ToastMessage';
import TextBox from '../../components/TextBox';
import Loader from '../../components/loader';
import Button from '../../components/Button';
import styles from '../../screens/Auth/style/loginStyle';
import colors from '../../../constants/colors';
import {width} from '../../../constants/ScreenSize';

var Email_error = '';

const ForgotPassword = props => {
  const [state, setState] = useState({
    email: '',
    Email_error: '',
    loading: false,
    Resetpassword: true,
  });

  useEffect(() => {
    const ForgotPassword = props.fotgotRes.ForgotPasswordR;
    if (ForgotPassword.status == LOADING) {
      setState({...state, loading: true});
    } else if (ForgotPassword.status == SUCCESS) {
      setState({...state, loading: false});

      let response =
        ForgotPassword.value &&
        ForgotPassword.value.data &&
        ForgotPassword.value.data.response;
      props.navigation.navigate('Verification', {
        userId: response.id,
        Resetpassword: state.Resetpassword,
      });
      showToast(ForgotPassword.value.data.message);
      props.defaultRequest();
    } else if (ForgotPassword.status == ERROR) {
      setState({...state, loading: false});
      showDangerToast(ForgotPassword.error.data.message);
      props.defaultRequest();
    }
  }, [props.fotgotRes]);

  const SUBMIT = () => {
    if (!checkValidation()) {
      return;
    }
    props.fotgotRequest(state.email);
  };

  // Check email is correct or not
  const checkValidation = () => {
    Email_error = validate('email', state.email);

    if (Email_error) {
      setState({
        ...state,
        Email_error: Email_error,
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Loader loading={state.loading} />
      <NavBar
        isHeading="FORGOT PASSWORD"
        isLeftBack={true}
        navigator={props.navigation}
        bodyStyle={{flex: 2.5}}
      />
      <TextBox
        viewStyle={{marginTop: width * (20 / 375)}}
        error={state.Email_error}
        isPlaceHolder={true}
        placeholder="Email Address"
        onChangeText={prevState => {
          setState({
            ...state,
            email: prevState == '' ? prevState : prevState,
            Email_error: validate('email', prevState),
          });
        }}
        onSubmitEditing={Keyboard.dismiss}
        value={state.email}
      />
      <Button
        buttonStyle={[styles.buttonStyle]}
        label="Forgot Password"
        onPress={() => SUBMIT()}
        isLabel={true}
        buttonTextStyle={styles.buttonTextStyle}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    fotgotRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fotgotRequest: email => {
      dispatch(ForgotPasswordA(email));
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
