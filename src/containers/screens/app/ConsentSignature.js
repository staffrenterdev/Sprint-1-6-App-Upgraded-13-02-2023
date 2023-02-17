import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import NavBar from '../../components/NavBar';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import I18n from '../../../constants/i18n';
import Images from '../../../constants/images';
import fontsize from '../../../constants/i18n/Fontsizes';
import SignaturePad from 'react-native-signature-pad';
import fonts from '../../../constants/fonts';
import {postService} from '../../../services/postServices';
import apiName from '../../../constants/apiName';
import Loader from '../../components/loader';
import styles from '../../screens/app/styles/ConsentSignaturestyle';
const ConsentSignature = props => {
  const [mBottom, setMBottom] = React.useState(500);
  const [state, setState] = useState({
    signCanvas: '',
    number: 0,
    initial: '',
    initialError: '',
  });
  const [showsign, setShowsign] = useState(false);
  const signaturePadError = error => {
    console.error(error);
  };

  const signaturePadChange = ({base64DataUrl}) => {
    if (base64DataUrl != '') {
      setShowsign(true);
    } else {
      setShowsign(false);
    }
    setState({
      ...state,
      signCanvas: base64DataUrl,
    });
  };
  const [iskeyboradvisible, setIskeyboradvisible] = useState(false);

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
    setIskeyboradvisible(true);
  };
  const _keyboardDidHide = () => {
    setMBottom('100%');
    setIskeyboradvisible(false);
  };

  const submit = () => {
    let body = new FormData();
    if (state.signCanvas != '') {
      body.append('user_reference_sign', state.signCanvas);
    }
    postService(apiName.userreferencesign, body)
      .then(async res => {
        if (res.status == 200) {
          props.navigation.navigate('References', {
            firstmodal: true,
            values: props.route.params,
          });
        }
      })
      .catch(error => {
        console.log('error for add sign  api =====================>>', error);
      });
  };
  const [loading, setLoading] = useState(true);
  const [signaturerender, setSignaturerender] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSignaturerender(false);
    }, 500);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  const scrollRef = useRef();
  useEffect(() => {
    if (iskeyboradvisible == true) {
      scrollRef.current.scrollToEnd({animated: true});
    }
  }, [iskeyboradvisible]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : ''}
      style={{flex: 1, backgroundColor: colors.whitebackground}}>
      <NavBar
        lefttext={I18n.t('Back')}
        source={Images.backarrow}
        navigation={() => {
          props.navigation.goBack();
        }}
        rightText={I18n.t('Consentreference')}></NavBar>
      <Loader loading={loading} />

      <View style={{flexDirection: 'row'}}>
        {signaturerender == true ? null : (
          <View
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={styles.Pleasesignview}>
            {showsign == false && (
              <Text
                style={styles.Pleasesigntext}>
                {I18n.t('Pleasesign')}
              </Text>
            )}
            <SignaturePad
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              onError={signaturePadError()}
              onChange={c => {
                signaturePadChange(c), Keyboard.dismiss();
              }}
              style={styles.SignaturePadview}
            />
          </View>
        )}
        {signaturerender == true ? null : (
          <Button
            disabled={state.signCanvas == ''}
            buttonStyle={[styles.submitbutton,{
              borderColor:
                state.signCanvas == '' ? colors.disablecolor : colors.yellow,
              borderWidth: state.signCanvas == '' ? 1 : 0,
              backgroundColor:
                state.signCanvas == '' ? colors.disblebutton : colors.yellow,
             
            }]}
            label={I18n.t('P_confirm')}
            onPress={() => submit()}
            isLabel={true}
            buttonTextStyle={{
              fontSize: fontsize.Large,
              color:
                state.signCanvas == '' ? colors.disablecolor : colors.white,
              fontFamily: fonts.Bold,
            }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConsentSignature;
