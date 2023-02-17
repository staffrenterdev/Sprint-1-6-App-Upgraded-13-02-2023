import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import VerificationA from '../../../redux/actions/VerificationA';
import {
  SUCCESS,
  ERROR,
  LOADING,
} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import NavBar from '../../components/NavBar';
import validate from '../../../assets/validation/validate_wrapper';
import TextBox from '../../components/TextBox';
import Loader from '../../components/loader';
import Button from '../../components/Button';
import styles from '../../screens/Auth/style/loginStyle';
import colors from '../../../constants/colors';
import {SignItIn} from './login';
import { width } from '../../../constants/ScreenSize';


var OtpError = '';

const Verification = (props) => {
  const Resetpassword = props.route.params.Resetpassword
  const [state, setState] = useState({
    Otp: '',
    OtpError: '',
    loading: false,
    Resetpassword: Resetpassword,
    email: props.route.params.useremail,
    screenFrom: props.route.params.screenFrom,
    user_id: props.route.params.user_id,
    data: ''
  });



  useEffect(() => {
    const Verification = props.verificationRes.VerificationR;
    

    if (Verification.status == LOADING) {
      setState({ ...state, loading: true });
    } else if (Verification.status == SUCCESS) { 
      setState({ ...state, loading: false });

    
      props.defaultRequest();

    
      if(state.screenFrom == 'Login') {
        setState({...state, loading: false, data: Verification.value.data.response});
      }
      else if(state.screenFrom == 'SignUp'){
        setState({...state, loading: false, data: Verification.value.data.response});
      }

    } else if (Verification.status == ERROR) {
      setState({ ...state, loading: false });
     
      props.defaultRequest();
    }
  }, [props.verificationRes]);

  const SUBMIT = () => {

    if (!checkValidation()) {
      return;
    }

    props.verificationRequest(state.Otp, state.user_id);


    
  };

  const checkValidation = () => {
    OtpError = validate('otp', state.Otp);

    if (OtpError) {
      setState({
        ...state,
        OtpError: OtpError,
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
      <Loader loading={state.loading} />
      <SignItIn navigator={props.navigation} data={state.data} />
      <NavBar
        isHeading="VERIFICATION"
        isLeftBack={true}
        navigator={props.navigation}
        bodyStyle={{ flex: 1.8 , marginLeft: width*(-80/375)}}
      />

      

      <TextBox
        viewStyle={{ marginTop: 20 }}
        error={state.OtpError}
        isPlaceHolder={true}
        placeholder={I18n.t('enter_otp')}
        onChangeText={(prevState) => {
          setState({
            ...state,
            Otp: prevState == '' ? prevState : prevState,
            OtpError: validate('Otp', prevState),
          });
        }}
        onSubmitEditing={Keyboard.dismiss}
        value={state.Otp}
      />

      <Button
        buttonStyle={[styles.buttonStyle]}
        label="Submit"
        onPress={() => SUBMIT()}
        isLabel={true}
        buttonTextStyle={styles.buttonTextStyle}
      />

    </SafeAreaView >
  );

}

const mapStateToProps = (state ) => {
  return {
    verificationRes: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verificationRequest: (Otp, UserId) => {
      dispatch(VerificationA(Otp, UserId));
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);